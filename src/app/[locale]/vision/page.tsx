import PageClient from './PageClient';
import { getMessages } from 'next-intl/server';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
    const params = await props.params;
    const { locale } = params;
    const messages = await getMessages({ locale }) as { Metadata: { vision: { title: string; description: string } } };

    return {
        title: messages.Metadata.vision.title,
        description: messages.Metadata.vision.description,
    };
}

export default function VisionPage() {
    return <PageClient />;
}
