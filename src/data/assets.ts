/**
 * Centralized Static Permanent Assets Registry for Riti Riwaz Boutique
 * Stores image paths and references for logos, storefront photos, and background images.
 */

export const ASSETS = {
  // Brand Logos
  logo: '/assets/logo.png',
  fullLogo: '/assets/full-logo.png',

  // Store Front & Showcase Photos
  storeFront: '/assets/store-front.png',

  // Hero Background Carousel Images
  heroBgs: [
    '/assets/BG1.heic',
    '/assets/BG3.jpg',
    '/assets/BG2.jpg'
  ],

  // Fallback / Placeholder Image
  placeholder: '/assets/store-front.png',
} as const;

export default ASSETS;
