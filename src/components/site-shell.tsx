'use client';
import Link from 'next/link';
import Image from 'next/image';
import {useEffect,useState} from 'react';
import {usePathname} from 'next/navigation';
import {Menu, X, Instagram, Facebook, Phone} from 'lucide-react';
import {GlobalBackButton} from '@/components/global-back-button';

function BrandLogo({footer=false}:{footer?:boolean}){
  return <Link className={`brand-logo${footer?' brand-logo-footer':''}`} href="/" aria-label="Kirik Party home">
    <Image src="/images/kirik-party-logo.png" alt="Kirik Party — Private Theatre & Celebrations" width={300} height={200} priority={!footer} />
  </Link>;
}

export function SiteShell({children}:{children:React.ReactNode}){
  const[open,setOpen]=useState(false);
  const pathname=usePathname();
  useEffect(()=>{setOpen(false);},[pathname]);
  const links=[['Theatres','/theatres'],['Celebrations','/celebrations'],['Packages','/packages'],['Gallery','/gallery'],['Our story','/about']];
  return <><header className="nav"><div className="wrap nav-inner"><BrandLogo/><nav id="primary-navigation" className={`nav-links ${open?'open':''}`}>
    {links.map(([n,h])=><Link onClick={()=>setOpen(false)} key={n} href={h}>{n}</Link>)}
    <Link onClick={()=>setOpen(false)} href="/my-bookings">My bookings</Link><Link onClick={()=>setOpen(false)} className="btn nav-cta" href="/book">Plan your party <span>↗</span></Link>
  </nav><button aria-label={open?'Close navigation':'Open navigation'} aria-expanded={open} aria-controls="primary-navigation" className="mobile-toggle" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button></div></header>
    <GlobalBackButton/>{children}
    <footer className="footer"><div className="wrap"><div className="footer-grid"><div><BrandLogo footer/><p className="muted" style={{maxWidth:360,marginTop:18,color:'#aaa'}}>Your own little world for the moments you want to make unforgettable.</p></div>
      <div><b>Explore</b><Link href="/theatres">Jumbo Screen</Link><Link href="/celebrations">Celebrations</Link><Link href="/packages">Packages</Link><Link href="/gallery">Inspiration</Link></div><div><b>Let’s talk</b><Link href="/contact">Send an enquiry</Link><Link href="/my-bookings">My bookings</Link><Link href="/admin">Admin portal</Link></div></div>
      <div className="footer-socials" aria-label="Social and contact icons"><span title="Instagram" aria-label="Instagram"><Instagram size={18}/></span><span title="Call" aria-label="Call"><Phone size={18}/></span><span title="Facebook" aria-label="Facebook"><Facebook size={18}/></span></div>
      <div className="footer-bottom">© 2026 Kirik Party · Made for your moments.</div></div></footer>
  </>;
}
