import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ChevronRight, Sparkles } from 'lucide-react';
import { Product } from '../data/products';
import { useProducts } from '../context/ProductContext';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const { products } = useProducts();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const results: Product[] = query.trim()
    ? products.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.code.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.occasion.some((o) => o.toLowerCase().includes(q)) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
        );
      })
    : [];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Search Box */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="relative bg-brand-dark border border-brand-gold/40 rounded-sm w-full max-w-2xl overflow-hidden shadow-2xl z-10"
        >
          {/* Search Input Bar */}
          <div className="p-4 border-b border-brand-border/60 flex items-center space-x-3 bg-brand-charcoal">
            <Search className="w-5 h-5 text-brand-gold shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by outfit name, code (RR-BD-01), occasion or category..."
              className="w-full bg-transparent text-sm text-white placeholder-gray-400 focus:outline-none"
            />
            {query && (
              <button onClick={() => setQuery('')} className="p-1 text-gray-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            )}
            <button onClick={onClose} className="p-1 text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Results List */}
          <div className="max-h-[60vh] overflow-y-auto p-4 space-y-3">
            {query.trim() === '' ? (
              <div className="py-8 text-center text-xs text-gray-400 space-y-2">
                <Sparkles className="w-5 h-5 text-brand-gold mx-auto" />
                <p>Try searching for <span className="text-brand-gold">"Bridal"</span>, <span className="text-brand-gold">"Haldi"</span>, <span className="text-brand-gold">"Velvet"</span>, or <span className="text-brand-gold">"Gowns"</span>.</p>
              </div>
            ) : results.length === 0 ? (
              <div className="py-8 text-center text-xs text-gray-400">
                No matching looks found for "<span className="text-white">{query}</span>".
              </div>
            ) : (
              results.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.slug}`}
                  onClick={onClose}
                  className="flex items-center space-x-4 p-2.5 rounded-sm hover:bg-brand-charcoal border border-transparent hover:border-brand-border transition-colors group"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-12 h-16 object-cover rounded-xs border border-brand-border"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 text-[10px] uppercase text-brand-gold font-mono">
                      <span>{product.code}</span>
                      <span>•</span>
                      <span>{product.category}</span>
                    </div>
                    <h4 className="font-serif text-sm font-medium text-white truncate group-hover:text-gold-gradient">
                      {product.name}
                    </h4>
                    <p className="text-xs text-gray-400 font-sans truncate">
                      {product.occasion.join(', ')}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-brand-gold group-hover:translate-x-1 transition-all" />
                </Link>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
