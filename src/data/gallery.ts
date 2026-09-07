export interface GalleryItem {
  id: string;
  image: string;
  title: string;
  category: string;
  location?: string;
  caption: string;
}

export const REAL_BRIDES: GalleryItem[] = [
  {
    id: 'rb-1',
    image: 'https://res.cloudinary.com/jkqplw35/image/upload/v1788791975/riti-riwaz/products/tb9cfzo2mpy1ith7uqan.png',
    title: 'The Crimson Wedding Ceremony',
    category: 'Real Bride',
    location: 'Narsinghpur',
    caption: 'Styled in our signature Royal Crimson Dabka Lehenga.'
  },
  {
    id: 'rb-2',
    image: 'https://res.cloudinary.com/jkqplw35/image/upload/v1788795989/riti-riwaz/products/kwf7ggg2uhvoyzg0qgmm.png',
    title: 'Velvet Elegance at Reception',
    category: 'Real Bride',
    location: 'Jabalpur',
    caption: 'Draped in custom maroon velvet ensemble.'
  },
  {
    id: 'rb-3',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=85&w=1000',
    title: 'Radiant Haldi Celebrations',
    category: 'Haldi Bride',
    location: 'Narsinghpur',
    caption: 'Sunkissed moments in marigold yellow gota patti dress.'
  },
  {
    id: 'rb-4',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=85&w=1000',
    title: 'Emerald Sangeet Night',
    category: 'Sangeet Look',
    location: 'Narsinghpur',
    caption: 'Dazzling performance in our side lehenga collection.'
  },
  {
    id: 'rb-5',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=85&w=1000',
    title: 'Pre-Wedding Trail Magic',
    category: 'Pre-Wedding',
    location: 'Bhedaghat',
    caption: 'Sweeping trail gown for romantic portrait shoots.'
  },
  {
    id: 'rb-6',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=85&w=1000',
    title: 'Imperial Kundan Styling',
    category: 'Jewellery',
    location: 'Narsinghpur',
    caption: 'Royal Kundan necklace set styling.'
  }
];

export const INSTAGRAM_POSTS: GalleryItem[] = [
  {
    id: 'ig-1',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=85&w=600',
    title: '@ritiriwazmp49',
    category: 'Instagram',
    caption: 'New bridal arrivals at our Narsinghpur store! Visit us or message for rental details. ✨ #RitiRiwaz #NarsinghpurBridal'
  },
  {
    id: 'ig-2',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=85&w=600',
    title: '@ritiriwazmp49',
    category: 'Instagram',
    caption: 'Handcrafted dabka and zardozi detailing on pure silk. Captured in motion. 💛 #IndianBridalWear #LehengaRental'
  },
  {
    id: 'ig-3',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=85&w=600',
    title: '@ritiriwazmp49',
    category: 'Instagram',
    caption: 'Haldi glow ready! Special rental packages available for pre-wedding functions. 🌼 #HaldiOutfits'
  },
  {
    id: 'ig-4',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=85&w=600',
    title: '@ritiriwazmp49',
    category: 'Instagram',
    caption: 'Pre-wedding trail gowns for rent in Narsinghpur. Make your shoots truly magical! 👑 #PreWeddingGown'
  }
];
