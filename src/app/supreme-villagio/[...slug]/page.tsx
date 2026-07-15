import { Metadata } from 'next';
import LandingPageTemplate from '@/components/layout/LandingPageTemplate';
import { generateSeoDataFromSlug, generateSeoSlugs } from '@/lib/seo-data';
import Script from 'next/script';

export function generateStaticParams() {
  const slugs = generateSeoSlugs();
  return slugs.map((slugArray) => ({
    slug: slugArray, // slug is now an array of path segments
  }));
}

export const revalidate = 86400; // ISR Revalidate every 24 hours

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const slugArray = resolvedParams.slug || [];
  const urlPath = slugArray.join('/');
  const data = generateSeoDataFromSlug(slugArray);
  
  return {
    title: data.title,
    description: data.description,
    openGraph: {
      title: data.title,
      description: data.description,
      type: "website",
      url: `https://supremevillagio.com/supreme-villagio/${urlPath}`,
    },
    alternates: {
      canonical: `https://supremevillagio.com/supreme-villagio/${urlPath}`,
    }
  };
}

export default async function DynamicSeoPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const resolvedParams = await params;
  const slugArray = resolvedParams.slug || [];
  const urlPath = slugArray.join('/');
  const data = generateSeoDataFromSlug(slugArray);

  const listingJsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "name": data.title,
    "description": data.description,
    "url": `https://supremevillagio.com/supreme-villagio/${urlPath}`,
    "datePosted": new Date().toISOString().split('T')[0],
    "publisher": {
      "@id": "https://supremevillagio.com/#organization"
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "INR",
      "price": "28900000",
      "availability": "https://schema.org/InStock",
      "itemOffered": {
        "@type": "SingleFamilyResidence",
        "name": data.typology,
        "description": data.heroSubline,
        "numberOfRooms": data.typology.includes('5') ? 5 : 4,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Somatane",
          "addressLocality": "Pune",
          "addressRegion": "MH",
          "postalCode": "410506",
          "addressCountry": "IN"
        }
      }
    }
  };

  // Dynamic Multi-Tier Breadcrumbs
  const breadcrumbItems = [
    {
      "@type": "ListItem", 
      "position": 1, 
      "name": "Home",
      "item": "https://supremevillagio.com/"  
    },
    {
      "@type": "ListItem", 
      "position": 2, 
      "name": "Supreme Villagio",
      "item": "https://supremevillagio.com/supreme-villagio/"  
    }
  ];

  let currentPath = "https://supremevillagio.com/supreme-villagio";
  slugArray.forEach((segment, index) => {
    currentPath += `/${segment}`;
    breadcrumbItems.push({
      "@type": "ListItem",
      "position": index + 3,
      "name": segment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      "item": currentPath
    });
  });

  const breadcrumbJsonLd = {
    "@context": "https://schema.org/", 
    "@type": "BreadcrumbList", 
    "itemListElement": breadcrumbItems
  };

  return (
    <>
      <Script
        id={`json-ld-listing-${slugArray.join('-')}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listingJsonLd) }}
      />
      <Script
        id={`json-ld-breadcrumb-${slugArray.join('-')}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <LandingPageTemplate 
        heroHeadline1={data.heroHeadline1}
        heroHeadline2={data.heroHeadline2}
        heroSubline={data.heroSubline}
        highlightWords={data.highlightWords}
        pricing={data.pricing}
        typology={data.typology}
      />
    </>
  );
}
