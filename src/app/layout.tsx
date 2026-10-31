import type { Metadata } from "next";
import "./globals.css";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = { title: "Kirik Party | Your private celebration, reimagined", description: "Book a private theatre for birthdays, date nights and all your once-in-a-while moments.", icons: { icon: "/images/kirik-party-logo.png", apple: "/images/kirik-party-logo.png" } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body><SiteShell>{children}</SiteShell></body></html>; }
