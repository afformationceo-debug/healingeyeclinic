import PageClient from './PageClient';
import { getMessages } from 'next-intl/server';
import { getSeoForPage } from '@/lib/seo';
import type { Metadata } from 'next';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await props.params;
    const seo = getSeoForPage('center', locale);
    const messages = await getMessages({ locale }) as { Metadata: { center: { title: string; description: string } } };

    const title = seo?.title_tag || messages.Metadata.center.title;
    const description = seo?.meta_description || messages.Metadata.center.description;

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

export default function CenterPage() {
    return <PageClient />;
}
