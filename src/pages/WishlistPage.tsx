import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { getWishlistWhatsAppUrl } from '../utils/whatsapp';
import { ProductCard } from '../components/ProductCard';
import { Heart, MessageCircle, Trash2, ArrowRight, Sparkles } from 'lucide-react';

export const WishlistPage: React.FC = () => {
  const { wishlist, clearWishlist, count } = useWishlist();

  if (count === 0) {
    return (
      <div className="bg-brand-dark min-h-screen text-white pt-28 pb-20 px-4 text-center">
        <div className="max-w-md mx-auto py-16 px-6 bg-brand-charcoal border border-brand-border rounded-sm space-y-4 shadow-luxury">
          <div className="w-12 h-12 rounded-full bg-brand-dark border border-brand-gold/40 flex items-center justify-center mx-auto text-brand-gold">
            <Heart className="w-6 h-6" />
          </div>
          <h1 className="font-serif text-3xl font-medium text-white">Your Saved Looks</h1>
          <p className="text-xs text-gray-400 font-sans leading-relaxed">
            Your saved looks will appear here. Browse our bridal and rental catalog to bookmark your favorite outfits.
          </p>
          <div className="pt-2">
            <Link
              to="/collections"
              className="inline-flex items-center space-x-2 py-3 px-6 bg-brand-gold text-brand-dark font-medium text-xs uppercase tracking-widest rounded-xs hover:bg-brand-goldLight transition-colors"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-brand-dark min-h-screen text-white pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-6 border-b border-brand-border/60 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-gold block mb-1">
              WISHLIST ({count})
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-medium tracking-tight text-white">
              Your Saved Looks
            </h1>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={clearWishlist}
              className="px-3 py-2 text-xs text-gray-400 hover:text-red-400 transition-colors inline-flex items-center space-x-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Wishlist</span>
            </button>

            <a
              href={getWishlistWhatsAppUrl(wishlist)}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-5 bg-brand-gold text-brand-dark font-medium text-xs uppercase tracking-widest rounded-xs hover:bg-brand-goldLight transition-colors flex items-center space-x-2 shadow-gold-glow"
            >
              <MessageCircle className="w-4 h-4 fill-brand-dark" />
              <span>Enquire About All Saved ({count})</span>
            </a>
          </div>
        </div>

        {/* Wishlist Items Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </div>
  );
};
