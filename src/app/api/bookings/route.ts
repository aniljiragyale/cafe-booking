import {NextRequest,NextResponse} from 'next/server';
import {randomUUID} from 'node:crypto';
import {hasAdminAccess} from '@/lib/admin-auth';
import {cleanText,createBooking,listBookings} from '@/lib/server-store';

export const runtime='nodejs';
export const dynamic='force-dynamic';
const packagePrices={'45-min':500,'1-hour':799,'2-hour':1599,'3-hour':2199} as const;
const packageNames={'45-min':'45 minutes · Celebration Special','1-hour':'1 hour · Quick Celebration','2-hour':'2 hours · Signature Celebration','3-hour':'3 hours · Full Celebration'} as const;
const addonPrices:Record<string,number>={'Rose petal entry':499,'Rose petals on the table':199,'Bubble entry':149,'Candle walk':149,'LED letter name':199,'2 cold-fire guns':499};

export async function GET(request:NextRequest){if(!hasAdminAccess(request))return NextResponse.json({error:'Admin PIN required.'},{status:401});return NextResponse.json({bookings:listBookings()});}
export async function POST(request:NextRequest){
  try{
    const body=await request.json();const packageId=body.packageId as keyof typeof packagePrices;
    if(!(packageId in packagePrices))return NextResponse.json({error:'Choose a valid package.'},{status:400});
    const name=cleanText(body.name,100),email=cleanText(body.email,180),phone=cleanText(body.phone,50),date=cleanText(body.date,20),time=cleanText(body.time,50),celebration=cleanText(body.celebration,100);
    const guests=Number(body.guests);const requestedAddons:string[]=Array.isArray(body.addons)?(body.addons as unknown[]).filter((item:unknown):item is string=>typeof item==='string'):[];
    if(!name||!email||!phone||!date||!time||!celebration||!Number.isInteger(guests)||guests<1||guests>100)return NextResponse.json({error:'Please complete the required booking details.'},{status:400});
    if(requestedAddons.some((name:string)=>!(name in addonPrices)))return NextResponse.json({error:'One of the selected add-ons is not available.'},{status:400});
    const addons=[...new Set(requestedAddons)];const addonTotal=addons.reduce((sum:number,name:string)=>sum+addonPrices[name],0);const price=packagePrices[packageId]+Math.max(0,guests-4)*100+addonTotal;
    const booking=createBooking({id:`KP-${randomUUID().slice(0,8).toUpperCase()}`,createdAt:new Date().toISOString(),status:'Pending',name,email,phone,date,time,celebration,theatre:'Jumbo Screen',packageId,pack:packageNames[packageId],guests,addons,food:cleanText(body.food,100),chocolates:body.chocolates===true,notes:cleanText(body.notes,1000),price});
    return NextResponse.json({booking},{status:201});
  }catch{return NextResponse.json({error:'Could not save this booking. Please try again.'},{status:400});}
}
