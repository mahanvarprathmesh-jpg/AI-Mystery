import { Fingerprint } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return <footer className="site-footer">
    <Link to="/" className="brand"><span className="brand-mark"><Fingerprint size={19} /></span><span>CASE<span className="brand-accent">FILE</span></span></Link>
    <p>Every case is fiction. Every clue is yours to follow.</p>
    <span className="footer-copy">© 2026 Casefile Studio</span>
  </footer>;
}
