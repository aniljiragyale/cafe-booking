import {imageUrl} from '@/lib/data';

const pictures=[
  ['photo-1511795409834-ef04bbd61622','Warm celebration table'],
  ['photo-1519167758481-83f550bb49b3','Elegant party setup'],
  ['photo-1514933651103-005eec06c04b','Private event space'],
  ['photo-1514525253161-7a46d19cd819','Party lights'],
  ['photo-1513151233558-d860c5398176','Birthday decorations'],
  ['photo-1464366400600-7168b8af9bc3','Celebration cake'],
];
export default function Page(){return <><section className="page-hero"><div className="wrap"><div className="eyebrow">Celebration inspiration</div><h1>Set the scene for your day.</h1><p className="muted" style={{color:'#ccc'}}>A few ideas for the kind of atmosphere you can create with your Jumbo Screen celebration.</p></div></section><section className="section"><div className="wrap"><p className="gallery-note">These images are examples for inspiration. Your decoration setup can be discussed when you request a booking.</p><div className="gallery-grid">{pictures.map(([src,label])=><figure key={src}><img src={imageUrl(src,800)} alt={label}/><figcaption>{label}</figcaption></figure>)}</div></div></section></>}
