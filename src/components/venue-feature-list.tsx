'use client';

import { useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';

const details: Record<string, string> = {
  'Private Jumbo Screen experience': 'The room is reserved for your group during your booked time, so you can celebrate together in a private setting.',
  '4K screen with Dolby Atmos': 'Enjoy your chosen movie, photos or celebration video on the big screen with immersive Dolby Atmos sound.',
  'Access to all OTT platforms': 'Choose what you would like to watch from the available OTT apps during your private screening.',
  'LED name display and decoration setup': 'A celebration-ready decoration setup and LED name display are included in the 1-, 2- and 3-hour packages. The 45-minute special includes decoration setup plus cake cutting and 15 soft copies.',
  'Packages for 45 minutes, 1, 2 or 3 hours': 'The 45-minute special is ₹500 and includes cake cutting, decoration setup and 15 soft copies. Longer packages are ₹799 for 1 hour, ₹1,599 for 2 hours and ₹2,199 for 3 hours. These packages cover up to 4 people; extra guests are ₹100 each. The 1-hour package excludes cake, fog entry and DSLR photography. The 2- and 3-hour packages include a half-kilo cake, fog entry, HBD LED letters and DSLR photography with 30 soft copies.',
};

export function VenueFeatureList({ features }: { features: string[] }) {
  const [openFeature, setOpenFeature] = useState<string | null>(null);

  return <div className="venue-feature-grid">{features.map((feature, index) => {
    const isOpen = openFeature === feature;
    const detailId = `venue-feature-detail-${index}`;
    return <article className={`venue-feature-card${isOpen ? ' is-open' : ''}`} key={feature}>
      <button className="venue-feature-trigger" type="button" aria-expanded={isOpen} aria-controls={detailId} onClick={() => setOpenFeature(isOpen ? null : feature)}>
        <Check size={17} aria-hidden="true"/><span>{feature}</span><ChevronDown className="venue-feature-chevron" size={17} aria-hidden="true"/>
      </button>
      {isOpen && <p id={detailId} className="venue-feature-detail">{details[feature] ?? 'Ask the Kirik Party team for details about this feature when you request your booking.'}</p>}
    </article>;
  })}</div>;
}
