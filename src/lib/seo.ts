import fs from 'fs';
import path from 'path';

export interface SeoData {
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

export type SeoSettings = Record<string, Record<string, SeoData>>;

const SEO_FILE_PATH = path.join(process.cwd(), 'src/data/seo-settings.json');

export function readSeoSettings(): SeoSettings {
  const raw = fs.readFileSync(SEO_FILE_PATH, 'utf-8');
  return JSON.parse(raw);
}

export function writeSeoSettings(data: SeoSettings): void {
  fs.writeFileSync(SEO_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

export function getSeoForPage(pageKey: string, locale: string): SeoData | null {
  const settings = readSeoSettings();
  const pageData = settings[pageKey]?.[locale];
  if (!pageData || !pageData.title_tag) return null;
  return pageData;
}
