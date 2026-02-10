import PageClient from './PageClient';
import { getMessages } from 'next-intl/server';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
    const params = await props.params;
    const { locale } = params;
    const messages = await getMessages({ locale }) as { Metadata: { community: { title: string; description: string } } };

    return {
        title: messages.Metadata.community.title,
        description: messages.Metadata.community.description,
    };
}

export default function CommunityPage() {
    return <PageClient />;
}
