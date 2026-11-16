import type { Metadata } from "next";
import { getSite } from "@/lib/content";
import "./globals.css";

const site = getSite();

export const metadata: Metadata = {
  metadataBase: new URL(site.seo.canonical),
  title: site.seo.title,
  description: site.seo.description,
  authors: [{ name: site.personalInfo.name }],
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
  alternates: {
    canonical: site.seo.canonical,
  },
  openGraph: {
    type: "website",
    url: site.seo.canonical,
    title: site.seo.title,
    description: site.seo.description,
    siteName: site.personalInfo.name,
    locale: "en_US",
    images: [
      {
        url: site.seo.ogImage,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.seo.title,
    description: site.seo.description,
    images: [site.seo.ogImage],
  },
  icons: {
    icon: site.personalInfo.logo,
    apple: site.personalInfo.logo,
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${site.seo.canonical}#person`,
        name: site.personalInfo.name,
        url: site.seo.canonical,
        image: site.banner.portrait.src,
        jobTitle: site.personalInfo.title,
        email: site.personalInfo.email,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Dhaka",
          addressCountry: "BD",
        },
        sameAs: [
          site.personalInfo.github,
          site.personalInfo.linkedIn,
          site.personalInfo.facebook,
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${site.seo.canonical}#website`,
        url: site.seo.canonical,
        name: site.seo.title,
        description: site.seo.description,
        publisher: { "@id": `${site.seo.canonical}#person` },
      },
    ],
  };

  return (
    <html lang="en" data-theme="dark">
      <head>
        <meta name="theme-color" content="#0a0a0f" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=Syne:wght@700;800&display=swap"
          rel="stylesheet"
        />
        <link rel="preload" as="image" href={site.banner.portrait.src} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
