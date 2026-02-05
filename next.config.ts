import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin(
  './src/i18n/request.ts'
);

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Disable Turbopack due to HMR version bug, use webpack instead
  turbopack: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
