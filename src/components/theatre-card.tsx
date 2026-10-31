import Link from 'next/link';
import {ArrowUpRight,MapPin,Users,Clock3} from 'lucide-react';
import {imageUrl} from '@/lib/data';

type Theatre={id:string;name:string;location:string;includedGuests:number;price:number;image:string;tag:string;features:string[];description:string};
export function TheatreCard({t}:{t:Theatre}){
  return <article className="card theatre-card"><Link href={`/theatres/${t.id}`}><img className="card-img" src={imageUrl(t.image,1000)} alt="A decorated private celebration setup"/></Link>
    <div className="card-body"><span className="tag">{t.tag}</span><h2>{t.name}</h2><p className="muted theatre-location"><MapPin size={14}/>{t.location}</p>
      <p className="muted">{t.description}</p><div className="theatre-facts"><span><Users size={15}/>Package for {t.includedGuests}</span><span><Clock3 size={15}/>45 minutes, 1, 2 or 3 hours</span></div>
      <div className="theatre-card-bottom"><div><b>From ₹{t.price.toLocaleString('en-IN')}</b><small>Extra guests ₹100 each</small></div><Link aria-label={`Details for ${t.name}`} href={`/theatres/${t.id}`} className="occasion-icon"><ArrowUpRight size={18}/></Link></div>
    </div>
  </article>;
}
