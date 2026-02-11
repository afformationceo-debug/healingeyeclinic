import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './src/i18n/config';
import { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware({
    locales,
    defaultLocale,
    localePrefix: 'always'
});

export default function middleware(request: NextRequest) {
    // Skip i18n middleware for admin routes
    if (request.nextUrl.pathname.startsWith('/admin')) {
        return;
    }
    return intlMiddleware(request);
}

export const config = {
    matcher: [
        '/',
        '/(ko|en|ja|zh-CN|zh-TW|th|ru)/:path*',
        '/((?!_next|_vercel|api|.*\\..*).*)'
    ]
};
