import {NextRequest,NextResponse} from 'next/server';
import {randomUUID} from 'node:crypto';
import {hasAdminAccess} from '@/lib/admin-auth';
import {cleanText,createInquiry,listInquiries} from '@/lib/server-store';

export const runtime='nodejs';
export const dynamic='force-dynamic';
export async function GET(request:NextRequest){if(!hasAdminAccess(request))return NextResponse.json({error:'Admin PIN required.'},{status:401});return NextResponse.json({inquiries:listInquiries()});}
export async function POST(request:NextRequest){try{const body=await request.json();const name=cleanText(body.name,100),email=cleanText(body.email,180),phone=cleanText(body.phone,50),message=cleanText(body.message,1500);if(!name||!email||!phone||!message)return NextResponse.json({error:'Please complete the required enquiry details.'},{status:400});const inquiry=createInquiry({id:`KPI-${randomUUID().slice(0,8).toUpperCase()}`,createdAt:new Date().toISOString(),name,email,phone,occasion:cleanText(body.occasion,100),message});return NextResponse.json({inquiry},{status:201});}catch{return NextResponse.json({error:'Could not save this enquiry. Please try again.'},{status:400});}}
