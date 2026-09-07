import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Crown, Heart, Clock, MapPin, MessageCircle, ShieldCheck } from 'lucide-react';
import { SITE_CONFIG } from '../data/config';
import { ASSETS } from '../data/assets';
import { getGeneralContactWhatsAppUrl } from '../utils/whatsapp';

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-brand-dark min-h-screen text-white pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-gold block">
            ABOUT RITI RIWAZ
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-medium tracking-tight text-white">
            The Way of Capturing Untold Moments
          </h1>
          <p className="text-sm sm:text-base text-gray-300 font-sans font-light leading-relaxed">
            Narsinghpur’s destination boutique for bridal couture, statement lehengas, and designer occasion outfits available to own or rent.
          </p>
        </div>

        {/* 2-Column Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-white leading-tight">
              Crafting Memories for Life's Most Cherished Celebrations
            </h2>
            <p className="text-gray-300 font-sans text-sm sm:text-base font-light leading-relaxed">
              At Riti Riwaz, we believe that an outfit is never just fabric — it is the canvas of your most emotional moments. From your grand wedding vows to your Haldi, Mehndi, Sangeet, and pre-wedding shoots, we curate pieces that celebrate Indian heritage and modern fashion.
            </p>
            <p className="text-gray-300 font-sans text-sm sm:text-base font-light leading-relaxed">
              Recognizing that brides and wedding guests seek statement outfits without always wanting a permanent purchase, Riti Riwaz offers a specialized **Rental Collection**. Every rented garment undergoes rigorous dry-cleaning and custom boutique fitting so you feel radiant on your special day.
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-sm overflow-hidden border border-brand-gold/30 p-2 bg-brand-charcoal shadow-luxury">
              <img
                src={ASSETS.storeFront}
                alt="Riti Riwaz Bridal Collection"
                className="w-full aspect-[4/3] object-cover rounded-xs"
              />
            </div>
          </div>
        </div>

        {/* What We Offer Grid */}
        <div className="mb-20 pt-12 border-t border-brand-border/60">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-serif text-3xl font-medium text-white mb-2">
              What Riti Riwaz Offers
            </h2>
            <p className="text-xs text-gray-400 font-sans">
              Personalized styling services for brides, bridesmaids, and families.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-brand-charcoal p-6 rounded-sm border border-brand-border space-y-3">
              <Crown className="w-6 h-6 text-brand-gold" />
              <h3 className="font-serif text-xl font-medium text-white">Bridal Couture</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Opulent velvet, silk, and zardozi lehengas tailored for main wedding day ceremonies.
              </p>
            </div>

            <div className="bg-brand-charcoal p-6 rounded-sm border border-brand-border space-y-3">
              <Clock className="w-6 h-6 text-brand-gold" />
              <h3 className="font-serif text-xl font-medium text-white">Rental Collection</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Designer lehengas, trail gowns, and jewellery sets available on rental for upcoming events.
              </p>
            </div>

            <div className="bg-brand-charcoal p-6 rounded-sm border border-brand-border space-y-3">
              <Sparkles className="w-6 h-6 text-brand-gold" />
              <h3 className="font-serif text-xl font-medium text-white">Ritual Outfits</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Curated yellow, green, and pastel outfits for Haldi, Mehndi, Sangeet, and Maternity shoots.
              </p>
            </div>

            <div className="bg-brand-charcoal p-6 rounded-sm border border-brand-border space-y-3">
              <Heart className="w-6 h-6 text-brand-gold" />
              <h3 className="font-serif text-xl font-medium text-white">1-on-1 Assistance</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Direct in-person and WhatsApp styling advice to help select sizes, dupattas, and jewellery.
              </p>
            </div>
          </div>
        </div>

        {/* Location Box */}
        <div className="bg-brand-charcoal border border-brand-gold/40 rounded-sm p-8 text-center max-w-3xl mx-auto shadow-luxury space-y-4">
          <MapPin className="w-8 h-8 text-brand-gold mx-auto" />
          <h3 className="font-serif text-2xl font-medium text-white">
            Visit Riti Riwaz in Narsinghpur
          </h3>
          <p className="text-xs text-gray-300 font-sans max-w-md mx-auto">
            {SITE_CONFIG.location.address}
          </p>
          <a
            href={getGeneralContactWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 py-3 px-6 bg-brand-gold text-brand-dark font-medium text-xs uppercase tracking-widest rounded-xs hover:bg-brand-goldLight transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Connect with Boutique Team</span>
          </a>
        </div>

      </div>
    </div>
  );
};
