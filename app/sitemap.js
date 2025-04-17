// app/sitemap.js
export default function sitemap() {
    const baseUrl = 'https://mi-ka.pl';
    const currentDate = new Date().toISOString();
  
    // Podstawowe, publiczne strony
    const routes = [
      '',
      'o-nas',
      'kontakt',
      'dostawcy',
      'aktualnosci',
      'hurtownia',
      'projekty',
      'serwis',
      'polityka-prywatnosci',
    ];
  
    const sitemap = routes.map(route => ({
      url: `${baseUrl}${route ? '/' + route : ''}`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: route === '' ? 1.0 : 0.8,
    }));
  
    // Strona główna ma najwyższy priorytet
    return sitemap;
  }
  
  