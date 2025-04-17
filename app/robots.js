// app/robots.js
export default function robots() {
    return {
      rules: [
        {
          userAgent: '*',
          allow: [
            '/',
            '/o-nas',
            '/kontakt',
            '/dostawcy',
            '/aktualnosci',
            '/hurtownia',
            '/projekty',
            '/serwis',
            '/polityka-prywatnosci',
          ],
          disallow: ['/admin/*']
        }
      ],
      sitemap: 'https://mi-ka.pl/sitemap.xml',
      host: 'https://mi-ka.pl'
    };
  }
  
  