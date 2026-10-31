import { Fingerprint, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return <header className="site-header">
    <Link to="/" className="brand" aria-label="AI Mystery Room home">
      <span className="brand-mark"><Fingerprint size={21} /></span>
      <span>CASE<span className="brand-accent">FILE</span></span>
    </Link>
    <nav className="desktop-nav" aria-label="Main navigation">
      <a href="/#how-it-works">How it works</a><a href="/#the-experience">The experience</a>
    </nav>
    <Link className="header-cta" to="/create">Start an investigation <span>↗</span></Link>
    <button className="mobile-menu" aria-label="Open menu"><Menu size={21} /></button>
  </header>;
}
