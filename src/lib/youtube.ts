import Parser from 'rss-parser';

export interface YouTubeVideo {
  id: string;
  title: string;
  link: string;
  publishedAt: string;
  thumbnail: string;
  description: string;
}

const parser = new Parser({
  customFields: {
    item: [
      ['media:group', 'media'],
    ],
  },
});

export async function getYouTubeVideos(limit: number = 15): Promise<YouTubeVideo[]> {
  const channelId = process.env.YOUTUBE_CHANNEL_ID;

  if (!channelId) {
    console.error('YOUTUBE_CHANNEL_ID is not set');
    return [];
  }

  try {
    const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
    const feed = await parser.parseURL(feedUrl);

    return feed.items.slice(0, limit).map((item: any) => ({
      id: item.id.split(':')[2], // yt:video:VIDEO_ID
      title: item.title || '',
      link: item.link || '',
      publishedAt: item.pubDate || item.isoDate || '',
      thumbnail: item.media?.['media:thumbnail']?.[0]?.$.url ||
                 `https://i.ytimg.com/vi/${item.id.split(':')[2]}/hqdefault.jpg`,
      description: item.contentSnippet || item.content || '',
    }));
  } catch (error) {
    console.error('Failed to fetch YouTube videos:', error);
    return [];
  }
}

// 특정 비디오 ID로 Featured Video 가져오기
export async function getFeaturedYouTubeVideo(videoId: string): Promise<YouTubeVideo | null> {
  const channelId = process.env.YOUTUBE_CHANNEL_ID;

  if (!channelId) {
    console.error('YOUTUBE_CHANNEL_ID is not set');
    return null;
  }

  try {
    const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
    const feed = await parser.parseURL(feedUrl);

    // RSS 피드에서 해당 비디오 찾기
    const videoItem = feed.items.find((item: any) => {
      const id = item.id.split(':')[2];
      return id === videoId;
    });

    if (videoItem) {
      // RSS 피드에서 찾은 경우
      return {
        id: videoItem.id.split(':')[2],
        title: videoItem.title || '',
        link: videoItem.link || '',
        publishedAt: videoItem.pubDate || videoItem.isoDate || '',
        thumbnail: videoItem.media?.['media:thumbnail']?.[0]?.$.url ||
                   `https://i.ytimg.com/vi/${videoItem.id.split(':')[2]}/maxresdefault.jpg`,
        description: videoItem.contentSnippet || videoItem.content || '',
      };
    } else {
      // RSS 피드에 없는 경우 YouTube 페이지에서 제목 가져오기
      console.warn(`Video ${videoId} not found in RSS feed. Fetching title from YouTube page.`);

      try {
        const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
        const response = await fetch(videoUrl);
        const html = await response.text();

        // YouTube 페이지에서 제목 추출
        const titleMatch = html.match(/<meta name="title" content="([^"]+)"/);
        const title = titleMatch ? titleMatch[1] : 'Featured Video';

        // 설명 추출 (선택적)
        const descMatch = html.match(/<meta name="description" content="([^"]+)"/);
        const description = descMatch ? descMatch[1] : '';

        return {
          id: videoId,
          title: title,
          link: videoUrl,
          publishedAt: new Date().toISOString(),
          thumbnail: `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
          description: description,
        };
      } catch (error) {
        console.error('Failed to fetch video metadata from YouTube page:', error);
        return {
          id: videoId,
          title: 'Featured Video',
          link: `https://www.youtube.com/watch?v=${videoId}`,
          publishedAt: new Date().toISOString(),
          thumbnail: `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
          description: '',
        };
      }
    }
  } catch (error) {
    console.error('Failed to fetch featured YouTube video:', error);
    return null;
  }
}
