import PageClient from './PageClient';
import { getMessages } from 'next-intl/server';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
    const params = await props.params;
    const { locale } = params;
    const messages = await getMessages({ locale }) as { Metadata: { cataract: { title: string; description: string } } };

    return {
        title: messages.Metadata.cataract.title,
        description: messages.Metadata.cataract.description,
    };
}

export default function CataractPage() {
    return <PageClient />;
}
