import Link from 'next/link';
import { getPosts } from '@/lib/blog';
import { getSeoForPage } from '@/lib/seo';
import type { Metadata } from 'next';

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await props.params;
    const seo = getSeoForPage('blog', locale);

    const title = seo?.title_tag || 'Healing Journal | Healing Eye Clinic';
    const description = seo?.meta_description || 'In-depth stories about eye health and vision correction.';

    return {
        title,
        description,
        openGraph: {
            title: seo?.og_title || title,
            description: seo?.og_description || description,
            ...(seo?.og_image && { images: [seo.og_image] }),
        },
        ...(seo?.keywords && { keywords: seo.keywords }),
        ...(seo?.canonical_url && { alternates: { canonical: seo.canonical_url } }),
        ...(seo?.robots && { robots: seo.robots }),
    };
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const posts = getPosts(locale);

    return (
        <div className="min-h-screen pt-24 pb-20">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-white">
                        Healing <span className="text-primary">Journal</span>
                    </h1>
                    <p className="text-xl text-muted-foreground">
                        In-depth stories about eye health and vision correction.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <Link key={post.slug} href={`/${locale}/blog/${post.slug}`} className="group block">
                            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-primary/50 transition-colors duration-300 h-full flex flex-col">
                                <div className="aspect-video bg-neutral-800 relative">
                                    {/* Placeholder for post image */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                </div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="text-xs text-primary mb-2 uppercase tracking-wider">{post.metadata.date}</div>
                                    <h2 className="text-xl font-bold mb-3 text-white group-hover:text-primary transition-colors line-clamp-2">
                                        {post.metadata.title}
                                    </h2>
                                    <p className="text-muted-foreground text-sm line-clamp-3 mb-4 flex-1">
                                        {post.metadata.excerpt}
                                    </p>
                                    <div className="text-sm font-medium text-white/50 group-hover:text-white transition-colors">Read Article →</div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {posts.length === 0 && (
                    <div className="text-center py-20 text-muted-foreground">
                        No posts found for this language ({locale}).
                    </div>
                )}
            </div>
        </div>
    );
}
