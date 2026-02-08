import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin(
  './src/i18n/request.ts'
);

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: '**.ytimg.com', // YouTube 썸네일 (모든 서브도메인)
      },
      {
        protocol: 'https',
        hostname: 'yt3.ggpht.com', // YouTube 고화질 썸네일
      },
      {
        protocol: 'https',
        hostname: '**.ggpht.com', // YouTube 고화질 썸네일 (모든 서브도메인)
      },
      {
        protocol: 'https',
        hostname: '**.pstatic.net', // 네이버 블로그 이미지 (모든 서브도메인)
      },
    ],
  },
};

export default withNextIntl(nextConfig);
