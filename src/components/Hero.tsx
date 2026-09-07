import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, ChevronRight, Sparkles } from 'lucide-react';
import { SITE_CONFIG } from '../data/config';

export const Hero: React.FC = () => {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % SITE_CONFIG.hero.bgImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-dark">
      {/* Background Image Carousel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentBgIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 0.6, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.8, ease: 'easeOut' }}
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${SITE_CONFIG.hero.bgImages[currentBgIndex]}')`,
          }}
        />
      </AnimatePresence>

      {/* Radial Gradient overlay for high contrast editorial feel */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/50 to-brand-dark/70 z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-brand-dark/40 to-brand-dark z-10" />

      {/* Hero Content Box */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">

        {/* Brand Logo PNG */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center mb-6"
        >
          <img
            src="/FULL LOGO.png"
            alt="Riti Riwaz Logo"
            className="h-16 sm:h-20 md:h-24 w-auto object-contain drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]"
          />
        </motion.div> */}

        {/* Eyebrow Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-brand-dark/80 border border-brand-gold/40 text-brand-gold text-xs font-semibold uppercase tracking-[0.3em] mb-6 shadow-luxury"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{SITE_CONFIG.hero.eyebrow}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
          <span className="text-gray-300 font-normal">NARSINGHPUR</span>
        </motion.div>

        {/* Main Editorial Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight text-white leading-[1.1] mb-6 drop-shadow-lg"
        >
          Where Every Occasion <br className="hidden sm:inline" />
          <span className="italic font-normal text-gold-gradient">
            Becomes a Memory
          </span>
        </motion.h1>

        {/* Supporting Copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-gray-300 font-sans font-light leading-relaxed mb-10"
        >
          {SITE_CONFIG.hero.subtitle}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto"
        >
          <Link
            to="/collections"
            className="w-full sm:w-auto px-8 py-4 bg-brand-gold text-brand-dark font-medium text-xs sm:text-sm uppercase tracking-widest rounded-sm hover:bg-brand-goldLight transition-all duration-300 shadow-gold-glow flex items-center justify-center space-x-2 group"
          >
            <span>Explore Collection</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            to="/rentals"
            className="w-full sm:w-auto px-8 py-4 bg-brand-charcoal/90 border border-brand-gold/50 text-brand-gold font-medium text-xs sm:text-sm uppercase tracking-widest rounded-sm hover:border-brand-gold hover:bg-brand-dark transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <span>Explore Rentals</span>
          </Link>
        </motion.div>

      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center space-y-2 text-gray-400 text-[10px] uppercase tracking-widest"
      >
        <span>Scroll to Discover</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
        >
          <ArrowDown className="w-4 h-4 text-brand-gold" />
        </motion.div>
      </motion.div>
    </section>
  );
};
