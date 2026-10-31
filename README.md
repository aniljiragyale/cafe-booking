# Kirik Party

A premium private theatre and celebration booking website built with Next.js, React, TypeScript, Tailwind CSS, Framer Motion and Lucide.

## Run locally

1. Install Node.js 20 or newer.
2. Run `npm install`.
3. Run `npm run dev` and open http://localhost:3000.

## Included

- Responsive home, theatres and theatre detail pages, celebration categories, packages, gallery, about and contact pages.
- One Jumbo Screen celebration space with the supplied 1-, 2- and 3-hour packages.
- Booking request form with live price summary, guest pricing and optional add-ons.
- Server-side booking and enquiry storage, plus an admin dashboard protected by a PIN.
- My bookings page with a local copy of requests created in that browser.
- Sign in / sign up UI shell, ready to connect to an authentication provider.

The venue photographs are illustrative Unsplash images. Venue address and direct contact channels have not been provided, so the site asks customers to enquire for location details and does not show invented contact information.

Booking requests and enquiries are written to `data/kirik-party-data.json` by the Node.js server. Admin access uses `KIRIK_ADMIN_PIN` from `.env.local`; the starter workspace includes a generated PIN. Keep `.env.local` and the data file private. This file store is suitable for a self-hosted Node.js server with persistent disk. For serverless hosting, replace it with a managed database because serverless disks can be temporary.

The optional **Custom celebration styling** add-on at ₹500 is a suggested offer. Confirm what that styling includes before publishing it as a fixed service.
