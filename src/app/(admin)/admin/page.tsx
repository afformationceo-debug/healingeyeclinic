'use client';

import { useState, useEffect, useCallback } from 'react';

const PAGES = [
  { key: 'home', label: 'Home' },
  { key: 'about', label: 'About' },
  { key: 'vision', label: 'Vision' },
  { key: 'cataract', label: 'Cataract' },
  { key: 'center', label: 'Center' },
  { key: 'insight', label: 'Insight' },
  { key: 'community', label: 'Community' },
  { key: 'blog', label: 'Blog' },
];

const LOCALES = [
  { key: 'ko', label: 'KO' },
  { key: 'en', label: 'EN' },
  { key: 'ja', label: 'JA' },
  { key: 'zh-CN', label: 'ZH-CN' },
  { key: 'zh-TW', label: 'ZH-TW' },
  { key: 'th', label: 'TH' },
  { key: 'ru', label: 'RU' },
];

const ROBOTS_OPTIONS = [
  'index,follow',
  'index,nofollow',
  'noindex,follow',
  'noindex,nofollow',
];

interface SeoData {
  title_tag: string;
  meta_description: string;
  og_title: string;
  og_description: string;
  og_image: string;
  keywords: string;
  canonical_url: string;
  robots: string;
  structured_data: string;
  updated_at: string;
}

const emptySeo: SeoData = {
  title_tag: '',
  meta_description: '',
  og_title: '',
  og_description: '',
  og_image: '',
  keywords: '',
  canonical_url: '',
  robots: 'index,follow',
  structured_data: '',
  updated_at: '',
};

