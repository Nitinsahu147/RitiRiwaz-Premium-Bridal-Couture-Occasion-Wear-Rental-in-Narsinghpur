import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle, Eye, Sparkles, Clock } from 'lucide-react';
import { Product } from '../data/products';
import { useWishlist } from '../context/WishlistContext';
import { getProductWhatsAppUrl } from '../utils/whatsapp';

interface ProductCardProps {
  product: Product;
  onOpenRentalModal?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenRentalModal }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const isSaved = isInWishlist(product.id);

  const isRented = product.availabilityStatus === 'CURRENTLY RENTED';

  return (
    <div className="group relative bg-brand-charcoal border border-brand-border/80 hover:border-brand-gold/60 rounded-sm overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-luxury h-full">
      
      {/* Top Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-brand-dark">
        {/* Main Product Image */}
        <Link to={`/product/${product.slug}`} className="block w-full h-full">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-95 group-hover:brightness-100"
            loading="lazy"
          />
        </Link>

        {/* Top Badges Header */}
        <div className="absolute top-2 sm:top-3 left-2 sm:left-3 right-2 sm:right-3 flex items-center justify-between z-10 pointer-events-none">
          {/* Availability & Rental Status Badge */}
          {isRented ? (
            <div className="py-0.5 sm:py-1 px-1.5 sm:px-2.5 bg-amber-950/90 backdrop-blur-md border border-amber-500/60 text-amber-300 text-[8px] sm:text-[9px] font-bold uppercase tracking-wider rounded-xs flex items-center space-x-1 shadow-md max-w-[calc(100%-36px)] truncate">
              <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-400 shrink-0" />
              <span className="sm:hidden">RENTED</span>
              <span className="hidden sm:inline">Currently Rented</span>
            </div>
          ) : product.rentalAvailable ? (
            <div className="py-0.5 sm:py-1 px-1.5 sm:px-2.5 bg-brand-dark/90 backdrop-blur-md border border-brand-gold/50 text-brand-gold text-[8px] sm:text-[9px] font-bold uppercase tracking-wider rounded-xs flex items-center space-x-1 shadow-md max-w-[calc(100%-36px)] truncate">
              <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-brand-gold shrink-0" />
              <span className="sm:hidden">RENTAL</span>
              <span className="hidden sm:inline">Available on Rent</span>
            </div>
          ) : (
            <div className="py-0.5 sm:py-1 px-1.5 sm:px-2.5 bg-gray-900/90 backdrop-blur-md border border-gray-700 text-gray-300 text-[8px] sm:text-[9px] font-bold uppercase tracking-wider rounded-xs flex items-center space-x-1 shadow-md max-w-[calc(100%-36px)] truncate">
              <span className="sm:hidden">SALE</span>
              <span className="hidden sm:inline">Sale Only</span>
            </div>
          )}

          {/* Wishlist Heart Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(product);
            }}
            className={`pointer-events-auto w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all shrink-0 ${
              isSaved
                ? 'bg-brand-gold text-brand-dark shadow-md'
                : 'bg-brand-dark/80 backdrop-blur-md text-white hover:text-brand-gold border border-white/10'
            }`}
            aria-label={isSaved ? 'Remove from Wishlist' : 'Add to Wishlist'}
            title={isSaved ? 'Saved in Wishlist' : 'Save to Wishlist'}
          >
            <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isSaved ? 'fill-brand-dark' : ''}`} />
          </button>
        </div>

        {/* Quick Action Overlay (Desktop & Touch) */}
        <div className="absolute inset-x-0 bottom-0 p-2 sm:p-4 bg-gradient-to-t from-brand-dark via-brand-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-1.5 sm:space-x-2 z-10">
          <Link
            to={`/product/${product.slug}`}
            className="flex-1 py-1.5 sm:py-2 px-2 sm:px-3 bg-brand-dark/90 border border-brand-gold/60 text-brand-gold hover:bg-brand-gold hover:text-brand-dark text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-center rounded-xs transition-colors flex items-center justify-center space-x-1 whitespace-nowrap"
          >
            <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
            <span>View Look</span>
          </Link>

          <a
            href={getProductWhatsAppUrl(product, true)}
            target="_blank"
            rel="noopener noreferrer"
            className="py-1.5 sm:py-2 px-2.5 sm:px-3 bg-brand-gold text-brand-dark hover:bg-brand-goldLight text-[10px] sm:text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors flex items-center justify-center shrink-0"
            title="Enquire on WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Bottom Content Container */}
      <div className="p-3 sm:p-4 flex flex-col justify-between flex-grow space-y-2.5 sm:space-y-3">
        <div>
          {/* Category & Code */}
          <div className="flex items-center justify-between text-[8px] sm:text-[10px] uppercase tracking-widest text-brand-gold mb-1">
            <span className="truncate max-w-[90px] sm:max-w-none">{product.category.replace('-', ' ')}</span>
            <span className="text-gray-400 font-mono shrink-0">{product.code}</span>
          </div>

          {/* Product Name */}
          <Link to={`/product/${product.slug}`}>
            <h3 className="font-serif text-sm sm:text-lg font-medium text-white group-hover:text-gold-gradient transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>

          {/* Occasion Tags */}
          <div className="flex flex-wrap gap-1 sm:gap-1.5 mt-1.5 sm:mt-2">
            {product.occasion.slice(0, 2).map((occ) => (
              <span
                key={occ}
                className="text-[8px] sm:text-[9px] px-1.5 sm:px-2 py-0.5 bg-brand-dark text-gray-300 rounded-xs border border-brand-border"
              >
                {occ}
              </span>
            ))}
          </div>
        </div>

        {/* Price & Availability Responsive Footer */}
        <div className="pt-2 sm:pt-3 border-t border-brand-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-1">
          <div className="flex items-baseline justify-between sm:flex-col">
            <span className="text-[8px] sm:text-[9px] uppercase tracking-widest text-gray-400">
              AVAILABILITY
            </span>
            <span className={`font-serif text-xs sm:text-sm font-medium ${isRented ? 'text-amber-400' : 'text-brand-gold'}`}>
              {isRented ? 'Rented Out' : 'Enquire'}
            </span>
          </div>

          <button
            onClick={() => onOpenRentalModal ? onOpenRentalModal(product) : window.open(getProductWhatsAppUrl(product, true), '_blank')}
            className={`w-full sm:w-auto py-1.5 px-2 sm:px-3 border text-[10px] sm:text-xs font-semibold uppercase tracking-wider transition-colors rounded-xs text-center ${
              isRented 
                ? 'bg-amber-950/40 border-amber-500/50 text-amber-300 hover:bg-amber-500 hover:text-brand-dark' 
                : 'bg-brand-dark border-brand-gold/60 text-brand-gold hover:bg-brand-gold hover:text-brand-dark'
            }`}
          >
            {isRented ? 'Check Dates' : 'Check Availability'}
          </button>
        </div>

      </div>

    </div>
  );
};
