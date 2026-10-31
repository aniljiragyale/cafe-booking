import Link from 'next/link';
import { PartyPopper, Heart, Sparkles, Gift, Smile, ArrowRight, Clapperboard } from 'lucide-react';

const items = [
  { title: 'Birthday celebrations', description: 'Gather your favourite people for a private celebration, with décor and optional party extras.', icon: PartyPopper },
  { title: 'Kids’ birthday parties', description: 'Make the birthday child the star with a private Jumbo Screen celebration.', icon: Smile },
  { title: 'Baby showers', description: 'Bring family and friends together for a warm, personal celebration.', icon: Sparkles },
  { title: 'Anniversaries', description: 'Celebrate your story together in a private space set up for the occasion.', icon: Heart },
  { title: 'Romantic surprises & proposals', description: 'Plan a private reveal with rose petals, a candle walk or LED name details.', icon: Gift },
  { title: 'Jumbo Screen moments', description: 'Share a favourite film, photos, music videos or a personal message on your own screen.', icon: Clapperboard },
];

export default function Page() {
  return <>
    <section className="page-hero"><div className="wrap"><div className="eyebrow">A reason to get together</div><h1>Celebrate your kind of happy.</h1><p className="muted" style={{ color: '#ccc' }}>A private celebration space, thoughtful décor and optional extras for the moments you want to make special. Packages start at ₹500 for up to four people.</p></div></section>
    <section className="section"><div className="wrap grid-3">{items.map(({ title, description, icon: Icon }) => <article className="occasion" key={title}><div className="occasion-icon"><Icon size={21} /></div><h3>{title}</h3><p className="muted">{description}</p><Link href="/book" className="celebration-link">Plan this celebration <ArrowRight size={14} /></Link></article>)}</div></section>
    <section className="cta-band"><div className="wrap home-cta"><div><div className="eyebrow" style={{ color: '#574729' }}>KIRIK PARTY SPECIAL - 45 MINUTES</div><h2 className="serif">A celebration for ₹500.</h2><p>Cake cutting, decoration setup and 15 soft copies, for up to four people.</p></div><div className="hero-actions"><Link href="/book?package=45-min" className="btn btn-dark">Book the 45-minute package <ArrowRight size={15} /></Link><Link href="/packages" className="btn btn-light">Compare packages</Link></div></div></section>
  </>;
}
