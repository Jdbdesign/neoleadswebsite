'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Icon from './Icon';

const PRODUCTS = [
  { href: '/zeus-prospecting', icon: 'search', title: 'Zeus', desc: 'Find verified decision-makers before your competitors do', primary: true },
  { href: '/sendrit', icon: 'send', title: 'Sendrit', desc: 'AI-written, multichannel sequences that actually get replies' },
  { href: '/verifyrit', icon: 'badge-check', title: 'Verifyrit', desc: 'Clean every email address before it costs you a bounce' },
  { href: '/snaarpmail', icon: 'inbox', title: 'Snaarpmail', desc: 'Bulletproof sending infrastructure and one inbox for every reply' },
  { href: '/warmrit', icon: 'flame', title: 'Warmrit', desc: 'Build sender reputation so your emails land not spam' },
  { href: '/neobrain-ai', icon: 'brain-circuit', title: 'NeoBrain AI', desc: 'The AI layer that qualifies leads and scores every conversation' },
];

const SOLUTIONS = [
  { href: '/low-reply-rates', icon: 'message-circle-off', title: 'Low Reply Rates', desc: 'Turn cold outreach into conversations that actually start' },
  { href: '/manual-prospecting', icon: 'table-2', title: 'Manual Prospecting', desc: 'Find verified buyers in seconds, not spreadsheet hours' },
  { href: '#', icon: 'bell-off', title: 'Missed Hot Replies', desc: 'Never lose a warm reply in a flood of unread inboxes' },
  { href: '/stale-contact-data', icon: 'database', title: 'Stale Contact Data', desc: 'Stop wasting time on leads who left six months ago' },
  { href: '#', icon: 'copy-x', title: 'Generic Outreach', desc: 'Replace copy-paste templates with AI-researched messages' },
  { href: '#', icon: 'bar-chart-3', title: 'No Pipeline Visibility', desc: 'See every deal, signal, and conversation in one place' },
  { href: '/emails-landing-in-spam', icon: 'shield-x', title: 'Emails Landing in Spam', desc: 'Fix deliverability before it kills your sender reputation' },
  { href: '#', icon: 'mail-x', title: 'High Bounce Rates', desc: 'Clean every list before a single email leaves your domain' },
  { href: '#', icon: 'list-x', title: 'Unqualified Lead Lists', desc: "Score and rank leads by who's actually ready to buy" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  // Which mega-menu is open: 'products' | 'solutions' | null. Only one at a time.
  const [openMenu, setOpenMenu] = useState(null);
  const navLinksRef = useRef(null);

  // Mega-menus: close on outside click or Escape (matches original behaviour).
  useEffect(() => {
    function onDocClick(e) {
      if (navLinksRef.current && !navLinksRef.current.contains(e.target)) {
        setOpenMenu(null);
      }
    }
    function onKey(e) {
      if (e.key === 'Escape') setOpenMenu(null);
    }
    document.addEventListener('click', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('click', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  return (
    <>
      <header className="navbar">
        <nav className="container" aria-label="Primary">
          <Link className="logo" href="/">NeoLeads</Link>

          <div className="nav-links" ref={navLinksRef}>
            <div
              className={`nav-item${openMenu === 'products' ? ' open' : ''}`}
              id="productsNav"
            >
              <button
                className="nav-trigger"
                type="button"
                aria-haspopup="true"
                aria-expanded={openMenu === 'products'}
                aria-controls="productsMenu"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenMenu((v) => (v === 'products' ? null : 'products'));
                }}
              >
                Products{' '}
                <span className="caret" aria-hidden="true">
                  <Icon name="chevron-down" />
                </span>
              </button>

              <div className="mega-menu" id="productsMenu" role="menu" aria-label="Products">
                <div className="mega-grid">
                  {PRODUCTS.map((p) => (
                    <Link
                      key={p.title}
                      className={`mega-item${p.primary ? ' is-primary' : ''}`}
                      role="menuitem"
                      href={p.href}
                      onClick={() => setOpenMenu(null)}
                    >
                      <span className="mega-ic">
                        <Icon name={p.icon} />
                      </span>
                      <span className="mega-text">
                        <span className="mega-title">{p.title}</span>
                        <span className="mega-desc">{p.desc}</span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div
              className={`nav-item${openMenu === 'solutions' ? ' open' : ''}`}
              id="solutionsNav"
            >
              <button
                className="nav-trigger"
                type="button"
                aria-haspopup="true"
                aria-expanded={openMenu === 'solutions'}
                aria-controls="solutionsMenu"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenMenu((v) => (v === 'solutions' ? null : 'solutions'));
                }}
              >
                Solutions{' '}
                <span className="caret" aria-hidden="true">
                  <Icon name="chevron-down" />
                </span>
              </button>

              <div className="mega-menu mega-wide" id="solutionsMenu" role="menu" aria-label="Solutions">
                <div className="mega-grid">
                  {SOLUTIONS.map((s) => (
                    <a
                      key={s.title}
                      className="mega-item"
                      role="menuitem"
                      href={s.href}
                      onClick={() => setOpenMenu(null)}
                    >
                      <span className="mega-ic">
                        <Icon name={s.icon} />
                      </span>
                      <span className="mega-text">
                        <span className="mega-title">{s.title}</span>
                        <span className="mega-desc">{s.desc}</span>
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <a href="#testimonials">
              Case Studies{' '}
              <span className="caret" aria-hidden="true"><Icon name="chevron-down" /></span>
            </a>
            <a href="#pricing">Pricing</a>
            <a href="#integrations">Integration</a>
            <a href="#features">
              Resources{' '}
              <span className="caret" aria-hidden="true"><Icon name="chevron-down" /></span>
            </a>
            <a href="#features">
              Tools{' '}
              <span className="caret" aria-hidden="true"><Icon name="chevron-down" /></span>
            </a>
          </div>

          <div className="nav-right">
            <a className="login" href="#">Log In</a>
            <button className="btn-primary nav-cta">Get Started</button>
            <button
              className="nav-toggle"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              id="navToggle"
              onClick={() => setMobileOpen((v) => !v)}
            >
              <Icon name="menu" />
            </button>
          </div>
        </nav>
      </header>

      <div className={`mobile-menu${mobileOpen ? ' open' : ''}`} id="mobileMenu">
        <span className="mobile-group-label">Products</span>
        {PRODUCTS.map((p) => (
          <Link
            key={p.title}
            className="mobile-sub"
            href={p.href}
            onClick={() => setMobileOpen(false)}
          >
            {p.title}
          </Link>
        ))}
        <span className="mobile-group-label">Solutions</span>
        {SOLUTIONS.map((s) => (
          <a
            key={s.title}
            className="mobile-sub"
            href={s.href}
            onClick={() => setMobileOpen(false)}
          >
            {s.title}
          </a>
        ))}
        <a href="#testimonials" onClick={() => setMobileOpen(false)}>Case Studies</a>
        <a href="#pricing" onClick={() => setMobileOpen(false)}>Pricing</a>
        <a href="#integrations" onClick={() => setMobileOpen(false)}>Integration</a>
        <a href="#features" onClick={() => setMobileOpen(false)}>Resources</a>
        <a href="#features" onClick={() => setMobileOpen(false)}>Tools</a>
        <a href="#pricing" onClick={() => setMobileOpen(false)}>Log In</a>
      </div>
    </>
  );
}
