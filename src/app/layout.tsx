import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import CustomCursor from "@/components/layout/CustomCursor";
import NoiseOverlay from "@/components/ui/NoiseOverlay";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingCTA from "@/components/layout/FloatingCTA";
import Script from "next/script";
import { ModalProvider } from "@/contexts/ModalContext";
import ContactModal from "@/components/layout/ContactModal";

import { GoogleAnalytics } from "@next/third-parties/google";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#17181a",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.supremesvillagio.com"),
  title: "Supreme Villagio Somatane | 4 & 5 BHK Luxury Villas in Pune",
  description: "Supreme Villagio offers luxury 4 & 5 BHK villas in Somatane Pune on 16 acres. Twin villas & townhouses with Club Villagio, mountain views. Under Construction.",
  keywords: ["Supreme Villagio", "4 BHK Villas Pune", "5 BHK Villas Somatane", "Luxury Villas Pune", "Townhouses Somatane", "Real Estate Pune"],
  authors: [{ name: "Supreme Universal" }],
  creator: "Supreme Universal",
  publisher: "Supreme Universal",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  appleWebApp: {
    title: "Villagio",
    statusBarStyle: "black-translucent",
    capable: true,
  },
  alternates: {
    canonical: "https://www.supremesvillagio.com/",
  },
  verification: {
    google: "tjTIqD28r3w5lEq8E_dlNvwaAawCwF057ABSDOHISXI",
    yandex: "yandex-verification=PLACEHOLDER",     // Replace with real Yandex code
    other: {
      "msvalidate.01": ["PLACEHOLDER"],            // Bing Webmaster Tools
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.supremeuniversal.com/residential-property/pune/somatane/supreme-villagio/",
    title: "Supreme Villagio Somatane | 4 & 5 BHK Luxury Villas in Pune",
    description: "Supreme Villagio offers luxury 4 & 5 BHK villas in Somatane Pune on 16 acres. Twin villas & townhouses with Club Villagio, mountain views. Under Construction.",
    siteName: "Supreme Universal",
    images: [
      {
        url: "https://d66htbxvzotmo.cloudfront.net/media/1Xi8pH_seologo.jpg",
        width: 1200,
        height: 630,
        alt: "Supreme Villagio Logo and View",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@SupremeUniv",
    creator: "@SupremeUniv",
    title: "Supreme Villagio Somatane | 4 & 5 BHK Luxury Villas in Pune",
    description: "Supreme Villagio offers luxury 4 & 5 BHK villas in Somatane Pune on 16 acres. Twin villas & townhouses with Club Villagio, mountain views. Under Construction.",
    images: ["https://d66htbxvzotmo.cloudfront.net/media/1Xi8pH_seologo.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "Where is Supreme Villagio Located?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Supreme Villagio is Located Somatane, Pune."
    }
  },{
    "@type": "Question",
    "name": "What are the configurations available at Supreme Villagio?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "3, 4 and 5 BHK Villas and 4 BHK Townhouses."
    }
  },{
    "@type": "Question",
    "name": "How can I reach Supreme Villagio?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Supreme Villagio is a 30-minute drive from Baner via the Mumbai-Satara Highway."
    }
  },{
    "@type": "Question",
    "name": "What are the Amenities provided at Supreme Villagio?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Supreme Villagio offers a wide range of leisure, play and recreational amenities. Club Villagio is an addition to the amenities provided at Supreme Villagio."
    }
  },{
    "@type": "Question",
    "name": "Is Supreme Villagio a Gated Community development?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Supreme Villagio is a gated community of Villas and townhouses in Somatane, Pune."
    }
  },{
    "@type": "Question",
    "name": "What is Club Villagio?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Club Villagio is a 18500 sq. ft. clubhouse for the residents of Supreme Villagio. It offers a wide range of recreation and rejuvenation-centric indoor amenities."
    }
  },{
    "@type": "Question",
    "name": "What is the total size of Supreme Villagio?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "The total area of Supreme Villagio is Approx 16 Acres."
    }
  },{
    "@type": "Question",
    "name": "How many units does Supreme Villagio have?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Supreme Villagio has 75 - 3 BED Townhouses, 72 - 4 BED Twin Villas and 19 -  5 BHK Twin Villas and 44 - 4 BHK townhouses."
    }
  },{
    "@type": "Question",
    "name": "When is Supreme Villagio scheduled for possession?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Supreme Villagio will receive complete OC by Dec 27."
    }
  },{
    "@type": "Question",
    "name": "Is Supreme Villagio registered under RERA? What is its RERA number?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Phase I - Phase II - Phase III Maha RERA No: P52100046867, P52100049506 & P52100055048 https://maharera.mahaonline.gov.in under registered projects"
    }
  }]
};

const breadcrumbSchema = {
  "@context": "https://schema.org/", 
  "@type": "BreadcrumbList", 
  "itemListElement": [{
    "@type": "ListItem", 
    "position": 1, 
    "name": "Home Page",
    "item": "https://www.supremeuniversal.com/"  
  },{
    "@type": "ListItem", 
    "position": 2, 
    "name": "Projects",
    "item": "https://www.supremeuniversal.com/projects/"  
  },{
    "@type": "ListItem", 
    "position": 3, 
    "name": "Supreme Villagio",
    "item": "https://www.supremeuniversal.com/residential-property/pune/somatane/supreme-villagio/"  
  }]
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.supremesvillagio.com/#organization",
  "name": "Supreme Universal",
  "url": "https://www.supremeuniversal.com/",
  "logo": "https://d66htbxvzotmo.cloudfront.net/media/1Xi8pH_seologo.jpg",
  "sameAs": [
    "https://www.facebook.com/SupremeUniversalRealEstate/",
    "https://www.instagram.com/supreme_universal/",
    "https://www.linkedin.com/company/supremeuniversal/"
  ]
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.supremesvillagio.com/#website",
  "url": "https://www.supremesvillagio.com/",
  "name": "Supreme Villagio Somatane | Luxury Villas",
  "publisher": {
    "@id": "https://www.supremesvillagio.com/#organization"
  }
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "@id": "https://www.supremesvillagio.com/#localbusiness",
  "name": "Supreme Villagio Somatane",
  "image": "https://d66htbxvzotmo.cloudfront.net/media/1Xi8pH_seologo.jpg",
  "url": "https://www.supremesvillagio.com/",
  "telephone": "+91 7744009295",
  "priceRange": "₹2.89 Cr*",
  "parentOrganization": {
    "@id": "https://www.supremesvillagio.com/#organization"
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Somatane",
    "addressLocality": "Pune",
    "addressRegion": "MH",
    "postalCode": "410506",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 18.6517173,
    "longitude": 73.6845348
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
    ],
    "opens": "09:00",
    "closes": "18:00"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <head>
        <Script
          id="faq-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <Script
          id="breadcrumb-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <Script
          id="local-business-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        
        {/* Meta Pixel Code */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1234567890');
            fbq('track', 'PageView');
          `}
        </Script>
      </head>
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">
        <GoogleAnalytics gaId="G-XXXXXXXXXX" />
        <ModalProvider>
          <NoiseOverlay />
          <CustomCursor />
          <SmoothScroll>
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
            <FloatingCTA />
          </SmoothScroll>
          <ContactModal />
        </ModalProvider>
      </body>
    </html>
  );
}
