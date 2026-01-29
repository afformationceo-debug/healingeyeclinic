import PageClient from './PageClient';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
    const params = await props.params;
    const { locale } = params;

    return {
        title: `커뮤니티 (공지사항/후기) | Healing Eye`,
        description: `힐링안과 커뮤니티. 병원 공지사항, 언론 보도 자료, 그리고 고객들의 생생한 치료 후기를 확인하세요.`,
    };
}

export default function CommunityPage() {
    return <PageClient />;
}
