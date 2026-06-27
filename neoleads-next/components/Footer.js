// Footer — ported from the original markup. Shared across all pages via layout.
// Internal links use plain <a> (full navigation); swap to next/link Link for
// client-side transitions if desired.
export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top" data-reveal-stagger="100">
          <div className="footer-brand" data-reveal>
            <a className="footer-logo" href="#">Neoleads</a>
            <p className="tagline">Every tool your business needs to find, reach, verify and close, in one connected stack.</p>
            <div className="social-row">
              <a href="#" aria-label="X"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644z"/></svg></a>
              <a href="#" aria-label="Facebook"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.02 4.388 11.01 10.125 11.927v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796v8.437C19.612 23.083 24 18.093 24 12.073z"/></svg></a>
              <a href="#" aria-label="Instagram"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg></a>
              <a href="#" aria-label="LinkedIn"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/></svg></a>
            </div>
          </div>
          <div className="footer-col" data-reveal>
            <h4>Solutions</h4>
            <ul>
              <li><a href="#">For sales teams</a></li>
              <li><a href="#">For marketing</a></li>
              <li><a href="#">For founders</a></li>
              <li><a href="#">For agencies</a></li>
              <li><a href="#">For enterprise</a></li>
            </ul>
          </div>
          <div className="footer-col" data-reveal>
            <h4>Company</h4>
            <ul>
              <li><a href="#">About</a></li>
              <li><a href="#">Resources</a></li>
              <li><a href="#">API docs</a></li>
              <li><a href="#">Privacy policy</a></li>
              <li><a href="#">Terms of service</a></li>
            </ul>
          </div>
          <div className="footer-col" data-reveal>
            <h4>Product</h4>
            <ul>
              <li><a href="#">Kalender</a></li>
              <li><a href="/zeus-prospecting">Zeus</a></li>
              <li><a href="#">Snaarplock</a></li>
              <li><a href="/snaarpmail">Snaarpmail</a></li>
              <li><a href="/verifyrit">Verifyrit</a></li>
              <li><a href="/sendrit">Sendrit</a></li>
            </ul>
          </div>
          <div className="footer-col footer-contact" data-reveal>
            <h4>Contact Information</h4>
            <div className="c-group">
              <span className="c-label">Email</span>
              <span className="c-val">support@snaarp.com</span>
            </div>
            <div className="c-group">
              <span className="c-label">Phone</span>
              <span className="c-val">+1 (800) 123-4567</span>
            </div>
            <div className="c-group">
              <span className="c-label">Office Address</span>
              <span className="c-val">Neoleads<br />1234 Sales Street, Suite 500<br />San Francisco, CA 94105, USA</span>
            </div>
          </div>
        </div>
        <div className="footer-bottom" data-reveal data-reveal-delay="150">
          <span className="since">SINCE. 2026</span>
          <span className="copy">©Neoleads. All rights reserved.</span>
        </div>
      </div>
    </footer>
    
    
  );
}
