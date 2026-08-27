import React from 'react';
import { notFound } from 'next/navigation';
import { PILLAR_POSTS, getPostBySlug } from '@/lib/blog-data';
import Script from 'next/script';

export const dynamicParams = true;

export function generateStaticParams() {
  return PILLAR_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);
  if (!post) return {};
  
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: [{ url: post.image, width: 1200, height: 630, alt: post.title }],
    }
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);
  if (!post) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "image": [post.image],
    "datePublished": post.date,
    "author": [{
        "@type": "Organization",
        "name": post.author,
        "url": "https://www.supremesvillagio.com/"
      }]
  };

  return (
    <>
      <Script
        id={`json-ld-article-${post.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <article className="pt-32 pb-20 px-4 md:px-8 max-w-4xl mx-auto min-h-screen">
        <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-wider text-gold mb-6">
          <span>{post.date}</span>
          <span className="w-1 h-1 rounded-full bg-cream/30"></span>
          <span>{post.author}</span>
        </div>
        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-forest mb-8 leading-tight">
          {post.title}
        </h1>
        
        <div className="relative h-64 md:h-[500px] w-full overflow-hidden rounded-xl mb-16 shadow-2xl">
          <img 
            src={post.image} 
            alt={post.title} 
            className="object-cover w-full h-full"
          />
        </div>

        <div 
          className="prose prose-lg max-w-none text-forest/80 prose-headings:font-heading prose-headings:text-forest prose-headings:font-normal prose-a:text-gold hover:prose-a:text-gold/80 prose-strong:text-forest"
          dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br/>').replace(/## (.*?)<br\/>/g, '<h2>$1</h2>').replace(/### (.*?)<br\/>/g, '<h3>$1</h3>').replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>') }}
        />
      </article>
    </>
  );
}
