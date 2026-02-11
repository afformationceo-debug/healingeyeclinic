import { NextRequest, NextResponse } from 'next/server';
import { readSeoSettings, writeSeoSettings, type SeoData } from '@/lib/seo';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const pageKey = searchParams.get('page');
  const locale = searchParams.get('locale');

  const settings = readSeoSettings();

  if (pageKey && locale) {
    return NextResponse.json(settings[pageKey]?.[locale] || null);
  }
  if (pageKey) {
    return NextResponse.json(settings[pageKey] || null);
  }

  return NextResponse.json(settings);
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const { page, locale, data } = body as { page: string; locale: string; data: SeoData };

  if (!page || !locale || !data) {
    return NextResponse.json({ error: 'Missing page, locale, or data' }, { status: 400 });
  }

  const settings = readSeoSettings();

  if (!settings[page]) {
    return NextResponse.json({ error: 'Invalid page key' }, { status: 400 });
  }

  settings[page][locale] = {
    ...data,
    updated_at: new Date().toISOString(),
  };

  writeSeoSettings(settings);

  return NextResponse.json({ success: true, updated_at: settings[page][locale].updated_at });
}
