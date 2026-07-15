import { getPostBySlug, getPostSlugs, markdownToHtml } from '@/lib/markdown';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({
    slug: slug.replace(/\.md$/, ''),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = getPostBySlug(slug);
    return {
      title: `${post.title} | Supreme Villagio Blog`,
      description: post.description,
      openGraph: {
        title: post.title,
        description: post.description,
        type: "article",
        url: `https://www.supremesvillagio.com/blog/${slug}`,
        images: post.image ? [{ url: post.image }] : [],
      },
      alternates: {
        canonical: `https://www.supremesvillagio.com/blog/${slug}`,
      }
    };
  } catch (e) {
    return {
      title: "Blog Not Found"
    }
  }
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let post;
  
  try {
    post = getPostBySlug(slug);
  } catch (e) {
    notFound();
  }

  const contentHtml = await markdownToHtml(post.content);

  // Advanced Blog Schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.supremesvillagio.com/blog/${slug}`
    },
    "headline": post.title,
    "description": post.description,
    "image": post.image,
    "author": {
      "@type": "Organization",
      "name": "Supreme Universal"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Supreme Universal",
      "logo": {
        "@type": "ImageObject",
        "url": "https://d66htbxvzotmo.cloudfront.net/media/1Xi8pH_seologo.jpg"
      }
    },
    "datePublished": new Date(post.date).toISOString()
  };

  return (
    <article className="pt-32 pb-24 bg-charcoal min-h-screen text-cream">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        <Link href="/blog" className="inline-flex items-center text-xs text-gold uppercase tracking-widest hover:text-white transition-colors mb-12">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Back to Journal
        </Link>
        
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-semibold text-cream mb-6 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center text-stone text-sm">
            <span>By Supreme Universal</span>
            <span className="mx-3 border-l border-stone/30 h-4"></span>
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </time>
          </div>
        </header>

        {post.image && (
          <div className="mb-16 aspect-[21/9] relative rounded-none overflow-hidden bg-charcoal-light">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={post.image} 
              alt={post.title} 
              className="object-cover w-full h-full"
            />
          </div>
        )}

        {/* Markdown Content styling using global utility classes or arbitrary tailwind */}
        <div 
          className="prose prose-lg prose-invert prose-headings:font-heading prose-headings:font-semibold prose-headings:text-gold prose-a:text-gold prose-a:no-underline hover:prose-a:underline prose-strong:text-white max-w-none"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </div>
    </article>
  );
}
