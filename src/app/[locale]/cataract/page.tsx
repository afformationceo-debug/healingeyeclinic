import PageClient from './PageClient';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
    const params = await props.params;
    const { locale } = params;

    return {
        title: `백내장/노안 센터 | Healing Eye`,
        description: `힐링안과 백내장/노안 센터. 대학병원급 검사 장비와 1:1 맞춤형 프리미엄 인공수정체 수술. 노안 교정과 백내장 치료를 동시에.`,
    };
}

export default function CataractPage() {
    return <PageClient />;
}
