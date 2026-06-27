/** @type {import('next').NextConfig} */
const nextConfig = {
  // Using plain <img> tags (ported verbatim). This disables Next's image
  // optimization so the existing markup works unchanged. Switch to <Image>
  // from next/image later and remove this if you want optimization.
  images: { unoptimized: true },

  // Preserve old URLs: the original static site linked to *.html files.
  // These redirect the legacy paths to the new clean routes so no inbound
  // link or bookmark breaks.
  async redirects() {
    const pages = [
      'index',
      'zeus-prospecting',
      'sendrit',
      'verifyrit',
      'warmrit',
      'snaarpmail',
      'zeus-coming-soon',
    ];
    return [
      { source: '/index.html', destination: '/', permanent: true },
      ...pages
        .filter((p) => p !== 'index')
        .map((p) => ({
          source: `/${p}.html`,
          destination: `/${p}`,
          permanent: true,
        })),
    ];
  },
};

module.exports = nextConfig;
