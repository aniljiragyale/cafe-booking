'use client';
import {useState} from 'react';
import {useRouter} from 'next/navigation';
import {Sparkles} from 'lucide-react';
import {celebrations} from '@/lib/data';

const packages = {
  '45-min': { label: '45 minutes · Celebration Special', price: 500, includes: ['Cake cutting', 'Decoration setup', '15 soft copies'], note: '' },
  '1-hour': { label: '1 hour · Quick Celebration', price: 799, includes: ['LED name display', 'HBD LED letters', 'Decoration setup', 'OTT access', '4K screen with Dolby Atmos'], note: 'Cake, fog entry and DSLR photography are not included.' },
  '2-hour': { label: '2 hours · Signature Celebration', price: 1599, includes: ['LED name display', 'Decoration setup', 'OTT access', '4K screen with Dolby Atmos', 'Half-kilo cake', 'Fog entry', 'HBD LED letters', 'DSLR photos · 30 soft copies'], note: '' },
  '3-hour': { label: '3 hours · Full Celebration', price: 2199, includes: ['LED name display', 'Decoration setup', 'OTT access', '4K screen with Dolby Atmos', 'Half-kilo cake', 'Fog entry', 'HBD LED letters', 'DSLR photos · 30 soft copies'], note: '' },
} as const;
const addons = [
  ['Rose petal entry', 499], ['Rose petals on the table', 199], ['Bubble entry', 149],
  ['Candle walk', 149], ['LED letter name', 199], ['2 cold-fire guns', 499],
] as const;
type PackageId = keyof typeof packages;

