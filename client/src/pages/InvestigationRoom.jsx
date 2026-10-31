import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ClipboardList, Clock3, Fingerprint, FileText, Image as ImageIcon, MessageSquareText, ShieldAlert, Video, X } from 'lucide-react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { fetchCase, submitAccusation } from '../services/api.js';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

const categories = [
  { id: 'all', label: 'All evidence', icon: ClipboardList },
  { id: 'message', label: 'Messages', icon: MessageSquareText },
  { id: 'image', label: 'Images', icon: ImageIcon },
  { id: 'cctv', label: 'CCTV', icon: Video },
  { id: 'witness', label: 'Witnesses', icon: Fingerprint },
  { id: 'document', label: 'Documents', icon: FileText },
];

export default function InvestigationRoom() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [mystery, setMystery] = useState(location.state?.mystery || null);
  const [loading, setLoading] = useState(!location.state?.mystery);
  const [error, setError] = useState('');
  const [category, setCategory] = useState('all');
  const [selected, setSelected] = useState(null);
  const [suspect, setSuspect] = useState(null);
  const [selectedSuspectId, setSelectedSuspectId] = useState('');
  const [reason, setReason] = useState('');
  const [confirming, setConfirming] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [accusationError, setAccusationError] = useState('');

  useEffect(() => {
    if (mystery?.id === id) return;
    const token = sessionStorage.getItem(`case-token:${id}`);
    if (!token) { setError('This case is only available in the browser session where it was created.'); setLoading(false); return; }
    fetchCase(id, token).then((result) => setMystery(result.mystery)).catch((requestError) => setError(requestError.message)).finally(() => setLoading(false));
  }, [id, mystery?.id]);

  useEffect(() => {
    if (mystery?.result) navigate(`/case/${id}/results`, { replace: true, state: { mystery, result: mystery.result } });
  }, [id, mystery, navigate]);

  const evidence = useMemo(() => category === 'all' ? (mystery?.evidence || []) : (mystery?.evidence || []).filter((item) => item.type === category), [category, mystery]);

  async function confirmAccusation() {
    if (!selectedSuspectId || submitting) return;
    setSubmitting(true);
    setAccusationError('');
    try {
      const token = sessionStorage.getItem(`case-token:${id}`);
      const response = await submitAccusation(id, token, { selectedSuspectId, reason });
      navigate(`/case/${id}/results`, { state: { result: response.result } });
    } catch (requestError) {
      setAccusationError(requestError.message);
      setSubmitting(false);
      setConfirming(false);
    }
  }

  if (loading) return <div className="page-shell"><Navbar /><main className="case-state"><span className="spinner" /><p>Retrieving your case file…</p></main><Footer /></div>;
  if (error || !mystery) return <div className="page-shell"><Navbar /><main className="case-state"><ShieldAlert size={28} /><h1>Case file unavailable</h1><p>{error || 'This file could not be found.'}</p><Link to="/create" className="button button-primary">Start a new case</Link></main><Footer /></div>;

  return <div className="page-shell"><Navbar /><main className="investigation-page">
    <Link to="/" className="back-link"><ArrowLeft size={15} /> Casefile home</Link>
    <div className="case-header"><div><div className="eyebrow"><span className="live-dot" /> FICTIONAL CASE / {String(id).slice(-8).toUpperCase()}</div><h1>{mystery.title}</h1><p>{mystery.description}</p></div><div className="case-meta"><span>{mystery.category}</span><span>{mystery.difficulty} difficulty</span></div></div>
    <div className="incident-strip"><ShieldAlert size={17} /><div><small>INCIDENT</small><strong>{mystery.incident.type}</strong></div><div><small>DATE</small><strong>{mystery.incident.date}</strong></div><div><small>LOCATION</small><strong>{mystery.incident.location}</strong></div><span className="fiction-badge">FICTIONAL</span></div>
    <div className="investigation-layout">
      <aside className="case-sidebar"><section><div className="sidebar-heading">PERSONS OF INTEREST <span>{mystery.suspects.length}</span></div><div className="suspect-list">{mystery.suspects.map((person, index) => <button key={person.id} className="suspect-row" onClick={() => setSuspect(person)}><span className="suspect-number">0{index + 1}</span><span><strong>{person.name}</strong><small>{person.occupation}</small></span><span className="suspect-arrow">↗</span></button>)}</div></section>
        <section className="sidebar-timeline"><div className="sidebar-heading">CASE TIMELINE <Clock3 size={13} /></div>{mystery.timeline.map((item, index) => <div className="timeline-entry" key={`${item.time}-${index}`}><span>{item.time}</span><p>{item.event}</p></div>)}</section>
        <p className="sidebar-disclaimer">All case materials are fictional entertainment.</p>
      </aside>
      <section className="evidence-board"><div className="evidence-heading"><div><div className="eyebrow">INVESTIGATION MATERIALS</div><h2>Evidence board <span>{mystery.evidence.length}</span></h2></div><span className="sealed-label"><span className="live-dot" /> SOLUTION SEALED</span></div>
        <div className="evidence-tabs">{categories.map(({ id: key, label, icon: Icon }) => <button key={key} className={category === key ? 'active' : ''} onClick={() => setCategory(key)}><Icon size={14} />{label}</button>)}</div>
        <div className="evidence-grid">{evidence.map((item, index) => <button className="evidence-card" key={item.id} onClick={() => setSelected(item)}><span className="evidence-card-top"><span>{item.type.toUpperCase()}</span><span>{String(index + 1).padStart(2, '0')}</span></span><h3>{item.title}</h3><p>{item.description}</p><span className="evidence-open">OPEN FILE ↗</span></button>)}</div>
        {evidence.length === 0 && <p className="empty-evidence">No evidence in this category.</p>}
        <div className="accusation-panel"><div className="accusation-panel-heading"><Fingerprint size={21} /><div><strong>Ready to name your suspect?</strong><p>Your accusation is final. The solution will be revealed after submission.</p></div></div>
          <label htmlFor="accused-suspect">YOUR ACCUSATION</label><select id="accused-suspect" value={selectedSuspectId} onChange={(event) => setSelectedSuspectId(event.target.value)}><option value="">Choose a suspect…</option>{mystery.suspects.map((person) => <option key={person.id} value={person.id}>{person.name} — {person.occupation}</option>)}</select>
          <label htmlFor="accusation-reason">YOUR REASON <span>OPTIONAL</span></label><textarea id="accusation-reason" maxLength={500} rows={2} value={reason} onChange={(event) => setReason(event.target.value)} placeholder="Which clues led you to this conclusion?" />
          {accusationError && <p className="form-error" role="alert">{accusationError}</p>}
          <button className="button button-primary accusation-submit" disabled={!selectedSuspectId || submitting} onClick={() => setConfirming(true)}>Submit final accusation <Fingerprint size={16} /></button>
        </div>
      </section>
    </div>
  </main><Footer />
    {(selected || suspect) && <div className="modal-backdrop" onClick={() => { setSelected(null); setSuspect(null); }}><section className="detail-modal" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}><button className="modal-close" aria-label="Close" onClick={() => { setSelected(null); setSuspect(null); }}><X size={18} /></button>{selected ? <><div className="eyebrow">{selected.type.toUpperCase()} / {selected.timestamp || 'CASE MATERIAL'}</div><h2>{selected.title}</h2><p>{selected.description}</p>{selected.type === 'image' && <div className="placeholder-image"><ImageIcon size={25} /><span>TEXT DESCRIPTION ONLY</span></div>}<div className="detail-content">{selected.content}</div>{selected.relatedSuspects?.length > 0 && <div className="related-list">RELATED PERSONS: {selected.relatedSuspects.map((personId) => mystery.suspects.find((person) => person.id === personId)?.name || personId).join(', ')}</div>}</> : <><div className="eyebrow">PERSON OF INTEREST</div><h2>{suspect.name}</h2><p>{suspect.age} years old · {suspect.occupation}</p><dl className="suspect-details"><dt>CONNECTION</dt><dd>{suspect.relationship}</dd><dt>POSSIBLE MOTIVE</dt><dd>{suspect.motive}</dd><dt>ALIBI</dt><dd>{suspect.alibi}</dd><dt>NOTES</dt><dd>{suspect.description} {suspect.suspiciousDetails}</dd></dl></>}</section></div>}
    {confirming && <div className="modal-backdrop" onClick={() => !submitting && setConfirming(false)}><section className="detail-modal accusation-confirm" role="alertdialog" aria-modal="true" aria-labelledby="confirm-title" onClick={(event) => event.stopPropagation()}><button className="modal-close" aria-label="Close" disabled={submitting} onClick={() => setConfirming(false)}><X size={18} /></button><div className="eyebrow">FINAL ACCUSATION</div><h2 id="confirm-title">Seal your decision?</h2><p>You are accusing <strong>{mystery.suspects.find((person) => person.id === selectedSuspectId)?.name}</strong>. You cannot change your answer after this.</p><div className="confirm-actions"><button className="button confirm-cancel" disabled={submitting} onClick={() => setConfirming(false)}>Review evidence</button><button className="button button-primary" disabled={submitting} onClick={confirmAccusation}>{submitting ? 'Submitting…' : 'Confirm accusation'}</button></div></section></div>}
  </div>;
}
