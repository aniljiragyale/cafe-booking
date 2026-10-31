'use client';
import {useEffect,useState} from 'react';
import Link from 'next/link';
import {CalendarDays} from 'lucide-react';

type Booking={id:string;name:string;email:string;date:string;time:string;theatre:string;pack:string;price:number;status:string;celebration?:string;guests?:number;addons?:string[]};
export default function Page(){
  const[list,setList]=useState<Booking[]>([]);
  useEffect(()=>{setList(JSON.parse(localStorage.getItem('kirik-bookings')||'[]'))},[]);
  return <><section className="page-hero"><div className="wrap"><div className="eyebrow">Your party plans</div><h1>My bookings.</h1><p className="muted" style={{color:'#ccc'}}>Booking details saved in this browser.</p></div></section>
    <section className="section"><div className="wrap">{!list.length?<div className="empty-state"><h2 className="serif">No bookings just yet.</h2><p className="muted">Your next favourite memory is only a few clicks away.</p><Link href="/book" className="btn btn-dark">Plan your celebration</Link></div>:
      <div className="grid-3">{list.map(b=><article className="card" key={b.id}><div className="card-body"><span className="tag">{b.status}</span><h3 style={{marginTop:15}}>{b.theatre.replaceAll('-',' ')}</h3><p style={{display:'flex',gap:8,alignItems:'center'}}><CalendarDays size={15}/>{b.date} · {b.time}</p>{b.celebration&&<p className="muted">{b.celebration}{b.guests?` · ${b.guests} guests`:''}</p>}<p className="muted">{b.pack} · ₹{b.price.toLocaleString('en-IN')}</p>{(b.addons?.length??0)>0&&<p className="muted">Extras: {b.addons?.join(', ')}</p>}<p className="muted">Booking ref: {b.id}</p><Link href="/contact" className="text-link">Need to change this? Contact us</Link></div></article>)}</div>}</div></section></>;
}
