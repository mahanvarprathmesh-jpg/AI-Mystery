import { ArrowLeft, ArrowUpRight, FilePlus2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import { generateCase } from '../services/api.js';

export default function CreateMystery() {
  const navigate = useNavigate();
  const [scenario, setScenario] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    if (busy) return;
    const form = new FormData(event.currentTarget);
    setBusy(true);
    setError('');
    try {
      const result = await generateCase({
        title: form.get('title'), scenario: scenario.trim(),
        category: form.get('category'), difficulty: form.get('difficulty'),
      });
      sessionStorage.setItem(`case-token:${result.mysteryId}`, result.accessToken);
      navigate(`/case/${result.mysteryId}`, { state: { mystery: result.mystery } });
    } catch (requestError) {
      setError(requestError.message);
      setBusy(false);
    }
  }

  return <div className="page-shell"><Navbar /><main className="create-page">
    <Link to="/" className="back-link"><ArrowLeft size={15} /> Back to casefile</Link>
    <div className="create-layout"><div className="create-intro"><div className="eyebrow"><span className="live-dot" /> NEW INVESTIGATION</div><h1>Start with<br /><em>a question.</em></h1><p>Every case begins somewhere. Give us the premise you can't stop thinking about.</p><div className="create-disclaimer">Cases are fictional stories created for entertainment. No real people or incidents are represented.</div></div>
    <form className="case-form" onSubmit={handleSubmit}>
      <div className="form-heading"><FilePlus2 size={19} /><span>OPEN A NEW FILE</span><small>STEP 01 / 01</small></div>
      <label htmlFor="title">CASE TITLE <span>OPTIONAL</span></label><input id="title" name="title" maxLength="100" placeholder="e.g. The Clockmaker's Secret" />
      <label htmlFor="scenario">YOUR SCENARIO <span>REQUIRED</span></label><textarea id="scenario" name="scenario" required maxLength="2000" rows="6" value={scenario} onChange={(event) => setScenario(event.target.value)} placeholder="A curator notices one painting has been replaced overnight. The gallery was locked, the cameras were running, and three people had access to the key..." />
      <div className="char-count">A few sentences is all you need <span>{scenario.length} / 2000</span></div>
      <div className="form-row"><div><label htmlFor="category">CASE TYPE</label><select id="category" name="category"><option>General Mystery</option><option>Murder Mystery</option><option>Theft</option><option>Missing Person</option><option>Suspicious Death</option><option>Cybercrime</option></select></div><div><label htmlFor="difficulty">DIFFICULTY</label><select id="difficulty" name="difficulty"><option>Medium</option><option>Easy</option><option>Hard</option></select></div></div>
      {error && <p className="form-error" role="alert">{error}</p>}
      <button className="button button-primary form-submit" type="submit" disabled={busy || !scenario.trim()}>{busy ? <><span className="spinner" /> Building your case…</> : <>Generate my mystery <ArrowUpRight size={17} /></>}</button>
      <p className="setup-notice">{busy ? 'Writing the case, suspects, clues, and timeline. This can take a little while.' : 'Cases are fictional and generated from your premise.'}</p>
    </form></div>
  </main><Footer /></div>;
}
