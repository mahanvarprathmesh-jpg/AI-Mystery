import { Link } from 'react-router-dom';

export default function NotFound() {
  return <main className="not-found"><span className="eyebrow">404 / FILE NOT FOUND</span><h1>This trail<br /><em>goes cold.</em></h1><Link className="button button-primary" to="/">Return to the casefile</Link></main>;
}
