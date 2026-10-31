import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, ShieldAlert, X } from 'lucide-react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import { fetchCase } from '../services/api.js';

export default function Results() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState(location.state?.result ? { result: location.state.result } : null);
  const [loading, setLoading] = useState(!location.state?.result);
  const [error, setError] = useState('');

  useEffect(() => {
    if (data?.result) return;
    const token = sessionStorage.getItem(`case-token:${id}`);
    if (!token) { setError('This result is only available in the browser session where the case was created.'); setLoading(false); return; }
    fetchCase(id, token).then(({ mystery }) => {
      if (!mystery.result) { navigate(`/case/${id}`, { replace: true, state: { mystery } }); return; }
      setData({ mystery, result: mystery.result });
    }).catch((requestError) => setError(requestError.message)).finally(() => setLoading(false));
  }, [id, data?.result, navigate]);

  if (loading) return <div className="page-shell"><Navbar /><main className="case-state"><span className="spinner" /><p>Unsealing the case file…</p></main><Footer /></div>;
  if (error || !data?.result) return <div className="page-shell"><Navbar /><main className="case-state"><ShieldAlert size={28} /><h1>Result unavailable</h1><p>{error || 'The result could not be found.'}</p><Link to="/" className="button button-primary">Back to casefile</Link></main><Footer /></div>;

  const { result } = data;
  return <div className="page-shell"><Navbar /><main className="results-page">
    <Link to={`/case/${id}`} className="back-link"><ArrowLeft size={15} /> Back to the investigation</Link>
    <section className={`result-reveal ${result.correct ? 'correct' : 'incorrect'}`}>
      <div className="result-icon">{result.correct ? <Check size={23} /> : <X size={23} />}</div>
      <div className="eyebrow">CASE CLOSED / {String(id).slice(-8).toUpperCase()}</div>
      <h1>{result.correct ? <>Your instincts<br /><em>were right.</em></> : <>The truth had<br /><em>other plans.</em></>}</h1>
      <p>{result.correct ? 'You followed the clues and named the culprit.' : 'Your accusation missed the mark. Review the evidence that points to the truth.'}</p>
      <span className="result-stamp">{result.correct ? 'CORRECT ACCUSATION' : 'CASE REVEALED'}</span>
    </section>
    <section className="solution-card"><div className="eyebrow">THE CULPRIT</div><div className="culprit-heading"><div className="culprit-monogram">{result.culprit.name.split(/\s+/).map((part) => part[0]).slice(0, 2).join('')}</div><div><h2>{result.culprit.name}</h2><p>{result.culprit.occupation} · {result.culprit.age} years old</p></div></div><div className="solution-columns"><div><span>YOUR ACCUSATION</span><strong>{result.selectedSuspect?.name || 'Unknown suspect'}</strong><p>{result.reason ? `“${result.reason}”` : 'No explanation was provided.'}</p></div><div><span>THE MOTIVE</span><p>{result.motive}</p></div></div><div className="solution-explanation"><div className="eyebrow">HOW THE CLUES FIT</div><p>{result.explanation}</p></div>
      <div className="supporting-evidence"><div className="eyebrow">KEY EVIDENCE</div><div className="result-evidence-list">{result.evidence.map((item) => <article key={item.id}><span>{item.id}</span><div><strong>{item.title}</strong><p>{item.description}</p><small>{item.content}</small></div></article>)}</div></div>
    </section>
    <div className="result-actions"><Link to="/create" className="button button-primary">Start a new investigation <ArrowRight size={16} /></Link><Link to="/" className="text-link">Return to casefile home</Link></div>
  </main><Footer /></div>;
}