export function BookingForm({initialPackage='2-hour'}:{initialPackage?:string}) {
  const router=useRouter();
  const [pack,setPack]=useState<PackageId>(initialPackage in packages ? initialPackage as PackageId : '2-hour');
  const [celebration,setCelebration]=useState(celebrations[0]);
  const [guests,setGuests]=useState(4);
  const [selectedAddons,setSelectedAddons]=useState<string[]>([]);
  const [done,setDone]=useState(false);
  const [saving,setSaving]=useState(false);
  const [error,setError]=useState('');
  const current=packages[pack];
  const extraGuests=Math.max(0,guests-4);
  const addonTotal=addons.reduce((sum,[name,price])=>sum+(selectedAddons.includes(name)?price:0),0);
  const total=current.price+extraGuests*100+addonTotal;
  function toggleAddon(name:string){setSelectedAddons(values=>values.includes(name)?values.filter(x=>x!==name):[...values,name]);}
  async function submit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    const fd=new FormData(e.currentTarget);
    const otherCelebration=String(fd.get('otherCelebration')||'').trim();
    if(celebration==='Other'&&!otherCelebration){setError('Please tell us what you are celebrating.');return;}
    setError('');setSaving(true);
    try{const response=await fetch('/api/bookings',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({packageId:pack,name:fd.get('name'),email:fd.get('email'),phone:fd.get('phone'),date:fd.get('date'),time:fd.get('time'),celebration:celebration==='Other'?otherCelebration:celebration,guests,addons:selectedAddons,food:fd.get('food'),chocolates:fd.get('chocolates')==='on',notes:fd.get('notes')})});const result=await response.json();if(!response.ok)throw new Error(result.error||'Could not save your booking request.');const saved=JSON.parse(localStorage.getItem('kirik-bookings')||'[]');localStorage.setItem('kirik-bookings',JSON.stringify([result.booking,...saved]));setDone(true);}catch(reason){setError(reason instanceof Error?reason.message:'Could not save your booking request.');}finally{setSaving(false);}
  }
  if(done)return <div className="empty-state"><div className="eyebrow">Booking details saved</div><h2 className="serif">Your party plan is ready.</h2><p className="muted">Your request is saved. The Kirik Party team will review it and confirm availability before the booking is final.</p><button className="btn btn-dark" onClick={()=>router.push('/my-bookings')}>See my bookings</button></div>;
  return <div className="booking-layout"><form className="form-card" onSubmit={submit}>
    <div className="eyebrow">Jumbo Screen · private celebration</div><h2 className="serif">Let’s plan your party.</h2>
    <div className="form-grid">
      <div className="form-group full"><label>Choose your package</label><select name="package" value={pack} onChange={e=>setPack(e.target.value as PackageId)}>{Object.entries(packages).map(([id,p])=><option key={id} value={id}>{p.label} · ₹{p.price.toLocaleString('en-IN')} (up to 4 people)</option>)}</select></div>
      <div className="form-group"><label htmlFor="celebration">What are we celebrating?</label><select id="celebration" name="celebration" required value={celebration} onChange={e=>setCelebration(e.target.value)}>{celebrations.map(c=><option key={c} value={c}>{c}</option>)}<option value="Other">Other</option></select>{celebration==='Other'&&<div className="form-group"><label htmlFor="other-celebration">Tell us your occasion</label><input id="other-celebration" name="otherCelebration" required maxLength={100} placeholder="e.g. Graduation, reunion, family get-together"/></div>}</div>
      <div className="form-group"><label>Number of guests</label><input type="number" min="1" value={guests} onChange={e=>setGuests(Math.max(1,Number(e.target.value)))} required/><small className="muted">Package includes 4 people; extra guests are ₹100 each.</small></div>
      <div className="form-group"><label>Your date</label><input name="date" type="date" required min={new Date().toISOString().slice(0,10)}/></div>
      <div className="form-group"><label>Preferred start time</label><select name="time"><option>11:00 AM</option><option>2:00 PM</option><option>5:00 PM</option><option>8:00 PM</option></select></div>
      <div className="form-group"><label>Your name</label><input name="name" required placeholder="Name"/></div>
      <div className="form-group"><label>Phone number</label><input name="phone" type="tel" required placeholder="+91"/></div>
      <div className="form-group full"><label>Email address</label><input name="email" type="email" required placeholder="you@example.com"/></div>
      <div className="form-group full"><label>Optional add-ons</label><div className="booking-addon-list">{addons.map(([name,price])=><label className="booking-addon" key={name}><input type="checkbox" checked={selectedAddons.includes(name)} onChange={()=>toggleAddon(name)}/><span>{name}</span><b>₹{price}</b></label>)}</div></div>
      <div className="form-group"><label>Starters</label><select name="food"><option value="None">No starters</option><option>Veg starters · please confirm menu</option><option>Non-veg starters · please confirm menu</option></select><small className="muted">Available at an additional charge; we’ll confirm menu and price.</small></div>
      <label className="form-group food-check"><span>Homemade chocolates · request in advance</span><input type="checkbox" name="chocolates"/></label>
      <div className="form-group full"><label>Special requests</label><textarea name="notes" rows={3} placeholder="Theme, name for the LED display, cake preference..."/></div>
      {error&&<div className="form-group full"><p className="form-error" role="alert">{error}</p></div>}
      <div className="form-group full"><button className="btn btn-dark" disabled={saving}>{saving?'Saving request…':`Request your date · ₹${total.toLocaleString('en-IN')}`}</button></div>
    </div>
  </form><aside className="summary">
    <div className="eyebrow">Your celebration</div><h2 className="serif">Jumbo Screen</h2><p className="muted">100% private celebration experience</p>
    <div className="summary-row"><span>{current.label}</span><b>₹{current.price.toLocaleString('en-IN')}</b></div>
    <div className="summary-row"><span>Guests</span><b>{guests}</b></div>
    {extraGuests>0&&<div className="summary-row"><span>{extraGuests} extra guest{extraGuests>1?'s':''} × ₹100</span><b>₹{(extraGuests*100).toLocaleString('en-IN')}</b></div>}
    {selectedAddons.map(name=>{const item=addons.find(x=>x[0]===name)!;return <div className="summary-row" key={name}><span>{name}</span><b>₹{item[1]}</b></div>})}
    <div className="summary-row" style={{fontSize:18}}><b>Estimated total</b><b>₹{total.toLocaleString('en-IN')}</b></div>
    {current.note&&<div className="package-exclusion">{current.note}</div>}
    <div className="notice"><Sparkles size={15}/> Included: {current.includes.join(' · ')}.</div>
    <p className="muted" style={{fontSize:12}}>Starters are extra. Homemade chocolates must be requested in advance. We’ll confirm availability and final add-on/food charges before confirming your booking.</p>
  </aside></div>;
}
