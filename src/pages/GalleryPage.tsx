import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { REAL_BRIDES, INSTAGRAM_POSTS } from '../data/gallery';
import { Lightbox } from '../components/Lightbox';
import { Instagram, Camera, Sparkles } from 'lucide-react';
import { SITE_CONFIG } from '../data/config';

export const GalleryPage: React.FC = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <div className="bg-brand-dark min-h-screen text-white pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-brand-charcoal border border-brand-gold/40 rounded-full text-brand-gold text-[10px] font-bold uppercase tracking-widest">
            <Camera className="w-3.5 h-3.5" />
            <span>BRIDAL PORTFOLIO</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-medium tracking-tight text-white">
            Real Brides. Real Moments.
          </h1>

          <p className="text-sm sm:text-base text-gray-300 font-sans font-light leading-relaxed">
            Moments of joy, tradition, and timeless elegance captured across wedding ceremonies and pre-wedding celebrations.
          </p>
        </div>

        {/* Real Brides Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {REAL_BRIDES.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              onClick={() => setLightboxIndex(idx)}
              className="group relative aspect-[3/4] rounded-sm overflow-hidden border border-brand-border cursor-pointer bg-brand-charcoal shadow-luxury"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold block mb-1">
                  {item.category} • {item.location}
                </span>
                <h3 className="font-serif text-2xl font-medium text-white group-hover:text-gold-gradient transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-300 font-sans mt-1 line-clamp-2 font-light">
                  {item.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Instagram Feed Grid */}
        <div className="pt-12 border-t border-brand-border/60 text-center">
          <div className="inline-flex items-center space-x-2 text-brand-gold text-xs font-semibold uppercase tracking-[0.25em] mb-2">
            <Instagram className="w-4 h-4" />
            <span>@RITIRIWAZMP49</span>
          </div>
          <h2 className="font-serif text-3xl font-medium text-white mb-8">
            Follow Our Latest Stories
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {INSTAGRAM_POSTS.map((post) => (
              <a
                key={post.id}
                href={SITE_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square rounded-sm overflow-hidden border border-brand-border bg-brand-charcoal block"
              >
                <img
                  src={post.image}
                  alt={post.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                  <Instagram className="w-8 h-8 text-brand-gold" />
                </div>
              </a>
            ))}
          </div>
        </div>

      </div>

      {/* Lightbox Modal */}
      <Lightbox
        items={REAL_BRIDES}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(idx) => setLightboxIndex(idx)}
      />
    </div>
  );
};