export default function AdminSeoPage() {
  const [selectedPage, setSelectedPage] = useState('home');
  const [selectedLocale, setSelectedLocale] = useState('ko');
  const [formData, setFormData] = useState<SeoData>(emptySeo);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [allData, setAllData] = useState<Record<string, Record<string, SeoData>> | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/seo');
      const data = await res.json();
      setAllData(data);
      setFormData(data[selectedPage]?.[selectedLocale] || emptySeo);
    } catch {
      showToast('Failed to load SEO data', 'error');
    } finally {
      setLoading(false);
    }
  }, [selectedPage, selectedLocale]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (allData) {
      setFormData(allData[selectedPage]?.[selectedLocale] || emptySeo);
    }
  }, [selectedPage, selectedLocale, allData]);

  function showToast(message: string, type: 'success' | 'error') {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }

  function handleChange(field: keyof SeoData, value: string) {
    setFormData(prev => ({ ...prev, [field]: value }));
  }

  async function handleSave() {
    setSaving(true);
    try {
      const res = await fetch('/api/seo', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page: selectedPage, locale: selectedLocale, data: formData }),
      });
      const result = await res.json();
      if (result.success) {
        setFormData(prev => ({ ...prev, updated_at: result.updated_at }));
        if (allData) {
          setAllData(prev => ({
            ...prev!,
            [selectedPage]: {
              ...prev![selectedPage],
              [selectedLocale]: { ...formData, updated_at: result.updated_at },
            },
          }));
        }
        showToast('SEO settings saved', 'success');
      } else {
        showToast(result.error || 'Failed to save', 'error');
      }
    } catch {
      showToast('Network error', 'error');
    } finally {
      setSaving(false);
    }
  }

  function getFilledCount(pageKey: string): number {
    if (!allData?.[pageKey]) return 0;
    return Object.values(allData[pageKey]).filter(d => d.title_tag).length;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-6 right-6 z-50 px-5 py-3 rounded-xl text-sm font-medium shadow-lg transition-all ${
          toast.type === 'success'
            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
            : 'bg-red-500/20 text-red-400 border border-red-500/30'
        }`}>
          {toast.message}
        </div>
      )}

      {/* Header */}
      <header className="border-b border-white/10 bg-[#0a0a0a]/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-tight">
              <span className="text-[#D4AF37]">Healing Eye</span> SEO Manager
            </h1>
            <p className="text-xs text-white/40 mt-1">8 Pages / 7 Languages / {allData ? Object.values(allData).reduce((sum, page) => sum + Object.values(page).filter(d => d.title_tag).length, 0) : 0} configured</p>
          </div>
          <a href="/ko" target="_blank" className="text-xs text-white/40 hover:text-[#D4AF37] transition-colors">
            View Site &rarr;
          </a>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Page Selector */}
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 mb-6">
          {PAGES.map(p => (
            <button
              key={p.key}
              onClick={() => setSelectedPage(p.key)}
              className={`relative px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                selectedPage === p.key
                  ? 'bg-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/20'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
              }`}
            >
              {p.label}
              {allData && (
                <span className={`absolute -top-1 -right-1 w-4 h-4 rounded-full text-[9px] flex items-center justify-center font-bold ${
                  getFilledCount(p.key) === 7 ? 'bg-emerald-500 text-white' :
                  getFilledCount(p.key) > 0 ? 'bg-amber-500 text-black' :
                  'bg-white/20 text-white/50'
                }`}>
                  {getFilledCount(p.key)}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Locale Tabs */}
        <div className="flex gap-1.5 mb-8 overflow-x-auto pb-1">
          {LOCALES.map(l => {
            const hasSeo = allData?.[selectedPage]?.[l.key]?.title_tag;
            return (
              <button
                key={l.key}
                onClick={() => setSelectedLocale(l.key)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                  selectedLocale === l.key
                    ? 'bg-white/15 text-white border border-white/20'
                    : 'text-white/40 hover:text-white/70 hover:bg-white/5'
                }`}
              >
                {l.label}
                {hasSeo && <span className="ml-1.5 inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />}
              </button>
            );
          })}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-6 h-6 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {/* Form */}
            <div className="space-y-5">
              <Field
                label="Title Tag"
                hint="50-60 characters recommended"
                value={formData.title_tag}
                onChange={v => handleChange('title_tag', v)}
                maxLength={70}
              />

              <Field
                label="Meta Description"
                hint="150-160 characters recommended"
                value={formData.meta_description}
                onChange={v => handleChange('meta_description', v)}
                type="textarea"
                maxLength={200}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Field
                  label="OG Title"
                  hint="Open Graph title for social sharing"
                  value={formData.og_title}
                  onChange={v => handleChange('og_title', v)}
                />
                <Field
                  label="OG Image URL"
                  hint="1200x630px recommended"
                  value={formData.og_image}
                  onChange={v => handleChange('og_image', v)}
                />
              </div>

              <Field
                label="OG Description"
                hint="Social media sharing description"
                value={formData.og_description}
                onChange={v => handleChange('og_description', v)}
                type="textarea"
                maxLength={200}
              />

              <Field
                label="Keywords"
                hint="Comma-separated keywords"
                value={formData.keywords}
                onChange={v => handleChange('keywords', v)}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Field
                  label="Canonical URL"
                  hint="Full URL (e.g., https://healingeyeclinic.com/en/about)"
                  value={formData.canonical_url}
                  onChange={v => handleChange('canonical_url', v)}
                />
                <div>
                  <label className="block text-xs font-medium text-white/60 mb-2">Robots</label>
                  <select
                    value={formData.robots}
                    onChange={e => handleChange('robots', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37]/50 focus:ring-1 focus:ring-[#D4AF37]/30 transition-all appearance-none cursor-pointer"
                  >
                    {ROBOTS_OPTIONS.map(opt => (
                      <option key={opt} value={opt} className="bg-[#1a1a1a]">{opt}</option>
                    ))}
                  </select>
                </div>
              </div>

              <Field
                label="JSON-LD Structured Data"
                hint="Paste valid JSON-LD (optional)"
                value={formData.structured_data}
                onChange={v => handleChange('structured_data', v)}
                type="textarea"
                rows={6}
                mono
              />
            </div>

            {/* Save Bar */}
            <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
              <div className="text-xs text-white/30">
                {formData.updated_at && (
                  <>Last saved: {new Date(formData.updated_at).toLocaleString('ko-KR')}</>
                )}
              </div>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-8 py-3 bg-[#D4AF37] text-black rounded-xl font-semibold text-sm hover:bg-[#D4AF37]/90 disabled:opacity-50 transition-all shadow-lg shadow-[#D4AF37]/20 hover:shadow-[#D4AF37]/40"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>

            {/* Google Preview */}
            <div className="mt-10 border-t border-white/10 pt-8">
              <h3 className="text-xs font-medium text-white/40 uppercase tracking-wider mb-4">Google Search Preview</h3>
              <div className="bg-white rounded-xl p-5 max-w-xl">
                <div className="text-[#1a0dab] text-lg leading-tight truncate">
                  {formData.title_tag || 'Page Title'}
                </div>
                <div className="text-[#006621] text-sm mt-1 truncate">
                  https://healingeyeclinic.com/{selectedLocale === 'ko' ? '' : selectedLocale + '/'}
                  {selectedPage === 'home' ? '' : selectedPage}
                </div>
                <div className="text-[#545454] text-sm mt-1 line-clamp-2">
                  {formData.meta_description || 'Meta description will appear here...'}
                </div>
              </div>
            </div>

            {/* OG Preview */}
            {(formData.og_title || formData.og_image) && (
              <div className="mt-8 border-t border-white/10 pt-8">
                <h3 className="text-xs font-medium text-white/40 uppercase tracking-wider mb-4">Social Share Preview</h3>
                <div className="max-w-md border border-white/10 rounded-xl overflow-hidden bg-white/5">
                  {formData.og_image && (
                    <div className="aspect-[1200/630] bg-white/5 flex items-center justify-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={formData.og_image}
                        alt="OG Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <div className="text-xs text-white/40 uppercase">healingeyeclinic.com</div>
                    <div className="text-sm font-semibold text-white mt-1 truncate">
                      {formData.og_title || formData.title_tag || 'OG Title'}
                    </div>
                    <div className="text-xs text-white/50 mt-1 line-clamp-2">
                      {formData.og_description || formData.meta_description || 'OG Description'}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  hint,
  value,
  onChange,
  type = 'input',
  maxLength,
  rows = 3,
  mono = false,
}: {
  label: string;
  hint?: string;
  value: string;
  onChange: (v: string) => void;
  type?: 'input' | 'textarea';
  maxLength?: number;
  rows?: number;
  mono?: boolean;
}) {
  const charCount = value.length;
  const isOverLimit = maxLength ? charCount > maxLength : false;

  const inputClasses = `w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#D4AF37]/50 focus:ring-1 focus:ring-[#D4AF37]/30 transition-all ${
    mono ? 'font-mono text-xs leading-relaxed' : ''
  }`;

  return (
    <div>
      <div className="flex items-baseline justify-between mb-2">
        <label className="text-xs font-medium text-white/60">{label}</label>
        {maxLength && (
          <span className={`text-[10px] ${isOverLimit ? 'text-red-400' : 'text-white/30'}`}>
            {charCount}/{maxLength}
          </span>
        )}
      </div>
      {type === 'textarea' ? (
        <textarea
          value={value}
          onChange={e => onChange(e.target.value)}
          rows={rows}
          className={`${inputClasses} resize-y`}
          placeholder={hint}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          className={inputClasses}
          placeholder={hint}
        />
      )}
      {hint && type === 'input' && <p className="text-[10px] text-white/25 mt-1">{hint}</p>}
    </div>
  );
}
