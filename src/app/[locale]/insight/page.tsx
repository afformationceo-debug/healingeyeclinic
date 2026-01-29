import PageClient from './PageClient';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
    const params = await props.params;
    const { locale } = params;

    return {
        title: `인사이트 (칼럼/유튜브) | Healing Eye`,
        description: `힐링안과 인사이트. 전문 의료진이 전하는 눈 건강 칼럼과 유튜브 영상(닥터아이시스). 올바른 안과 상식을 전달합니다.`,
    };
}

export default function InsightPage() {
    return <PageClient />;
}
