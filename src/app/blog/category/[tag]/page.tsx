import Link from 'next/link';
import { getAllPosts } from '@/lib/markdown';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: { tag: string } }): Promise<Metadata> {
  const decodedTag = decodeURIComponent(params.tag).replace(/-/g, ' ');
  const capitalizedTag = decodedTag.charAt(0).toUpperCase() + decodedTag.slice(1);
  return {
    title: `${capitalizedTag} Articles | Supreme Villagio Blog`,
    description: `Read the latest articles about ${capitalizedTag} at Supreme Villagio, Somatane Pune.`,
    alternates: {
      canonical: `https://www.supremesvillagio.com/blog/category/${params.tag}`,
    },
  };
}

export function generateStaticParams() {
  const posts = getAllPosts();
  const allTags = Array.from(new Set(posts.flatMap(post => post.tags || [])));
  
  return allTags.map((tag) => ({
    tag: tag,
  }));
}

export default function CategoryPage({ params }: { params: { tag: string } }) {
  const allPosts = getAllPosts();
  const decodedTag = decodeURIComponent(params.tag);
  
  const filteredPosts = allPosts.filter(post => 
    post.tags && post.tags.includes(decodedTag)
  );

  if (filteredPosts.length === 0) {
    notFound();
  }

  const displayTag = decodedTag.replace(/-/g, ' ');
  const allTags = Array.from(new Set(allPosts.flatMap(post => post.tags || []))).sort();

  return (
    <div className="pt-32 pb-24 bg-charcoal min-h-screen">
      <div className="container mx-auto px-6 md:px-12 max-w-5xl">
        <header className="mb-16">
          <div className="text-gold tracking-widest uppercase text-sm mb-4 font-semibold">Category</div>
          <h1 className="text-4xl md:text-6xl font-heading font-semibold text-cream mb-4 capitalize">
            {displayTag}
          </h1>
        </header>

        {/* Tag Navigation */}
        <div className="flex flex-wrap gap-3 mb-12 border-b border-white/10 pb-6">
          <Link 
            href="/blog" 
            className="px-4 py-2 text-xs uppercase tracking-widest text-cream border border-cream/20 hover:border-gold hover:text-gold transition-colors"
          >
            All Articles
          </Link>
          {allTags.map(tag => (
            <Link 
              key={tag} 
              href={`/blog/category/${tag}`}
              className={`px-4 py-2 text-xs uppercase tracking-widest transition-colors ${
                tag === decodedTag 
                  ? 'font-semibold bg-gold text-charcoal border border-gold' 
                  : 'text-cream border border-cream/20 hover:border-gold hover:text-gold'
              }`}
            >
              {tag.replace(/-/g, ' ')}
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
              <div className="bg-charcoal-light border border-white/10 rounded-none overflow-hidden transition-all duration-300 group-hover:border-gold/50 group-hover:-translate-y-1">
                <div className="aspect-[16/9] relative bg-charcoal overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="object-cover w-full h-full opacity-80 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105 transform"
                  />
                </div>
                <div className="p-6 md:p-8">
                  <div className="flex justify-between items-center mb-3">
                    <div className="text-xs text-gold tracking-widest uppercase">
                      {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                  </div>
                  <h2 className="text-xl md:text-2xl font-heading text-cream mb-4 line-clamp-2 group-hover:text-gold transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-stone text-sm line-clamp-3 font-light leading-relaxed">
                    {post.description}
                  </p>
                  <div className="mt-6 flex items-center text-xs text-cream uppercase tracking-widest group-hover:text-gold transition-colors">
                    Read Article 
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
