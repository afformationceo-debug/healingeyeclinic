import Parser from 'rss-parser';

export interface NaverBlogPost {
  title: string;
  link: string;
  publishedAt: string;
  description: string;
  thumbnail: string | null;
  category: string;
}

const parser = new Parser();

// HTML에서 첫 번째 이미지 URL 추출
function extractImageFromHtml(html: string): string | null {
  const imgRegex = /<img[^>]+src="([^">]+)"/i;
  const match = html.match(imgRegex);
  return match ? match[1] : null;
}

// HTML 태그 제거 및 텍스트 추출
function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .trim();
}

export async function getNaverBlogPosts(limit: number = 10): Promise<NaverBlogPost[]> {
  const blogId = process.env.NAVER_BLOG_ID;

  if (!blogId) {
    console.error('NAVER_BLOG_ID is not set');
    return [];
  }

  try {
    const feedUrl = `https://rss.blog.naver.com/${blogId}.xml`;
    const feed = await parser.parseURL(feedUrl);

    return feed.items.slice(0, limit).map((item: any) => {
      const htmlContent = item.content || item.description || '';
      const thumbnail = extractImageFromHtml(htmlContent);
      const description = stripHtml(htmlContent).substring(0, 150);

      return {
        title: item.title || '',
        link: item.link || '',
        publishedAt: item.pubDate || item.isoDate || new Date().toISOString(),
        description: description || '',
        thumbnail: thumbnail,
        category: item.category || 'MEDICAL COLUMN',
      };
    });
  } catch (error) {
    console.error('Failed to fetch Naver blog posts:', error);
    return [];
  }
}
