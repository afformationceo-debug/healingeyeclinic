import { getMessages } from 'next-intl/server';
import { getSeoForPage } from '@/lib/seo';
import type { Metadata } from 'next';
import PageClient from './PageClient';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await props.params;
    const seo = getSeoForPage('about', locale);
    const messages = await getMessages({ locale }) as { Metadata: { about: { title: string; description: string } } };

    const title = seo?.title_tag || messages.Metadata.about.title;
    const description = seo?.meta_description || messages.Metadata.about.description;

    return {
        title,
        description,
        openGraph: {
            title: seo?.og_title || title,
            description: seo?.og_description || description,
            ...(seo?.og_image && { images: [seo.og_image] }),
        },
        ...(seo?.keywords && { keywords: seo.keywords }),
        ...(seo?.canonical_url && { alternates: { canonical: seo.canonical_url } }),
        ...(seo?.robots && { robots: seo.robots }),
    };
}

export default function AboutPage() {
    return <PageClient />;
}
