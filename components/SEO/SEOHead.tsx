import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  author?: string;
}

export const SEOHead: React.FC<SEOProps> = ({ 
  title, 
  description, 
  keywords = [], 
  author = "Yaroslav Ostapenko" 
}) => {
  useEffect(() => {
    // Update Title
    document.title = title;

    // Helper to update meta tags
    const updateMeta = (name: string, content: string, isProperty = false) => {
      const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let element = document.querySelector(selector);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(isProperty ? 'property' : 'name', name);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Update Standard Meta
    updateMeta('description', description);
    updateMeta('author', author);
    if (keywords.length > 0) {
      updateMeta('keywords', keywords.join(', '));
    }

    // Update Open Graph (Social)
    updateMeta('og:title', title, true);
    updateMeta('og:description', description, true);
    updateMeta('og:type', 'website', true);

    // Update Twitter
    updateMeta('twitter:title', title);
    updateMeta('twitter:description', description);

  }, [title, description, keywords, author]);

  return null;
};
