import React from 'react';
import { MessageCircle } from 'lucide-react';
import { getGeneralContactWhatsAppUrl } from '../utils/whatsapp';

export const StickyMobileCTA: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 md:hidden bg-brand-dark/95 backdrop-blur-md border-t border-brand-gold/40 p-3 shadow-luxury">
      <a
        href={getGeneralContactWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact Riti Riwaz on WhatsApp"
        className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-brand-gold text-brand-dark font-medium text-xs uppercase tracking-widest rounded-xs shadow-gold-glow active:scale-[0.98] transition-transform"
      >
        <MessageCircle className="w-4 h-4 fill-brand-dark" />
        <span>WhatsApp Boutique Consultation</span>
      </a>
    </div>
  );
};
