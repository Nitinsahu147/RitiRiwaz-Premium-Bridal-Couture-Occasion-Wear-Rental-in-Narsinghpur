import { ASSETS } from './assets';

export const SITE_CONFIG = {
  name: 'Riti Riwaz',
  tagline: 'The Way of Capturing Untold Moments',
  whatsappNumber: '919131548602',
  whatsappDisplay: '+91 9131548602',
  instagram: '@ritiriwazmp49',
  instagramUrl: 'https://instagram.com/ritiriwazmp49',
  location: {
    city: 'Narsinghpur',
    state: 'Madhya Pradesh',
    country: 'India',
    address: 'Riti Riwaz, Itwara Bazaar, Near ICICI Bank, Narsinghpur, Madhya Pradesh 487001',
    googleMapsDirectionsUrl: 'https://maps.app.goo.gl/E9ZsotrndKy751Wu6',
  },
  openingHours: 'Monday - Saturday: 10:30 AM - 8:30 PM (Sunday by Appointment)',
  hero: {
    title: 'Where Every Occasion Becomes a Memory',
    subtitle: 'Bridal couture, statement lehengas and occasion wear — available to own or rent.',
    eyebrow: 'RITI RIWAZ',
    bgImages: ASSETS.heroBgs
  },
  benefits: [
    {
      id: 'curated',
      title: 'Curated Collections',
      description: 'Thoughtfully selected, handcrafted looks for life\'s most cherished celebrations.',
      icon: 'Crown'
    },
    {
      id: 'rentals',
      title: 'Available on Rent',
      description: 'Wear statement designer outfits for your special days without full purchase commitments.',
      icon: 'RefreshCw'
    },
    {
      id: 'occasions',
      title: 'Multiple Occasions',
      description: 'Comprehensive styling for Wedding, Haldi, Mehndi, Reception, Pre-Wedding & Maternity.',
      icon: 'Sparkles'
    },
    {
      id: 'assistance',
      title: 'Personal Styling Assistance',
      description: 'Direct 1-on-1 assistance for custom fitting, outfit selection, and availability.',
      icon: 'MessageCircle'
    }
  ]
};
