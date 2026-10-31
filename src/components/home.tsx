'use client';

import Link from 'next/link';
import {motion} from 'framer-motion';
import {ArrowRight,Check,Clock3,Users,Sparkles,Heart,PartyPopper,Gift,Camera,Utensils,MessageCircle,Star} from 'lucide-react';
import {imageUrl} from '@/lib/data';

const packages=[
  {id:'1-hour',duration:'1 hour',price:799,title:'A little celebration',description:'Your own private Jumbo Screen experience for up to four people.',extras:['LED name display','HBD LED letters','Decoration setup','OTT platforms','4K screen with Dolby Atmos'],note:'Cake, fog entry and DSLR photography are not included.'},
  {id:'2-hour',duration:'2 hours',price:1599,title:'The signature party',description:'More time for your entrance, celebration and photos.',extras:['Everything in the 1-hour package','Half-kilo cake','Fog entry','HBD LED letters','DSLR photography · 30 soft copies'],note:''},
  {id:'3-hour',duration:'3 hours',price:2199,title:'Make a night of it',description:'Three full hours for your private screening, cake, celebration and photos.',extras:['LED name display & HBD LED letters','Decoration setup and OTT access','4K screen with Dolby Atmos','Half-kilo cake and fog entry','DSLR photography · 30 soft copies'],note:''},
];
const addons=[['Rose petal entry','₹499'],['Rose petals on the table','₹199'],['Bubble entry','₹149'],['Candle walk','₹149'],['LED letter name','₹199'],['2 cold-fire guns','₹499']];
const occasions=[{icon:PartyPopper,label:'Birthdays'},{icon:Heart,label:'Anniversaries'},{icon:Gift,label:'Surprises & proposals'},{icon:Sparkles,label:'Baby showers & family days'}];
const celebrationPhotos=[
  ['photo-1513151233558-d860c5398176','Birthday decoration ideas'],
  ['photo-1464366400600-7168b8af9bc3','Cake and sweet details'],
  ['photo-1514525253161-7a46d19cd819','A room lit for a celebration'],
];

