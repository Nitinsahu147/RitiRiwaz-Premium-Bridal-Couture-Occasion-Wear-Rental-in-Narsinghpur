import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Crown, Clock } from 'lucide-react';
import { SITE_CONFIG } from '../data/config';
import { ASSETS } from '../data/assets';

export const BrandIntro: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-brand-dark text-white relative overflow-hidden border-t border-brand-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Column: Typography */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center space-x-2 text-brand-gold text-xs font-semibold uppercase tracking-[0.25em]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE RITI RIWAZ EXPERIENCE</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-medium tracking-tight text-white leading-tight">
              More Than An Outfit. <br />
              <span className="italic text-gold-gradient">It’s Your Moment.</span>
            </h2>

            <p className="text-gray-300 font-sans text-base sm:text-lg leading-relaxed font-light">
              Located in the heart of Narsinghpur, Riti Riwaz is built on the philosophy that every milestone celebration deserves an unforgettable ensemble. Whether preparing for your grand wedding day, Sangeet, Haldi, or a pre-wedding shoot, our boutique brings you handcrafted bridal lehengas, occasion wear, and accessories — available both for direct purchase and premium rental.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-brand-border/60">
              <div className="space-y-1">
                <Crown className="w-5 h-5 text-brand-gold mb-2" />
                <h3 className="font-serif text-lg font-medium text-white">Bridal Couture</h3>
                <p className="text-xs text-gray-400">Intricate dabka, zardozi & silk lehengas.</p>
              </div>

              <div className="space-y-1">
                <Clock className="w-5 h-5 text-brand-gold mb-2" />
                <h3 className="font-serif text-lg font-medium text-white">Rental Service</h3>
                <p className="text-xs text-gray-400">Designer outfits tailored without heavy commitment.</p>
              </div>

              <div className="space-y-1">
                <Heart className="w-5 h-5 text-brand-gold mb-2" />
                <h3 className="font-serif text-lg font-medium text-white">Personal Styling</h3>
                <p className="text-xs text-gray-400">1-on-1 assistance for custom fittings and look pairing.</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Editorial Visual Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="relative rounded-sm overflow-hidden border border-brand-gold/30 p-2 bg-brand-charcoal shadow-luxury group">
              <div className="relative aspect-[3.5/5] overflow-hidden rounded-sm">
                <img
                  src={ASSETS.storeFront}
                  alt="Riti Riwaz Bridal Experience"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent opacity-90" />

                {/* Floating Tag */}
                {/* <div className="absolute bottom-6 left-6 right-6 p-4 bg-brand-dark/90 backdrop-blur-md border border-brand-gold/40 rounded-sm">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold block mb-1">
                    BOUTIQUE LOCATION
                  </span>
                  <p className="font-serif text-lg text-white font-medium">
                    Narsinghpur, Madhya Pradesh
                  </p>
                  <p className="text-xs text-gray-300 font-sans mt-0.5">
                    Visit us for custom trials & rental consultations.
                  </p>
                </div> */}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
