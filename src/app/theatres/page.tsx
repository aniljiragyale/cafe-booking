import Link from 'next/link';
import {Users,Clock3,MapPin,ArrowRight,PartyPopper} from 'lucide-react';
import {theatres} from '@/lib/data';
import {TheatreCard} from '@/components/theatre-card';
import {VenueFeatureList} from '@/components/venue-feature-list';

const venue=theatres[0];
export default function Page(){
  return <><section className="page-hero"><div className="wrap"><div className="eyebrow">A private space for your special day</div><h1>Meet the Jumbo Screen.</h1><p className="muted" style={{color:'#ccc',maxWidth:600}}>Your own private celebration room with a big screen, party décor and time with your favourite people.</p></div></section>
    <section className="section"><div className="wrap venue-layout"><div><TheatreCard t={venue}/></div><aside className="venue-details"><div className="eyebrow">Your celebration setup</div><h2 className="serif">A party space, all yours.</h2><p className="muted">Enjoy a private Jumbo Screen experience for birthdays, anniversaries, proposals, baby showers and other get-togethers.</p>
        <div className="venue-detail-row"><Users/><div><b>Packages for 4 people</b><small>Additional guests are ₹100 per person.</small></div></div>
        <div className="venue-detail-row"><Clock3/><div><b>Pick your celebration time</b><small>Choose from 1, 2 or 3-hour packages.</small></div></div>
        <div className="venue-detail-row"><MapPin/><div><b>Venue location</b><small>Ask us for the location when you enquire.</small></div></div>
        <div className="venue-detail-row"><PartyPopper/><div><b>Personalise the moment</b><small>Add rose petals, bubbles, a candle walk and more.</small></div></div>
        <Link href="/book?package=2-hour" className="btn btn-dark venue-cta">Request your celebration <ArrowRight size={16}/></Link>
      </aside></div>
      <div className="wrap venue-includes"><div><div className="eyebrow">The Jumbo Screen experience</div><h2 className="serif">The details that set the scene.</h2><p className="muted">Tap any feature to see what it includes and how the packages differ.</p></div><VenueFeatureList features={venue.features}/></div>
    </section>
    <section className="section theatre-guide"><div className="wrap"><div className="section-head"><div><div className="eyebrow">Helpful details before you book</div><h2 className="serif">Plan your theatre celebration.</h2><p className="muted">A few things to know before choosing your package and sending a booking request.</p></div><Link href="/packages" className="text-link">Compare every package <ArrowRight size={15}/></Link></div>
      <div className="theatre-guide-grid">
        <article className="theatre-guide-card"><span className="theatre-guide-number">01</span><h3>Choose your time</h3><p>Pick the 1-hour, 2-hour or 3-hour Jumbo Screen package. All package prices cover up to four people; each additional guest is ₹100.</p><Link href="/packages">View package details <ArrowRight size={14}/></Link></article>
        <article className="theatre-guide-card"><span className="theatre-guide-number">02</span><h3>Choose the 45-minute special</h3><p>For ₹500, enjoy 45 minutes with cake cutting, decoration setup and 15 soft copies. Rose petals, bubbles, a candle walk and other extras are optional add-ons.</p><Link href="/book?package=45-min">Book this package <ArrowRight size={14}/></Link></article>
        <article className="theatre-guide-card"><span className="theatre-guide-number">03</span><h3>Ask about food</h3><p>Veg and non-veg starters are available at an additional charge. Homemade chocolates can be requested in advance. Food menu and prices are confirmed separately.</p><Link href="/contact">Ask about food <ArrowRight size={14}/></Link></article>
        <article className="theatre-guide-card"><span className="theatre-guide-number">04</span><h3>Wait for slot confirmation</h3><p>Send your preferred date and time as a booking request. The team checks availability and confirms with you; your date is not final until it is confirmed.</p><Link href="/book">Request a date <ArrowRight size={14}/></Link></article>
      </div>
      <div className="theatre-location-note"><MapPin size={18}/><p><b>Need directions?</b> Venue location details are shared when you enquire. <Link href="/contact">Contact Kirik Party <ArrowRight size={13}/></Link></p></div>
    </div></section>
  </>;
}
