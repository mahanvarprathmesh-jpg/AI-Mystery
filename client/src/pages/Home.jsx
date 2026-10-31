import { ArrowDown, ArrowUpRight, Eye, Fingerprint, LockKeyhole, MessagesSquare, Search, ShieldAlert, UserRoundSearch } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

const steps = [
  { number: '01', icon: Search, title: 'Set the scene', text: 'Start with a premise. A locked room, a vanished heir, a message sent too late.' },
  { number: '02', icon: Eye, title: 'Study the evidence', text: 'Read the messages. Check the timeline. Find the detail that does not belong.' },
  { number: '03', icon: Fingerprint, title: 'Name your suspect', text: 'Build your theory, make your accusation, and see if the evidence holds up.' },
];

export default function Home() {
  return <div className="page-shell"><Navbar />
    <main>
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><span className="live-dot" /> YOUR NEXT CASE IS WAITING</div>
          <h1>Every mystery<br />leaves a <em>trace.</em></h1>
          <p className="hero-intro">A story is only the beginning. Follow the evidence, question every alibi, and decide who you believe.</p>
          <div className="hero-actions"><Link to="/create" className="button button-primary">Start an investigation <ArrowUpRight size={17} /></Link><a href="#how-it-works" className="text-link">See how it works <ArrowDown size={15} /></a></div>
          <div className="hero-note"><LockKeyhole size={14} /> The answer stays sealed until your accusation.</div>
        </div>
        <div className="case-visual" aria-label="Illustrated fictional case file board">
          <div className="visual-grain" />
          <div className="visual-topline"><span>CASE NO. 047-A</span><span className="stamp">UNSOLVED</span></div>
          <div className="visual-headline">THE<br /><span>LAST</span><br />WITNESS</div>
          <div className="evidence-paper paper-one"><span className="paper-label">TRANSCRIPT / 11:42 PM</span><span className="paper-line long" /><span className="paper-line" /><span className="paper-line short" /><span className="paper-redaction" /></div>
          <div className="evidence-paper paper-two"><span className="paper-label">PERSON OF INTEREST</span><span className="avatar-silhouette"><UserRoundSearch size={43} strokeWidth={1.1} /></span><span className="paper-line short" /><span className="paper-line" /></div>
          <div className="evidence-photo"><div className="photo-window" /><span>STILL 03 · EAST CORRIDOR</span></div>
          <div className="thread thread-one" /><div className="thread thread-two" /><div className="thread thread-three" />
          <div className="pin pin-one" /><div className="pin pin-two" /><div className="pin pin-three" />
          <div className="visual-bottom"><span><ShieldAlert size={14} /> FICTIONAL CASE MATERIAL</span><span>01 / 03</span></div>
        </div>
      </section>

      <section className="ticker" aria-label="Investigation features"><div className="ticker-track"><span>NO TWO CASES ALIKE</span><i>✳</i><span>EVERY DETAIL MATTERS</span><i>✳</i><span>THE TRUTH IS IN THERE</span><i>✳</i><span>NO TWO CASES ALIKE</span><i>✳</i><span>EVERY DETAIL MATTERS</span></div></section>

      <section className="how-section section-wrap" id="how-it-works">
        <div className="section-heading"><div><div className="eyebrow">A DETECTIVE'S INSTINCT, PUT TO THE TEST</div><h2>Three steps.<br /><em>One truth.</em></h2></div><p>Each case unfolds through clues, conflicting accounts, and the spaces between them. How you connect it all is up to you.</p></div>
        <div className="steps-grid">{steps.map(({ number, icon: Icon, title, text }) => <article className="step-card" key={number}><div className="step-top"><span>{number}</span><Icon size={19} /></div><h3>{title}</h3><p>{text}</p><div className="step-rule" /></article>)}</div>
      </section>

      <section className="experience-section" id="the-experience"><div className="experience-inner"><div className="experience-mark"><MessagesSquare size={27} /><span>THE FILE</span></div><div className="experience-copy"><div className="eyebrow">A ROOM FULL OF QUESTIONS</div><h2>Evidence doesn't<br />tell the whole story.</h2><p>Chats, witness statements, timelines, and suspicious details. Read them closely. One small contradiction could change everything.</p><Link to="/create" className="text-link">Open a new case <ArrowUpRight size={15} /></Link></div><div className="quote-card"><span className="quote-mark">“</span><p>They all had a reason.<br />Only one had the chance.</p><span className="quote-caption">CASE NOTE / 09:16 PM</span></div></div></section>

      <section className="final-cta"><div className="eyebrow">THE FILE IS OPEN</div><h2>What happened<br />is up to <em>you.</em></h2><Link to="/create" className="button button-primary">Take the case <ArrowUpRight size={17} /></Link><span className="cta-footnote">No experience needed. Just pay attention.</span></section>
    </main><Footer />
  </div>;
}
