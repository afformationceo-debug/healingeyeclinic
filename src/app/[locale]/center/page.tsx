import PageClient from './PageClient';
import { getMessages } from 'next-intl/server';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
    const params = await props.params;
    const { locale } = params;
    const messages = await getMessages({ locale }) as { Metadata: { center: { title: string; description: string } } };

    return {
        title: messages.Metadata.center.title,
        description: messages.Metadata.center.description,
    };
}

export default function CenterPage() {
    return <PageClient />;
}
