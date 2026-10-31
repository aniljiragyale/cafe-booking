import Link from 'next/link';
import { Check, Clock3, Users, Sparkles, Flame, PartyPopper, Flower2, MessageCircle } from 'lucide-react';

const plans = [
  { id: '45-min', name: 'The 45-Minute Celebration Special', time: '45 minutes', price: 500, intro: 'A short, sweet Jumbo Screen celebration for up to four people.', features: ['Cake cutting', 'Decoration setup', '15 soft copies'], exclusions: '', ribbon: 'KIRIK PARTY SPECIAL', featured: false },
  { id: '1-hour', name: 'The Quick Celebration', time: '1 hour', price: 799, intro: 'A private Jumbo Screen celebration for four.', features: ['Private Jumbo Screen experience', 'LED name display & HBD letters', 'Decoration setup', 'OTT access', '4K screen with Dolby Atmos'], exclusions: 'Cake, fog entry and DSLR photography are not included.', ribbon: '', featured: false },
  { id: '2-hour', name: 'The Signature Celebration', time: '2 hours', price: 1599, intro: 'More time for the grand entrance, photos and cake.', features: ['Everything in the 1-hour package', 'Half-kilo cake', 'Fog entry', 'HBD LED letters', 'DSLR photography · 30 soft copies'], exclusions: '', ribbon: 'MOST POPULAR', featured: true },
  { id: '3-hour', name: 'The Full Celebration', time: '3 hours', price: 2199, intro: 'Enjoy three full hours for your celebration, cake, photos and private screening.', features: ['Private Jumbo Screen experience', 'LED name display & HBD LED letters', 'Decoration setup and OTT access', '4K screen with Dolby Atmos', 'Half-kilo cake', 'Fog entry', 'DSLR photography · 30 soft copies'], exclusions: '', ribbon: '', featured: false },
];
const addons = [
  { name: 'Rose petal entry', price: 499, icon: Flower2 }, { name: 'Rose petals on the table', price: 199, icon: Flower2 },
  { name: 'Bubble entry', price: 149, icon: Sparkles }, { name: 'Candle walk', price: 149, icon: Flame },
  { name: 'LED letter name', price: 199, icon: PartyPopper }, { name: '2 cold-fire guns', price: 499, icon: Flame },
];

export default function Page() {
  return <>
    <section className="page-hero"><div className="wrap"><div className="eyebrow">One private room. Your people. Your moment.</div><h1>Jumbo Screen celebrations.</h1><p className="muted" style={{color:'#ccc',maxWidth:650}}>A private celebration space with a big-screen experience, thoughtful décor and time together. Every package is for up to four people.</p></div></section>
    <section className="section"><div className="wrap">
      <div className="section-head"><div><div className="eyebrow">Choose your celebration time</div><h2 className="serif">Simple packages, lovely moments.</h2></div><span className="tag"><Users size={14}/> &nbsp;For 4 people</span></div>
      <div className="grid-3 package-cards packages-grid">{plans.map((p)=><article className={`card package-card ${p.featured?'package-featured':''}`} key={p.name}>
        {p.ribbon&&<div className="package-ribbon">{p.ribbon}</div>}<div className="package-card-inner"><div className="eyebrow">Jumbo Screen</div><h3 className="serif">{p.name}</h3><div className="package-duration"><Clock3 size={16}/>{p.time} private celebration</div>
          <div className="package-price"><span>₹</span>{p.price.toLocaleString('en-IN')}<small> / package</small></div><p className="muted package-intro">{p.intro}</p>
          <div className="package-includes"><b>Included</b>{p.features.map(label=><div className="package-feature" key={label}><Check size={15}/><span>{label}</span></div>)}</div>{p.exclusions&&<p className="package-exclusion">{p.exclusions}</p>}
          <div className="package-extra">Package for up to 4 · Extra guests <b>₹100 each</b></div><Link className={`btn ${p.featured?'':'btn-dark'}`} href={`/book?package=${p.id}`} style={{width:'100%',marginTop:20}}>Choose {p.time} package →</Link>
        </div></article>)}</div>
      <div className="package-note"><Sparkles size={20}/><div><b>Your celebration, completely private.</b><br/><span>Make the space yours, bring your favourite people, and enjoy your own Jumbo Screen experience.</span></div></div>
    </div></section>
    <section className="section add-on-section"><div className="wrap"><div className="section-head"><div><div className="eyebrow">Make it extra special</div><h2 className="serif">Little extras, big reactions.</h2><p className="muted">Add any of these while booking your celebration.</p></div></div><div className="addon-grid">{addons.map(({name,price,icon:Icon})=><div className="addon-card" key={name}><span className="occasion-icon"><Icon size={19}/></span><div><b>{name}</b><small>Optional add-on</small></div><strong>₹{price}</strong></div>)}</div>
      <div className="food-note"><div><b>Want something to nibble?</b><p className="muted">Veg and non-veg starters are available. Homemade chocolates can be arranged when requested in advance.</p></div><Link className="btn btn-dark" href="/book">Plan your celebration</Link></div>
    </div></section>
  </>;
}
