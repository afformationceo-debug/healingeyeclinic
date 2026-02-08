import PageClient from './PageClient';
import { getYouTubeVideos, getFeaturedYouTubeVideo } from '@/lib/youtube';
import { getNaverBlogPosts } from '@/lib/naver-blog';

export const revalidate = 3600; // 1시간마다 재검증

// Featured Video ID (고정)
const FEATURED_VIDEO_ID = 'zb2s1BpBvac';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
    const params = await props.params;
    const { locale } = params;

    return {
        title: `인사이트 (칼럼/유튜브) | Healing Eye`,
        description: `힐링안과 인사이트. 전문 의료진이 전하는 눈 건강 칼럼과 유튜브 영상(안과언니). 올바른 안과 상식을 전달합니다.`,
    };
}

export default async function InsightPage() {
    // 병렬로 데이터 fetch
    const [featuredVideo, allVideos, blogPosts] = await Promise.all([
        getFeaturedYouTubeVideo(FEATURED_VIDEO_ID), // Featured 영상 (특정 ID)
        getYouTubeVideos(15), // 최신 영상 15개 가져오기
        getNaverBlogPosts(3),  // Recent Columns 3개
    ]);

    // Gallery용 영상: Featured 영상 제외하고 최신순 9개
    const galleryVideos = allVideos
        .filter(video => video.id !== FEATURED_VIDEO_ID)
        .slice(0, 9);

    return (
        <PageClient
            featuredVideo={featuredVideo}
            youtubeVideos={galleryVideos}
            blogPosts={blogPosts}
        />
    );
}
