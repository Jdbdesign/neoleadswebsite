# NeoLeads — Next.js

A faithful Next.js (App Router) port of the original static NeoLeads site. The
homepage and the shared navbar/footer are done; the remaining product pages
follow the exact same pattern.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

> Security note: pin Next to the latest patched 14.2.x (`npm install next@latest`
> inside the 14 range) — older 14.2.x releases carry a known advisory. The app
> is compatible with the current 14.2 line.

## How the migration was done (the pattern to repeat)

The goal was a 1:1 visual match, not a redesign. The strategy:

- **Styles are verbatim.** The original site's entire CSS lives in
  `app/globals.css` exactly as written. This is why the port is pixel-identical —
  nothing was re-styled. Keep adding to this file; don't refactor it during the
  migration.
- **Markup became components.** The original HTML was converted to JSX with the
  mechanical transforms JSX requires (`class` → `className`, void elements
  self-closed, comments rewritten, SVG attrs camelCased, asset paths made
  root-relative). Every class, `id`, and `data-*` attribute is preserved so the
  CSS and the animation engine keep working untouched.
- **Icons** use `lucide-react`. The original `<i data-lucide="search">` became
  `<Icon name="search" />` (see `components/Icon.js`), which maps the same names
  to React components — no CDN script.
- **Interactivity is split by kind.** The nav menus (mobile + products mega-menu)
  were rewritten as React state in `components/Navbar.js`. The scroll-reveal
  engine and the bespoke per-card animations were ported **verbatim** into
  `components/ClientScripts.js`, which runs the original imperative DOM code once
  on mount. Because the markup is preserved exactly, that code runs unchanged.

## Structure

```
app/
  layout.js        Root layout: <Navbar>, {children}, <Footer>, fonts, metadata
  globals.css      The original site CSS, verbatim (source of pixel fidelity)
  page.js          Homepage — all 10 sections + <ClientScripts/>
components/
  Navbar.js        Shared nav (client): mobile menu + products mega-menu state
  Footer.js        Shared footer
  Icon.js          lucide-react wrapper: <Icon name="kebab-case" />
  ClientScripts.js Reveal engine + per-card animations (verbatim, in useEffect)
public/
  logos/ avatars/  Static assets (referenced as /logos/..., /avatars/...)
  hero-dashboard.png, zeus-dashboard.png
next.config.js     Redirects old *.html URLs → clean routes; images.unoptimized
```

## URLs

The original linked to `*.html` files. Routes are now clean (`/sendrit`,
`/verifyrit`, …) and `next.config.js` redirects every old `*.html` path to its
new route, so existing links and bookmarks don't break.

## Remaining work

The other pages from the original repo still need porting, each following the
exact pattern above: `zeus-prospecting`, `sendrit`, `verifyrit`, `warmrit`,
`snaarpmail`, `zeus-coming-soon`. Each becomes `app/<name>/page.js`. Their
page-specific CSS and any page-specific animation IIFEs get merged into
`globals.css` and a per-page client-scripts component respectively.
