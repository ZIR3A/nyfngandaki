export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/crm/', '/admin/', '/login/'],
    },
    sitemap: 'https://nyfngandaki.org/sitemap.xml',
  }
}
