export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  badge?: string;
  featured?: boolean;
}

export const CATEGORIES: Category[] = [
  {
    id: 'bridal',
    slug: 'bridal',
    name: 'Bridal Lehengas',
    description: 'Opulent crimson, maroon, and velvet hand-embroidered lehengas for your grand wedding day.',
    image: '/assets/Bridal Lehengas.png',
    featured: true,
    badge: 'Signature'
  },
  {
    id: 'side-lehenga',
    slug: 'side-lehenga',
    name: 'Side Lehengas',
    description: 'Elegantly detailed lehengas crafted for bridesmaids, sangeet, and family celebrations.',
    image: '/assets/side-lehenga.png',
    featured: true
  },
  {
    id: 'haldi',
    slug: 'haldi',
    name: 'Haldi Dresses',
    description: 'Vibrant yellow, marigold, and mustard ensembles adorned with floral and mirror details.',
    image: '/assets/Haldi Dresses.png',
    featured: true
  },
  {
    id: 'mehndi',
    slug: 'mehndi',
    name: 'Mehndi Dresses',
    description: 'Lush emerald greens, lime hues, and comfortable fluid silhouettes designed for joyous rituals.',
    image: '/assets/Mehndi Dresses.png',
    featured: true
  },
  {
    id: 'pre-wedding',
    slug: 'pre-wedding',
    name: 'Pre-Wedding Gowns',
    description: 'Sweeping trail gowns and romantic silhouettes for breathtaking photo shoots.',
    image: '/assets/Pre-Wedding Gowns.png',
    featured: true,
    badge: 'Popular for Shoot'
  },
  {
    id: 'jewellery',
    slug: 'jewellery',
    name: 'Bridal Jewellery',
    description: 'Kundan, Polki, and bridal choker sets curated to elevate your wedding look.',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=85&w=800',
    featured: true
  },
  {
    id: 'maternity',
    slug: 'maternity',
    name: 'Maternity Gowns',
    description: 'Graceful, high-waisted fluid gowns for memorable maternity celebrations.',
    image: '/assets/Maternity Gowns.png'
  },
  {
    id: 'western',
    slug: 'western',
    name: 'Western & Fusion',
    description: 'Cocktail gowns, Indo-western drapes, and chic evening dresses for receptions.',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=85&w=800'
  }
];
