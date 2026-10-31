'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export function GlobalBackButton() {
  const pathname = usePathname();
  if (pathname === '/') return null;

  return <Link className="global-back-button" href="/" aria-label="Back to home" title="Back to home"><ArrowLeft size={16} aria-hidden="true"/></Link>;
}
