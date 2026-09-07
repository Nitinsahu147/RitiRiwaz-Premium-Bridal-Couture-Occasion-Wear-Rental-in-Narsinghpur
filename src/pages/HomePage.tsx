import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, MessageCircle, RefreshCw, Crown, MapPin, Instagram, Eye } from 'lucide-react';
import { Hero } from '../components/Hero';
import { BrandIntro } from '../components/BrandIntro';
import { FindYourLook } from '../components/FindYourLook';
import { ProductGrid } from '../components/ProductGrid';
import { RentalEnquiryModal } from '../components/RentalEnquiryModal';
import { Lightbox } from '../components/Lightbox';
import { Product } from '../data/products';
import { useProducts } from '../context/ProductContext';
import { REAL_BRIDES, INSTAGRAM_POSTS } from '../data/gallery';
import { SITE_CONFIG } from '../data/config';
import { getGeneralContactWhatsAppUrl } from '../utils/whatsapp';

export const HomePage: React.FC = () => {
  const { products } = useProducts();
  const [selectedRentalProduct, setSelectedRentalProduct] = useState<Product | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const featuredProducts = products.filter((p) => p.featured).slice(0, 8);
  const rentalProducts = products.filter((p) => p.rentalAvailable).slice(0, 4);

  return (
    <div className="bg-brand-dark min-h-screen text-white">
      {/* 1. HERO SECTION */}
      <Hero />

      {/* 2. BRAND INTRO */}
      <BrandIntro />

      {/* 3. FIND YOUR LOOK (ASYMMETRIC GRID) */}
      <FindYourLook />

      {/* 4. FEATURED COLLECTION SHOWCASE */}
      <section className="py-20 bg-brand-dark relative border-t border-brand-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-gold block mb-2">
                EDITORIAL HIGHLIGHTS
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight text-white">
                Featured Collection
              </h2>
            </div>
            <Link
              to="/collections"
              className="inline-flex items-center space-x-2 text-xs font-medium uppercase tracking-widest text-brand-gold hover:underline mt-4 sm:mt-0"
            >
              <span>Explore All Outfits</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <ProductGrid
            products={featuredProducts}
            onOpenRentalModal={(p) => setSelectedRentalProduct(p)}
          />
        </div>
      </section>

      {/* 5. RENTAL EXPERIENCE SECTION ("THE RENTAL EDIT") */}
      <section className="py-20 bg-brand-charcoal relative border-t border-brand-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-brand-dark via-brand-charcoal to-brand-dark border border-brand-gold/40 rounded-sm p-8 sm:p-12 mb-12 shadow-luxury flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl space-y-4">
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-brand-dark border border-brand-gold/40 rounded-full text-brand-gold text-[10px] font-bold uppercase tracking-widest">
                <RefreshCw className="w-3.5 h-3.5" />
                <span>BOUTIQUE RENTAL SERVICE</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl font-medium text-white">
                The Rental Edit
              </h2>
              <p className="text-gray-300 text-sm sm:text-base font-sans font-light leading-relaxed">
                Your dream bridal look, without the commitment of full purchase. Wear handcrafted designer lehengas and trail gowns for your special days in Narsinghpur.
              </p>
            </div>
            
            <Link
              to="/rentals"
              className="px-8 py-4 bg-brand-gold text-brand-dark font-medium text-xs uppercase tracking-widest rounded-sm hover:bg-brand-goldLight transition-colors whitespace-nowrap shadow-gold-glow"
            >
              Browse Rental Outfits
            </Link>
          </div>

          <ProductGrid
            products={rentalProducts}
            onOpenRentalModal={(p) => setSelectedRentalProduct(p)}
          />
        </div>
      </section>

      {/* 6. REAL BRIDES. REAL MOMENTS. */}
      <section className="py-20 bg-brand-dark border-t border-brand-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-gold block mb-2">
              CELEBRATION GALLERY
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight text-white mb-4">
              Real Brides. Real Moments.
            </h2>
            <p className="text-sm text-gray-300 font-sans font-light">
              Moments of joy, heritage, and elegance captured in Riti Riwaz couture.
            </p>
          </div>

          {/* Masonry / Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {REAL_BRIDES.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onClick={() => setLightboxIndex(idx)}
                className="group relative aspect-[4/5] rounded-sm overflow-hidden border border-brand-border cursor-pointer bg-brand-charcoal"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold block mb-1">
                    {item.category} • {item.location}
                  </span>
                  <h3 className="font-serif text-xl font-medium text-white group-hover:text-gold-gradient transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-300 font-sans mt-1 line-clamp-1">
                    {item.caption}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. WHY RITI RIWAZ BENEFIT BLOCKS (#31) */}
      <section className="py-20 bg-brand-charcoal border-t border-brand-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-gold block mb-2">
              WHY CHOOSE US
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight text-white">
              The Boutique Advantage
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {SITE_CONFIG.benefits.map((benefit, idx) => (
              <motion.div
                key={benefit.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-brand-dark p-8 rounded-sm border border-brand-border/80 hover:border-brand-gold/60 transition-all duration-300 space-y-4"
              >
                <div className="w-12 h-12 rounded-full bg-brand-charcoal border border-brand-gold/40 flex items-center justify-center text-brand-gold">
                  <Crown className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-medium text-white">
                  {benefit.title}
                </h3>
                <p className="text-xs text-gray-400 font-sans leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. INSTAGRAM SECTION (#27) */}
      <section className="py-20 bg-brand-dark border-t border-brand-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 text-brand-gold text-xs font-semibold uppercase tracking-[0.25em] mb-2">
            <Instagram className="w-4 h-4" />
            <span>INSTAGRAM SHOWCASE</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight text-white mb-8">
            Follow the Riti Riwaz Story
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
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

          <a
            href={SITE_CONFIG.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 py-3 px-6 bg-brand-charcoal border border-brand-gold/40 text-brand-gold font-medium text-xs uppercase tracking-widest rounded-xs hover:bg-brand-gold hover:text-brand-dark transition-all duration-300"
          >
            <Instagram className="w-4 h-4" />
            <span>Follow @ritiriwazmp49</span>
          </a>
        </div>
      </section>

      {/* 9. FINAL CINEMATIC CTA (#32) */}
      <section className="py-24 bg-gradient-to-b from-brand-charcoal to-brand-dark border-t border-brand-border/60 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-brand-gold block">
            YOUR MEMORY BEGINS HERE
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl font-medium tracking-tight text-white leading-tight">
            Your Perfect Look Is Waiting.
          </h2>
          <p className="text-gray-300 font-sans text-base sm:text-lg max-w-xl mx-auto font-light">
            Explore our curated bridal and occasion wear collection online, or speak directly with our styling team in Narsinghpur.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/collections"
              className="w-full sm:w-auto px-8 py-4 bg-brand-gold text-brand-dark font-medium text-xs uppercase tracking-widest rounded-xs hover:bg-brand-goldLight transition-colors shadow-gold-glow"
            >
              Explore Collection
            </Link>

            <a
              href={getGeneralContactWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-brand-dark border border-brand-gold/60 text-brand-gold font-medium text-xs uppercase tracking-widest rounded-xs hover:bg-brand-gold hover:text-brand-dark transition-all flex items-center justify-center space-x-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </section>

      {/* Rental Enquiry Modal */}
      <RentalEnquiryModal
        product={selectedRentalProduct}
        isOpen={!!selectedRentalProduct}
        onClose={() => setSelectedRentalProduct(null)}
      />

      {/* Lightbox for Real Brides */}
      <Lightbox
        items={REAL_BRIDES}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(idx) => setLightboxIndex(idx)}
      />
    </div>
  );
};
