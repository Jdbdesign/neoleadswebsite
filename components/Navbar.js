'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from './Icon';

const PRODUCTS = [
  { href: '/zeus-prospecting', icon: 'search', title: 'Zeus', desc: 'Find verified decision-makers before your competitors do' },
  { href: '/sendrit', icon: 'send', title: 'Sendrit', desc: 'AI-written, multichannel sequences that actually get replies' },
  { href: '/verifyrit', icon: 'badge-check', title: 'Verifyrit', desc: 'Clean every email address before it costs you a bounce' },
  { href: '/snaarpmail', icon: 'inbox', title: 'Snaarpmail', desc: 'Bulletproof sending infrastructure and one inbox for every reply' },
  { href: '/warmrit', icon: 'flame', title: 'Warmrit', desc: 'Build sender reputation so your emails land not spam' },
  { href: '/neobrain-ai', icon: 'brain-circuit', title: 'NeoBrain AI', desc: 'The AI layer that qualifies leads and scores every conversation' },
];

const SOLUTIONS = [
  { href: '/low-reply-rates', icon: 'message-circle-off', title: 'Low Reply Rates', desc: 'Turn cold outreach into conversations that actually start' },
  { href: '/manual-prospecting', icon: 'table-2', title: 'Manual Prospecting', desc: 'Find verified buyers in seconds, not spreadsheet hours' },
  { href: '/missed-hot-replies', icon: 'bell-off', title: 'Missed Hot Replies', desc: 'Never lose a warm reply in a flood of unread inboxes' },
  { href: '/stale-contact-data', icon: 'database', title: 'Stale Contact Data', desc: 'Stop wasting time on leads who left six months ago' },
  { href: '/generic-outreach', icon: 'copy-x', title: 'Generic Outreach', desc: 'Replace copy-paste templates with AI-researched messages' },
  { href: '/no-pipeline-visibility', icon: 'bar-chart-3', title: 'No Pipeline Visibility', desc: 'See every deal, signal, and conversation in one place' },
  { href: '/emails-landing-in-spam', icon: 'shield-x', title: 'Emails Landing in Spam', desc: 'Fix deliverability before it kills your sender reputation' },
  { href: '/high-bounce-rates', icon: 'mail-x', title: 'High Bounce Rates', desc: 'Clean every list before a single email leaves your domain' },
  { href: '/unqualified-lead-lists', icon: 'list-x', title: 'Unqualified Lead Lists', desc: "Score and rank leads by who's actually ready to buy" },
];

