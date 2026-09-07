import React from 'react';
import { motion } from 'framer-motion';
import { Product } from '../data/products';
import { ProductCard } from './ProductCard';
import { Sparkles, RefreshCw } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  onOpenRentalModal?: (product: Product) => void;
  onResetFilters?: () => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  isLoading = false,
  onOpenRentalModal,
  onResetFilters,
}) => {
  // Skeleton Loader State
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {Array.from({ length: 8 }).map((_, idx) => (
          <div key={idx} className="bg-brand-charcoal border border-brand-border rounded-sm p-3 animate-pulse">
            <div className="aspect-[3/4] bg-brand-dark rounded-sm mb-4" />
            <div className="h-3 bg-brand-dark rounded w-1/3 mb-2" />
            <div className="h-5 bg-brand-dark rounded w-3/4 mb-3" />
            <div className="h-4 bg-brand-dark rounded w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  // Empty State (#38 & #60)
  if (products.length === 0) {
    return (
      <div className="py-16 px-4 text-center bg-brand-charcoal border border-brand-border rounded-sm max-w-xl mx-auto my-8 space-y-4">
        <div className="w-12 h-12 rounded-full bg-brand-dark border border-brand-gold/40 flex items-center justify-center mx-auto text-brand-gold">
          <Sparkles className="w-6 h-6" />
        </div>
        <h3 className="font-serif text-2xl font-medium text-white">
          No Looks Found
        </h3>
        <p className="text-sm text-gray-400 font-sans max-w-sm mx-auto">
          We couldn't find any outfits matching your selected category or filters. Try adjusting your selections or contact us directly on WhatsApp.
        </p>
        {onResetFilters && (
          <div className="pt-2">
            <button
              onClick={onResetFilters}
              className="inline-flex items-center space-x-2 py-2 px-5 bg-brand-gold text-brand-dark font-medium text-xs uppercase tracking-wider rounded-xs hover:bg-brand-goldLight transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {products.map((product, idx) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: idx * 0.05 }}
        >
          <ProductCard product={product} onOpenRentalModal={onOpenRentalModal} />
        </motion.div>
      ))}
    </div>
  );
};
