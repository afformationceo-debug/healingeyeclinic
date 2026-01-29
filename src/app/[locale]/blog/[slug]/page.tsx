import { getPostBySlug } from '@/lib/blog';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';

export default async function BlogPostPage({ params }: { params: { locale: string, slug: string } }) {
    const { locale, slug } = await params;
    const post = getPostBySlug(locale, slug);

    if (!post) {
        notFound();
    }

    return (
        <article className="min-h-screen pt-32 pb-20">
            <div className="container mx-auto px-6 max-w-3xl">
                <header className="mb-12 text-center">
                    <div className="text-primary text-sm mb-4">{post.metadata.date}</div>
                    <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mb-8 leading-tight">
                        {post.metadata.title}
                    </h1>
                    <div className="w-20 h-1 bg-primary/30 mx-auto rounded-full" />
                </header>

                <div className="prose prose-invert prose-lg max-w-none prose-headings:font-serif prose-a:text-primary prose-img:rounded-2xl">
                    <MDXRemote source={post.content} />
                </div>
            </div>
        </article>
    );
}
