import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { GalleryItem } from '../data/gallery';

interface LightboxProps {
  items: GalleryItem[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  items,
  currentIndex,
  onClose,
  onNavigate,
}) => {
  if (currentIndex === null || !items[currentIndex]) return null;

  const currentItem = items[currentIndex];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    onNavigate((currentIndex - 1 + items.length) % items.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    onNavigate((currentIndex + 1) % items.length);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-10 p-3 text-white hover:text-brand-gold transition-colors bg-brand-dark/50 rounded-full border border-white/10"
          aria-label="Close Lightbox"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Previous Button */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 text-white hover:text-brand-gold transition-colors bg-brand-dark/50 rounded-full border border-white/10 hidden sm:flex items-center justify-center"
          aria-label="Previous Image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 text-white hover:text-brand-gold transition-colors bg-brand-dark/50 rounded-full border border-white/10 hidden sm:flex items-center justify-center"
          aria-label="Next Image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Main Content Box */}
        <motion.div
          key={currentItem.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative max-w-4xl max-h-[85vh] flex flex-col md:flex-row bg-brand-dark border border-brand-gold/30 rounded-sm overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Image */}
          <div className="flex-1 bg-black flex items-center justify-center overflow-hidden min-h-[300px] md:min-h-[500px]">
            <img
              src={currentItem.image}
              alt={currentItem.title}
              className="max-h-[75vh] w-auto object-contain"
            />
          </div>

          {/* Sidebar Information */}
          <div className="w-full md:w-80 p-6 flex flex-col justify-between border-t md:border-t-0 md:border-l border-brand-border/60 bg-brand-charcoal">
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold block mb-1">
                  {currentItem.category}
                </span>
                <h3 className="font-serif text-2xl font-medium text-white">
                  {currentItem.title}
                </h3>
              </div>

              {currentItem.location && (
                <div className="flex items-center space-x-1.5 text-xs text-gray-400">
                  <MapPin className="w-3.5 h-3.5 text-brand-gold" />
                  <span>{currentItem.location}</span>
                </div>
              )}

              <p className="text-xs text-gray-300 font-sans leading-relaxed">
                {currentItem.caption}
              </p>
            </div>

            <div className="pt-6 border-t border-brand-border/60 flex items-center justify-between text-xs text-gray-400">
              <span>{currentIndex + 1} of {items.length}</span>
              <div className="flex items-center space-x-2 sm:hidden">
                <button onClick={handlePrev} className="px-2 py-1 bg-brand-dark border border-brand-border rounded">Prev</button>
                <button onClick={handleNext} className="px-2 py-1 bg-brand-dark border border-brand-border rounded">Next</button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
