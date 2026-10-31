export const theatres = [
  {
    id: 'jumbo-screen',
    name: 'Jumbo Screen',
    location: 'Ask us for venue location details',
    includedGuests: 4,
    price: 500,
    image: 'photo-1511795409834-ef04bbd61622',
    tag: 'Private celebration space',
    features: [
      'Private Jumbo Screen experience',
      '4K screen with Dolby Atmos',
      'Access to all OTT platforms',
      'LED name display and decoration setup',
      'Packages for 45 minutes, 1, 2 or 3 hours',
    ],
    description: 'A private celebration space for birthdays, anniversaries, surprises and special get-togethers. Each package is priced for four people, with additional guests available for ₹100 per person.',
  },
];

export const celebrations = [
  'Birthday celebrations',
  "Kids' birthdays",
  'Baby showers',
  'Anniversaries',
  'Romantic surprises',
  'Marriage proposals',
  'Private screenings',
];

export const imageUrl = (id: string, w = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`;