const CASE_STUDIES = [
  { href: '/case-studies/the-lean-startup', icon: 'rocket', title: 'The Lean Startup', desc: 'How a 2-person team replaced their SDR hire with Zeus and Sendrit' },
  { href: '/case-studies/the-agency-scale-up', icon: 'briefcase', title: 'The Agency Scale-Up', desc: 'How one agency ran outbound for 12 clients from a single NeoLeads seat' },
  { href: '/case-studies/the-deliverability-rescue', icon: 'shield-check', title: 'The Deliverability Rescue', desc: 'From 8.4% bounce rate and blacklisted domain to 96% inbox placement' },
  { href: '/case-studies/the-cold-start', icon: 'zap', title: 'The Cold Start', desc: 'Zero pipeline to 50 qualified conversations in under 6 weeks' },
  { href: "/case-studies/the-sales-leaders-stack-collapse", icon: 'layers', title: "The Sales Leader's Stack Collapse", desc: 'How a VP Sales replaced 5 tools with NeoLeads and cut costs by 60%' },
  { href: '/case-studies/the-reply-rate-turnaround', icon: 'mail-open', title: 'The Reply Rate Turnaround', desc: 'From 1.8% to 11.4% reply rate — same list, same offer, different system' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  // Which mega-menu is open: 'products' | 'solutions' | null. Only one at a time.
  const [openMenu, setOpenMenu] = useState(null);
  const navLinksRef = useRef(null);

  // Active route highlighting: the dropdown item (and its parent trigger) that
  // matches the current page gets an `is-active` state. Off every other page,
  // nothing is highlighted. `usePathname` returns null before hydration, so the
  // first paint simply renders no active item.
  const pathname = usePathname();
  const isActive = (href) => href !== '#' && pathname === href;
  const productsActive = PRODUCTS.some((p) => p.href === pathname);
  const solutionsActive = SOLUTIONS.some((s) => s.href === pathname);
  const caseStudiesActive = CASE_STUDIES.some((c) => c.href === pathname);

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
              className={`nav-item${openMenu === 'products' ? ' open' : ''}${productsActive ? ' is-active' : ''}`}
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
                      className={`mega-item${isActive(p.href) ? ' is-active' : ''}`}
                      role="menuitem"
                      aria-current={isActive(p.href) ? 'page' : undefined}
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
              className={`nav-item${openMenu === 'solutions' ? ' open' : ''}${solutionsActive ? ' is-active' : ''}`}
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
                      className={`mega-item${isActive(s.href) ? ' is-active' : ''}`}
                      role="menuitem"
                      aria-current={isActive(s.href) ? 'page' : undefined}
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

            <div
              className={`nav-item${openMenu === 'casestudies' ? ' open' : ''}${caseStudiesActive ? ' is-active' : ''}`}
              id="caseStudiesNav"
            >
              <button
                className="nav-trigger"
                type="button"
                aria-haspopup="true"
                aria-expanded={openMenu === 'casestudies'}
                aria-controls="caseStudiesMenu"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenMenu((v) => (v === 'casestudies' ? null : 'casestudies'));
                }}
              >
                Case Studies{' '}
                <span className="caret" aria-hidden="true">
                  <Icon name="chevron-down" />
                </span>
              </button>

              <div className="mega-menu" id="caseStudiesMenu" role="menu" aria-label="Case Studies">
                <div className="mega-grid">
                  {CASE_STUDIES.map((c) => (
                    <Link
                      key={c.title}
                      className={`mega-item${isActive(c.href) ? ' is-active' : ''}`}
                      role="menuitem"
                      aria-current={isActive(c.href) ? 'page' : undefined}
                      href={c.href}
                      onClick={() => setOpenMenu(null)}
                    >
                      <span className="mega-ic">
                        <Icon name={c.icon} />
                      </span>
                      <span className="mega-text">
                        <span className="mega-title">{c.title}</span>
                        <span className="mega-desc">{c.desc}</span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
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
            className={`mobile-sub${isActive(p.href) ? ' is-active' : ''}`}
            aria-current={isActive(p.href) ? 'page' : undefined}
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
            className={`mobile-sub${isActive(s.href) ? ' is-active' : ''}`}
            aria-current={isActive(s.href) ? 'page' : undefined}
            href={s.href}
            onClick={() => setMobileOpen(false)}
          >
            {s.title}
          </a>
        ))}
        <span className="mobile-group-label">Case Studies</span>
        {CASE_STUDIES.map((c) => (
          <Link
            key={c.title}
            className={`mobile-sub${isActive(c.href) ? ' is-active' : ''}`}
            aria-current={isActive(c.href) ? 'page' : undefined}
            href={c.href}
            onClick={() => setMobileOpen(false)}
          >
            {c.title}
          </Link>
        ))}
        <a href="#pricing" onClick={() => setMobileOpen(false)}>Pricing</a>
        <a href="#integrations" onClick={() => setMobileOpen(false)}>Integration</a>
        <a href="#features" onClick={() => setMobileOpen(false)}>Resources</a>
        <a href="#features" onClick={() => setMobileOpen(false)}>Tools</a>
        <a href="#pricing" onClick={() => setMobileOpen(false)}>Log In</a>
      </div>
    </>
  );
}
