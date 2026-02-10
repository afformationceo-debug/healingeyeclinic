import { getMessages } from 'next-intl/server';
import PageClient from './PageClient';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
    const params = await props.params;
    const { locale } = params;
    const messages = await getMessages({ locale }) as { Metadata: { about: { title: string; description: string } } };

    return {
        title: messages.Metadata.about.title,
        description: messages.Metadata.about.description,
    };
}

export default function AboutPage() {
    return <PageClient />;
}
