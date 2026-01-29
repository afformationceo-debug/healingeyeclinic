import PageClient from './PageClient';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
    const params = await props.params;
    const { locale } = params;

    return {
        title: `안질환 센터 (건조증/망막/녹내장) | Healing Eye`,
        description: `힐링안과 안질환 센터. 안구건조증 IPL 치료, 망막 정밀 검사, 녹내장 조기 발견. 대학병원급 장비로 정밀한 진단과 치료를 제공합니다.`,
    };
}

export default function CenterPage() {
    return <PageClient />;
}
