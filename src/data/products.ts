export interface Product {
  id: string;
  code: string;
  name: string;
  slug: string;
  category: string;
  subcategory?: string;
  occasion: string[];
  description: string;
  images: string[];
  sizes: string[];
  rentalAvailable: boolean;
  availabilityStatus: 'AVAILABLE' | 'CURRENTLY RENTED';
  featured?: boolean;
  tags: string[];
}

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    code: 'RR-BD-01',
    name: 'Royal Crimson Zardozi Bridal Lehenga',
    slug: 'royal-crimson-zardozi-bridal-lehenga',
    category: 'bridal',
    subcategory: 'Heavy Lehenga',
    occasion: ['Wedding', 'Main Ceremony'],
    description: 'A breathtaking royal crimson raw silk lehenga featuring opulent dabka, zardozi, and sequence hand-embroidery. Paired with a heavily embroidered blouse and dual net dupattas.',
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=85&w=1200',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=85&w=1200',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=85&w=1200'
    ],
    sizes: ['S', 'M', 'L', 'Custom Fitting Available'],
    rentalAvailable: true,
    availabilityStatus: 'AVAILABLE',
    featured: true,
    tags: ['Bridal', 'Velvet', 'Zardozi', 'Royal Red', 'Rental Ready']
  },
  {
    id: 'prod-2',
    code: 'RR-BD-02',
    name: 'Heritage Maroon Velvet Bridal Lehenga',
    slug: 'heritage-maroon-velvet-bridal-lehenga',
    category: 'bridal',
    subcategory: 'Velvet Lehenga',
    occasion: ['Wedding', 'Reception'],
    description: 'Deep royal maroon micro-velvet lehenga with intricate golden tilla embroidery, cutdana highlights, and handcrafted royal border detail.',
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=85&w=1200',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=85&w=1200'
    ],
    sizes: ['M', 'L', 'XL'],
    rentalAvailable: true,
    availabilityStatus: 'AVAILABLE',
    featured: true,
    tags: ['Bridal', 'Velvet', 'Deep Maroon', 'Rental Ready']
  },
  {
    id: 'prod-3',
    code: 'RR-SL-01',
    name: 'Emerald Blossom Sangeet Side Lehenga',
    slug: 'emerald-blossom-sangeet-side-lehenga',
    category: 'side-lehenga',
    subcategory: 'Lightweight Lehenga',
    occasion: ['Sangeet', 'Bridesmaid', 'Engagement'],
    description: 'Lush emerald green silk skirt with sequined botanical motifs, paired with an off-shoulder blouse and metallic dupatta.',
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=85&w=1200',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=85&w=1200'
    ],
    sizes: ['S', 'M', 'L'],
    rentalAvailable: true,
    availabilityStatus: 'AVAILABLE',
    featured: true,
    tags: ['Bridesmaid', 'Sangeet', 'Emerald Green', 'Rental Ready']
  },
  {
    id: 'prod-4',
    code: 'RR-HL-01',
    name: 'Sunny Marigold Floral Haldi Ensemble',
    slug: 'sunny-marigold-floral-haldi-ensemble',
    category: 'haldi',
    subcategory: 'Haldi Special',
    occasion: ['Haldi', 'Pooja Rituals'],
    description: 'Vibrant yellow georgette lehenga set accented with gota patti work and mirror embellishments, perfect for bright morning Haldi ceremonies.',
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=85&w=1200',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=85&w=1200'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    rentalAvailable: true,
    availabilityStatus: 'AVAILABLE',
    featured: true,
    tags: ['Haldi', 'Yellow', 'Gota Patti', 'Rental Ready']
  },
  {
    id: 'prod-5',
    code: 'RR-MH-01',
    name: 'Lime Green Mirror Work Mehndi Lehenga',
    slug: 'lime-green-mirror-work-mehndi-lehenga',
    category: 'mehndi',
    subcategory: 'Mehndi Special',
    occasion: ['Mehndi', 'Sangeet'],
    description: 'Refreshing lime green crepe lehenga with real mirror work and Resham embroidery for maximum comfort and radiance during Mehndi festivities.',
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=85&w=1200',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=85&w=1200'
    ],
    sizes: ['S', 'M', 'L'],
    rentalAvailable: true,
    availabilityStatus: 'AVAILABLE',
    featured: true,
    tags: ['Mehndi', 'Green', 'Mirror Work']
  },
  {
    id: 'prod-6',
    code: 'RR-PW-01',
    name: 'Midnight Sapphire Royal Trail Gown',
    slug: 'midnight-sapphire-royal-trail-gown',
    category: 'pre-wedding',
    subcategory: 'Trail Gown',
    occasion: ['Pre-Wedding Shoot', 'Cocktail', 'Reception'],
    description: 'An ethereal 3-meter sweeping trail gown in sapphire blue satin-organza with structured corset and subtle shimmer finish.',
    images: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=85&w=1200',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=85&w=1200'
    ],
    sizes: ['Free Size Adjustment', 'M', 'L'],
    rentalAvailable: true,
    availabilityStatus: 'AVAILABLE',
    featured: true,
    tags: ['Pre-Wedding', 'Trail Gown', 'Shoot Special', 'Rental Ready']
  },
  {
    id: 'prod-7',
    code: 'RR-JW-01',
    name: 'Imperial Kundan & Pearl Bridal Choker Set',
    slug: 'imperial-kundan-pearl-bridal-choker-set',
    category: 'jewellery',
    subcategory: 'Bridal Jewellery Set',
    occasion: ['Wedding', 'Reception'],
    description: 'Handcrafted Kundan choker set plated in 22k gold finish with freshwater pearl drops, matching earrings, maang tikka, and nath.',
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=85&w=1200'
    ],
    sizes: ['Adjustable Fit'],
    rentalAvailable: true,
    availabilityStatus: 'AVAILABLE',
    featured: true,
    tags: ['Jewellery', 'Kundan', 'Bridal Set', 'Rental Ready']
  },
  {
    id: 'prod-8',
    code: 'RR-MT-01',
    name: 'Blush Rose Satin Maternity Shoot Gown',
    slug: 'blush-rose-satin-maternity-shoot-gown',
    category: 'maternity',
    subcategory: 'Maternity Gown',
    occasion: ['Maternity Shoot', 'Baby Shower'],
    description: 'Ultra-soft flowing silk-satin gown with detachable shoulder cape, designed for comfort and captivating photography moments.',
    images: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=85&w=1200',
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=85&w=1200'
    ],
    sizes: ['Elasticated Comfort Fit (S-XL)'],
    rentalAvailable: true,
    availabilityStatus: 'AVAILABLE',
    featured: false,
    tags: ['Maternity', 'Pink', 'Shoot Special']
  },
  {
    id: 'prod-9',
    code: 'RR-WS-01',
    name: 'Champagne Gold Draped Fusion Gown',
    slug: 'champagne-gold-draped-fusion-gown',
    category: 'western',
    subcategory: 'Indo-Western',
    occasion: ['Cocktail', 'Reception', 'Engagement'],
    description: 'Sleek champagne gold shimmer gown with asymmetrical pre-draped shoulder pallu and metallic waist accents.',
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=85&w=1200'
    ],
    sizes: ['S', 'M', 'L'],
    rentalAvailable: true,
    availabilityStatus: 'CURRENTLY RENTED',
    featured: false,
    tags: ['Western', 'Cocktail', 'Champagne Gold']
  }
];