export function Home(){
  return <>
    <section className="hero"><div className="wrap"><motion.div className="hero-content" initial={{opacity:0,y:22}} animate={{opacity:1,y:0}} transition={{duration:.65}}>
      <div className="eyebrow">Kirik Party · Jumbo Screen celebrations</div>
      <h1>Your moment.<br/><i style={{color:'#d5b77f'}}>Big-screen magic.</i></h1>
      <p>Make birthdays, anniversaries and just-because days feel like the main event—with your own private screen, thoughtful décor and favourite people all in one place.</p>
      <Link href="/book?package=45-min" className="hero-special-offer"><span className="hero-special-price">{'\u20B9'}500</span><span className="hero-special-copy"><b>45-minute celebration</b><small>Cake cutting · Decoration setup · 15 soft copies</small></span><ArrowRight size={17}/></Link>
      <div className="hero-actions"><Link className="btn" href="/packages">Explore packages <ArrowRight size={16}/></Link><Link className="btn btn-outline" href="/book">Request a booking</Link></div>
      <div className="home-facts"><span><Users size={15}/> Packages for 4</span><span><Clock3 size={15}/> 45 minutes, 1, 2 or 3 hours</span><span><Sparkles size={15}/> Completely private</span></div>
    </motion.div></div></section>

    <section className="home-special-offer" aria-labelledby="special-offer-title"><div className="wrap home-special-inner"><div className="home-special-price"><span>KIRIK PARTY SPECIAL</span><strong>₹500</strong><small>45-minute package</small></div><div className="home-special-copy"><div className="eyebrow">A short celebration, with the special touches</div><h2 id="special-offer-title">45-minute celebration</h2><p>Includes cake cutting, decoration setup and 15 soft copies for up to four people.</p></div><Link className="btn btn-dark" href="/book?package=45-min">Book the 45-minute package <ArrowRight size={16}/></Link></div></section>

    <section className="section home-intro"><div className="wrap home-intro-grid"><div><div className="eyebrow">Made for getting together</div><h2 className="serif">A celebration space that feels like <em>your</em> occasion.</h2></div><div><p className="muted">Enjoy your own Jumbo Screen, celebration décor and a private room for your favourite people. Choose the time that suits your plan, then add the details that make it personal.</p><Link href="/celebrations" className="text-link">Find your kind of celebration <ArrowRight size={15}/></Link></div></div>
      <div className="wrap occasion-strip">{occasions.map(({icon:Icon,label})=><div className="occasion-pill" key={label}><span><Icon size={17}/></span>{label}</div>)}</div>
    </section>

    <section className="section home-packages"><div className="wrap"><div className="section-head"><div><div className="eyebrow">Clear prices, lovely details</div><h2 className="serif">Choose your party time.</h2><p className="muted">All packages include up to four people. Add guests for ₹100 each.</p></div><Link href="/packages" className="text-link">See full package details <ArrowRight size={15}/></Link></div>
      <div className="grid-3 home-package-grid">{packages.map((p,i)=><article className={`home-package-card ${i===1?'home-package-featured':''}`} key={p.id}>
        {i===1&&<span className="package-ribbon">MOST POPULAR</span>}<div className="home-package-inner"><div className="home-package-meta"><span><Clock3 size={15}/>{p.duration}</span><span><Users size={15}/>Up to 4</span></div><h3>{p.title}</h3><p className="muted">{p.description}</p><div className="home-price"><span>₹</span>{p.price.toLocaleString('en-IN')}<small> / package</small></div>
          <ul>{p.extras.map(item=><li key={item}><Check size={15}/>{item}</li>)}</ul>{p.note&&<p className="home-package-note">{p.note}</p>}<Link className={`btn ${i===1?'':'btn-dark'}`} href={`/book?package=${p.id}`} style={{width:'100%'}}>Choose this package <ArrowRight size={15}/></Link>
        </div></article>)}</div>
    </div></section>

    <section className="section home-experience"><div className="wrap home-experience-grid"><div className="home-experience-copy"><div className="eyebrow">Included in your celebration</div><h2 className="serif">The big-screen moment, with the party details.</h2><p className="muted">Every package includes the private Jumbo Screen experience and celebration setup. The 2- and 3-hour packages also include cake, fog entry and a DSLR photo set.</p><div className="benefit-list"><span><Check/>LED name display</span><span><Check/>Beautiful decoration setup</span><span><Check/>Access to all OTT platforms</span><span><Check/>4K screen with Dolby Atmos</span><span><Check/>Half-kilo cake on 2- & 3-hour packages</span><span><Check/>DSLR photography · 30 soft copies on 2- & 3-hour packages</span></div><Link href="/packages" className="text-link">Compare what’s included <ArrowRight size={15}/></Link></div>
        <div className="experience-image"><img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1100&q=85" alt="A warm, decorated celebration table"/><div className="experience-image-caption"><Sparkles size={18}/><span>Made for your moment</span></div></div>
      </div></section>

    <section className="section home-celebration-photos"><div className="wrap"><div className="section-head"><div><div className="eyebrow">A little inspiration</div><h2 className="serif">Imagine your celebration.</h2><p className="muted">Ideas for birthday details, cake and party lighting. Photos are inspiration; ask us which decoration options can be arranged.</p></div><Link href="/gallery" className="text-link">See more inspiration <ArrowRight size={15}/></Link></div><div className="home-photo-grid">{celebrationPhotos.map(([src,label])=><Link href="/gallery" className="home-photo-card" key={src}><img src={imageUrl(src,900)} alt={label}/><span>{label}</span></Link>)}</div></div></section>

    <section className="section home-addons"><div className="wrap"><div className="section-head"><div><div className="eyebrow">Add a little extra</div><h2 className="serif">Small touches. Big smiles.</h2><p className="muted">Optional celebration add-ons, available with your booking.</p></div><Link href="/book" className="btn btn-dark">Plan your celebration <ArrowRight size={15}/></Link></div><div className="home-addon-grid">{addons.map(([name,price])=><div className="home-addon" key={name}><span><Star size={14}/></span><b>{name}</b><strong>{price}</strong></div>)}</div><div className="food-banner"><Utensils size={21}/><div><b>Food & sweet treats</b><p>Veg and non-veg starters are available at an additional charge. Homemade chocolates can be requested in advance; ask us to confirm details.</p></div><Link href="/contact" aria-label="Ask about food and chocolates"><MessageCircle size={18}/></Link></div></div></section>

    <section className="section how"><div className="wrap"><div className="section-head"><div><div className="eyebrow">Easy to plan</div><h2 className="serif">From idea to party.</h2></div><p className="muted" style={{maxWidth:340,color:'#c9c0b4'}}>Pick your package, tell us about your occasion, and choose any extras.</p></div><div className="steps">{[['01','Choose your time','Select a 1-, 2- or 3-hour private celebration package.'],['02','Add your details','Choose your date, guest count and any optional add-ons.'],['03','Review your plan','Check your preferred date and estimated total; the date must be confirmed before your booking is final.']].map(([n,title,desc])=><div className="step" key={n}><b>{n}</b><h3>{title}</h3><p className="muted" style={{color:'#bdb5aa'}}>{desc}</p></div>)}</div><div className="home-footnote">Food and starter charges are confirmed separately. Extra guests are ₹100 per person.</div></div></section>

    <section className="section home-faq"><div className="wrap"><div className="section-head"><div><div className="eyebrow">Good to know</div><h2 className="serif">A few quick answers.</h2></div><Link href="/contact" className="text-link">Ask us anything <ArrowRight size={15}/></Link></div><div className="faq-grid">
      <article><h3>How many people are included?</h3><p>Each package covers four people. Additional guests are ₹100 per person.</p></article>
      <article><h3>What changes between packages?</h3><p>The 1-hour package does not include cake, fog entry or photography. The 2- and 3-hour packages include a half-kilo cake, fog entry, HBD LED letters and DSLR photography with 30 soft copies.</p></article>
      <article><h3>Can we order food?</h3><p>Veg and non-veg starters are available at an additional charge. Ask us to confirm the menu and price.</p></article>
      <article><h3>Can I add homemade chocolates?</h3><p>Yes. Please request homemade chocolates in advance so the details can be arranged.</p></article>
    </div></div></section>

    <section className="cta-band"><div className="wrap home-cta"><div><div className="eyebrow" style={{color:'#574729'}}>YOUR CELEBRATION STARTS HERE</div><h2 className="serif">Ready to make a day of it?</h2><p>See the packages or tell us what you’re celebrating.</p></div><div className="hero-actions"><Link href="/packages" className="btn btn-dark">View packages</Link><Link href="/contact" className="btn btn-light">Contact Kirik Party</Link></div></div></section>
  </>;
}
