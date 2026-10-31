import 'server-only';
import fs from 'node:fs';
import path from 'node:path';

export type BookingRecord = {
  id:string; createdAt:string; status:'Pending'|'Approved'|'Declined';
  name:string; email:string; phone:string; date:string; time:string; celebration:string;
  theatre:'Jumbo Screen'; pack:string; packageId:string; guests:number; addons:string[];
  food:string; chocolates:boolean; notes:string; price:number;
};
export type InquiryRecord = {
  id:string; createdAt:string; name:string; email:string; phone:string;
  occasion:string; message:string;
};
type Store={bookings:BookingRecord[];inquiries:InquiryRecord[]};

const filePath=process.env.KIRIK_DATA_FILE||path.join(process.cwd(),'data','kirik-party-data.json');
function readStore():Store{
  fs.mkdirSync(path.dirname(filePath),{recursive:true});
  if(!fs.existsSync(filePath))fs.writeFileSync(filePath,JSON.stringify({bookings:[],inquiries:[]},null,2),'utf8');
  try{const value=JSON.parse(fs.readFileSync(filePath,'utf8'));return{bookings:Array.isArray(value.bookings)?value.bookings:[],inquiries:Array.isArray(value.inquiries)?value.inquiries:[]};}
  catch{return{bookings:[],inquiries:[]};}
}
function writeStore(store:Store){
  fs.mkdirSync(path.dirname(filePath),{recursive:true});
  const temp=`${filePath}.${process.pid}.tmp`;
  fs.writeFileSync(temp,JSON.stringify(store,null,2),'utf8');
  fs.renameSync(temp,filePath);
}
export function listBookings(){return readStore().bookings.sort((a,b)=>b.createdAt.localeCompare(a.createdAt));}
export function createBooking(record:BookingRecord){const store=readStore();store.bookings.unshift(record);writeStore(store);return record;}
export function updateBooking(id:string,status:BookingRecord['status']){const store=readStore();const booking=store.bookings.find(item=>item.id===id);if(!booking)return null;booking.status=status;writeStore(store);return booking;}
export function listInquiries(){return readStore().inquiries.sort((a,b)=>b.createdAt.localeCompare(a.createdAt));}
export function createInquiry(record:InquiryRecord){const store=readStore();store.inquiries.unshift(record);writeStore(store);return record;}

export function cleanText(value:unknown,max=500){return typeof value==='string'?value.trim().slice(0,max):'';}
