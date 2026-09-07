import { SITE_CONFIG } from '../data/config';
import { Product } from '../data/products';

export interface RentalEnquiryData {
  productName: string;
  productCode?: string;
  customerName: string;
  phone: string;
  eventDate: string;
  preferredSize: string;
  occasion?: string;
  customMessage?: string;
  isRental?: boolean;
}

/**
 * Encodes text into a valid WhatsApp click-to-chat URL targeting +91 9131548602
 */
export const buildWhatsAppUrl = (message: string): string => {
  const encodedText = encodeURIComponent(message.trim());
  return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodedText}`;
};

/**
 * Builds standard product inquiry link
 */
export const getProductWhatsAppUrl = (product: Product, isRental: boolean = true): string => {
  const typeText = isRental ? 'rental availability & pricing' : 'pricing & purchase availability';
  const text = `Hello Riti Riwaz,

I am interested in the following look:
• Outfit: ${product.name} (Code: ${product.code})
• Category: ${product.category.toUpperCase()}

I would like to check ${typeText}.
• My Event Date: 
• Preferred Size: ${product.sizes[0] || 'Standard'}

Please share availability and consultation details.`;

  return buildWhatsAppUrl(text);
};

/**
 * Builds structured rental enquiry modal submission URL
 */
export const getStructuredEnquiryWhatsAppUrl = (data: RentalEnquiryData): string => {
  const text = `Hello Riti Riwaz,

I would like to check outfit availability for an upcoming occasion:

• Customer Name: ${data.customerName}
• Phone: ${data.phone}
• Outfit: ${data.productName}${data.productCode ? ` (${data.productCode})` : ''}
• Event Date: ${data.eventDate}
• Preferred Size: ${data.preferredSize}
${data.occasion ? `• Occasion: ${data.occasion}\n` : ''}${data.customMessage ? `• Notes: ${data.customMessage}\n` : ''}
Looking forward to your response!`;

  return buildWhatsAppUrl(text);
};

/**
 * Builds batch wishlist inquiry URL
 */
export const getWishlistWhatsAppUrl = (products: Product[]): string => {
  if (products.length === 0) return buildWhatsAppUrl('Hello Riti Riwaz, I would like to inquire about your bridal and occasion wear collection.');

  const productListStr = products.map((p, idx) => `${idx + 1}. ${p.name} [Code: ${p.code}]`).join('\n');

  const text = `Hello Riti Riwaz,

I have selected the following looks from your collection and would like to check availability and rental details:

${productListStr}

My Event Date: 
Preferred Sizes: 

Please guide me on availability and store consultation in Narsinghpur.`;

  return buildWhatsAppUrl(text);
};

/**
 * General contact inquiry link
 */
export const getGeneralContactWhatsAppUrl = (): string => {
  return buildWhatsAppUrl('Hello Riti Riwaz, I would like to book a personal bridal styling session / store visit in Narsinghpur.');
};
