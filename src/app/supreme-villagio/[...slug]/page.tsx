import { Metadata } from 'next';
import LandingPageTemplate from '@/components/layout/LandingPageTemplate';
import RelatedProperties from '@/components/sections/RelatedProperties';
import { generateSeoDataFromSlug, generateSeoSlugs, isValidSeoSlug, getRelatedSlugs } from '@/lib/seo-data';
import Script from 'next/script';
import { notFound } from 'next/navigation';

export const dynamicParams = true; // Enables On-Demand ISR for 12,000+ pages
export const revalidate = 86400; // ISR Revalidate every 24 hours

export function generateStaticParams() {
  const slugs = generateSeoSlugs();
  return slugs.map((slugArray) => ({
    slug: slugArray, // slug is now an array of path segments
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const slugArray = resolvedParams.slug || [];
  
  // Security Patch: Prevent Metadata "Soft 404" spam injection
  if (!isValidSeoSlug(slugArray)) {
    notFound();
  }

  const urlPath = slugArray.join('/');
  const data = generateSeoDataFromSlug(slugArray);
  
  return {
    title: data.title,
    description: data.description,
    openGraph: {
      title: data.title,
      description: data.description,
      type: "website",
      url: `https://www.supremesvillagio.com/supreme-villagio/${urlPath}`,
      images: [
        {
          url: "https://d66htbxvzotmo.cloudfront.net/media/1Xi8pH_seologo.jpg",
          width: 1200,
          height: 630,
          alt: data.title,
        }
      ],
    },
    alternates: {
      canonical: `https://www.supremesvillagio.com/supreme-villagio/${urlPath}`,
    }
  };
}

export default async function DynamicSeoPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const resolvedParams = await params;
  const slugArray = resolvedParams.slug || [];
  
  // Security Patch: Prevent "Soft 404" spam injection
  if (!isValidSeoSlug(slugArray)) {
    notFound(); // Instantly returns HTTP 404, blocking Google from indexing toxic/garbage URLs
  }

  const urlPath = slugArray.join('/');
  const data = generateSeoDataFromSlug(slugArray);
  const relatedSlugs = getRelatedSlugs(slugArray, 6);

  const listingJsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "name": data.title,
    "description": data.description,
    "image": [
      "https://d66htbxvzotmo.cloudfront.net/media/1Xi8pH_seologo.jpg",
      "https://d66htbxvzotmo.cloudfront.net/media/1Xi8pH_seologo.jpg"
    ],
    "url": `https://www.supremesvillagio.com/supreme-villagio/${urlPath}`,
    "datePosted": new Date().toISOString().split('T')[0],
    "publisher": {
      "@id": "https://www.supremesvillagio.com/#organization"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "156"
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

  const dynamicFaqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `What is the price of ${data.typology} at Supreme Villagio?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `The premium ${data.typology} at Supreme Villagio in Somatane, Pune starts at ₹2.89 Cr*. Experience unmatched luxury in the Pune real estate market.`
        }
      },
      {
        "@type": "Question",
        "name": `Is Supreme Villagio a good investment for NRIs?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Yes, Supreme Villagio is highly sought after by NRIs and HNI buyers for its ultra-luxurious 4 & 5 BHK villas and strong capital appreciation in Pune.`
        }
      }
    ]
  };

  // Dynamic Multi-Tier Breadcrumbs
  const breadcrumbItems = [
    {
      "@type": "ListItem", 
      "position": 1, 
      "name": "Home",
      "item": "https://www.supremesvillagio.com/"  
    },
    {
      "@type": "ListItem", 
      "position": 2, 
      "name": "Supreme Villagio",
      "item": "https://www.supremesvillagio.com/supreme-villagio/"  
    }
  ];

  let currentPath = "https://www.supremesvillagio.com/supreme-villagio";
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

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": data.title,
    "image": "https://d66htbxvzotmo.cloudfront.net/media/1Xi8pH_seologo.jpg",
    "description": data.description,
    "brand": {
      "@type": "Brand",
      "name": "Supreme Universal"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "156"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://www.supremesvillagio.com/supreme-villagio/${urlPath}`,
      "priceCurrency": "INR",
      "price": "28900000",
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition"
    }
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
      <Script
        id={`json-ld-faq-${slugArray.join('-')}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(dynamicFaqJsonLd) }}
      />
      <Script
        id={`json-ld-product-${slugArray.join('-')}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <LandingPageTemplate 
        heroHeadline1={data.heroHeadline1}
        heroHeadline2={data.heroHeadline2}
        heroSubline={data.heroSubline}
        highlightWords={data.highlightWords}
        pricing={data.pricing}
        typology={data.typology}
      />
      <RelatedProperties relatedSlugs={relatedSlugs} />
    </>
  );
}
