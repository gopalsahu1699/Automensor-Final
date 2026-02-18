import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: [
                '/faq',
                '/privacy-policy',
                '/terms-of-service',
                '/get-started',
                '/starter-package',
                '/estimate-cost-calculator',
            ],
        },
        sitemap: 'https://autommensor.in/sitemap.xml',
    };
}
