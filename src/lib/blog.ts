import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'src/content/blog');

export interface Post {
    slug: string;
    metadata: {
        title: string;
        date: string;
        excerpt: string;
        author?: string;
        [key: string]: any;
    };
    content: string;
}

export function getPosts(locale: string): Post[] {
    const dirPath = path.join(contentDirectory, locale);

    if (!fs.existsSync(dirPath)) {
        return [];
    }

    const files = fs.readdirSync(dirPath);

    const posts = files
        .filter((file) => file.endsWith('.mdx'))
        .map((file) => {
            const filePath = path.join(dirPath, file);
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            const { data, content } = matter(fileContent);

            return {
                slug: file.replace('.mdx', ''),
                metadata: data as Post['metadata'],
                content,
            };
        })
        .sort((a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime());

    return posts;
}

export function getPostBySlug(locale: string, slug: string): Post | null {
    try {
        const filePath = path.join(contentDirectory, locale, `${slug}.mdx`);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const { data, content } = matter(fileContent);

        return {
            slug,
            metadata: data as Post['metadata'],
            content,
        };
    } catch (e) {
        return null;
    }
}
