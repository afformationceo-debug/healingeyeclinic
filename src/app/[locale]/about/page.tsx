import { getTranslations } from 'next-intl/server';
import PageClient from './PageClient';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
    const params = await props.params;
    const { locale } = params;
    const t = await getTranslations({ locale, namespace: 'About' });

    return {
        title: `힐링안과 소개 | Healing Eye`,
        description: `강남 힐링안과 소개. 김선영 대표원장, 대학병원 교수 출신 의료진. 스마일라식, 백내장, 안구건조증 중점 진료.`,
    };
}

export default function AboutPage() {
    return <PageClient />;
}
