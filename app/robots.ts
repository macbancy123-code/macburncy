import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/checkout'],
    },
    sitemap: 'https://macbancy.com/sitemap.xml',
  };
}
