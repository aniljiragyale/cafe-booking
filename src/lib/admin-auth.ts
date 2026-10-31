import {timingSafeEqual} from 'node:crypto';
import type {NextRequest} from 'next/server';

export function hasAdminAccess(request:NextRequest){
  const expected=process.env.KIRIK_ADMIN_PIN;
  const received=request.headers.get('x-kirik-admin-pin')||'';
  if(!expected||!received)return false;
  const a=Buffer.from(expected);const b=Buffer.from(received);
  return a.length===b.length&&timingSafeEqual(a,b);
}
