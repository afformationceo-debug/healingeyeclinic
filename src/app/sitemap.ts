import { MetadataRoute } from 'next';
import { locales } from '@/i18n/config';
import fs from 'fs';
import path from 'path';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://healingeyeclinic.vercel.app';
    const routes = [
        '',
        '/about',
        '/vision',
        '/cataract',
        '/center',
        '/insight',
        '/community',
        '/blog'
    ];

    // Discover blog MDX slugs dynamically
    const blogDir = path.join(process.cwd(), 'src/content/blog');
    const blogSlugs: string[] = [];
    try {
        const localeDirs = fs.readdirSync(blogDir);
        for (const localeDir of localeDirs) {
            const localePath = path.join(blogDir, localeDir);
            if (fs.statSync(localePath).isDirectory()) {
                const files = fs.readdirSync(localePath);
                for (const file of files) {
                    if (file.endsWith('.mdx')) {
                        const slug = file.replace(/\.mdx$/, '');
                        if (!blogSlugs.includes(slug)) {
                            blogSlugs.push(slug);
                        }
                    }
                }
            }
        }
    } catch {
        // blog directory may not exist yet
    }

    const sitemapEntries: MetadataRoute.Sitemap = [];

    routes.forEach((route) => {
        locales.forEach((locale) => {
            sitemapEntries.push({
                url: `${baseUrl}/${locale}${route}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: route === '' ? 1 : 0.8,
            });
        });
    });

    // Add dynamic blog post routes
    blogSlugs.forEach((slug) => {
        locales.forEach((locale) => {
            sitemapEntries.push({
                url: `${baseUrl}/${locale}/blog/${slug}`,
                lastModified: new Date(),
                changeFrequency: 'monthly',
                priority: 0.6,
            });
        });
    });

    return sitemapEntries;
}
