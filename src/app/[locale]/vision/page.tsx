import PageClient from './PageClient';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
    const params = await props.params;
    const { locale } = params;

    return {
        title: `시력교정 센터 (스마일/라섹) | Healing Eye`,
        description: `힐링안과 시력교정 센터. 스마일라식, 뉴스마일, 투데이라섹. 부작용 0%를 지향하는 안전 우선주의 수술.`,
    };
}

export default function VisionPage() {
    return <PageClient />;
}
