import {NextRequest,NextResponse} from 'next/server';
import {hasAdminAccess} from '@/lib/admin-auth';
import {updateBooking} from '@/lib/server-store';

export const runtime='nodejs';
export const dynamic='force-dynamic';
export async function PATCH(request:NextRequest,{params}:{params:Promise<{id:string}>}){
  if(!hasAdminAccess(request))return NextResponse.json({error:'Admin PIN required.'},{status:401});
  const body=await request.json().catch(()=>({}));const status=body.status;
  if(status!=='Approved'&&status!=='Declined'&&status!=='Pending')return NextResponse.json({error:'Invalid booking status.'},{status:400});
  const{id}=await params;const booking=updateBooking(id,status);if(!booking)return NextResponse.json({error:'Booking not found.'},{status:404});
  return NextResponse.json({booking});
}
