import React from 'react';

interface StructuredDataProps {
  type: 'WebApplication' | 'Article' | 'AboutPage';
  data: any;
}

export const StructuredData: React.FC<StructuredDataProps> = ({ type, data }) => {
  const getJsonLd = () => {
    const base = {
      "@context": "https://schema.org",
    };

    if (type === 'WebApplication') {
      return {
        ...base,
        "@type": "SoftwareApplication",
        "name": "Intebwio",
        "applicationCategory": "BrowserApplication",
        "operatingSystem": "Web",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "author": {
          "@type": "Person",
          "name": "Yaroslav Ostapenko",
          "url": "https://intebwio.com"
        },
        "description": "An intelligent AI browser that builds web pages on the fly using Gemini API."
      };
    }

    if (type === 'AboutPage') {
      return {
        ...base,
        "@type": "AboutPage",
        "mainEntity": {
          "@type": "Person",
          "name": "Yaroslav Ostapenko",
          "jobTitle": "Lead Architect",
          "description": "Creator of Intebwio, a generative AI browser."
        }
      };
    }

    // Default for generated pages
    return {
      ...base,
      "@type": "Article",
      "headline": data.title,
      "datePublished": new Date(data.createdAt).toISOString(),
      "dateModified": new Date(data.lastUpdated).toISOString(),
      "author": {
        "@type": "Organization",
        "name": "Intebwio AI"
      }
    };
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(getJsonLd()) }}
    />
  );
};
