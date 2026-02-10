import PageClient from './PageClient';
import { getYouTubeVideos, getFeaturedYouTubeVideo } from '@/lib/youtube';
import { getNaverBlogPosts } from '@/lib/naver-blog';
import { getMessages } from 'next-intl/server';

export const revalidate = 3600; // 1시간마다 재검증

// Featured Video ID (고정)
const FEATURED_VIDEO_ID = 'zb2s1BpBvac';

// Featured Video 정보 (하드코딩)
const FEATURED_VIDEO_INFO = {
  id: 'zb2s1BpBvac',
  title: '단 4곳에서만 사용 가능한 LAL 렌즈 백내장 수술 드디어 시작합니다 🎉',
  link: 'https://www.youtube.com/watch?v=zb2s1BpBvac',
  publishedAt: '2024-01-15T00:00:00Z',
  thumbnail: 'https://i.ytimg.com/vi/zb2s1BpBvac/maxresdefault.jpg',
  description: 'LAL(Light Adjustable Lens) 렌즈를 이용한 프리미엄 백내장 수술에 대해 소개합니다.',
};

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
    const params = await props.params;
    const { locale } = params;
    const messages = await getMessages({ locale }) as { Metadata: { insight: { title: string; description: string } } };

    return {
        title: messages.Metadata.insight.title,
        description: messages.Metadata.insight.description,
    };
}

export default async function InsightPage() {
    // 병렬로 데이터 fetch
    const [allVideos, blogPosts] = await Promise.all([
        getYouTubeVideos(15), // 최신 영상 15개 가져오기
        getNaverBlogPosts(3),  // Recent Columns 3개
    ]);

    // Featured Video는 하드코딩된 정보 사용
    const featuredVideo = FEATURED_VIDEO_INFO;

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
