import React, { useState } from 'react';
import { Product } from '../data/products';
import { useProducts } from '../context/ProductContext';
import { ProductGrid } from '../components/ProductGrid';
import { RentalEnquiryModal } from '../components/RentalEnquiryModal';
import { RefreshCw, Sparkles, ShieldCheck, Clock, MapPin } from 'lucide-react';
import { SITE_CONFIG } from '../data/config';

export const RentalsPage: React.FC = () => {
  const { products } = useProducts();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedRentalProduct, setSelectedRentalProduct] = useState<Product | null>(null);

  const rentalProducts = products.filter((p) => {
    if (!p.rentalAvailable) return false;
    if (activeCategory !== 'all' && p.category !== activeCategory) return false;
    return true;
  });

  const categories = [
    { label: 'All Rental Outfits', slug: 'all' },
    { label: 'Bridal Lehengas', slug: 'bridal' },
    { label: 'Side Lehengas', slug: 'side-lehenga' },
    { label: 'Haldi & Mehndi', slug: 'haldi' },
    { label: 'Pre-Wedding Gowns', slug: 'pre-wedding' },
    { label: 'Bridal Jewellery', slug: 'jewellery' },
  ];

  return (
    <div className="bg-brand-dark min-h-screen text-white pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Banner */}
        <div className="bg-gradient-to-r from-brand-charcoal via-brand-dark to-brand-charcoal border border-brand-gold/40 rounded-sm p-8 sm:p-12 mb-12 text-center max-w-4xl mx-auto shadow-luxury space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-brand-dark border border-brand-gold/40 rounded-full text-brand-gold text-[10px] font-bold uppercase tracking-widest mx-auto">
            <RefreshCw className="w-3.5 h-3.5" />
            <span>RENTAL BOUTIQUE</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-medium tracking-tight text-white">
            The Rental Edit
          </h1>

          <p className="text-sm sm:text-base text-gray-300 font-sans font-light max-w-xl mx-auto leading-relaxed">
            Your dream look, without the commitment of a purchase. Select statement bridal and occasion outfits, verify dates, and collect tailored looks in Narsinghpur.
          </p>

          {/* Key Advantages */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-brand-border/60 text-left">
            <div className="flex items-start space-x-2">
              <ShieldCheck className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-semibold text-white uppercase">Hygienic & Sanitized</h4>
                <p className="text-[11px] text-gray-400">Dry-cleaned and pressed prior to every trial.</p>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <Clock className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-semibold text-white uppercase">Flexible Rental Duration</h4>
                <p className="text-[11px] text-gray-400">Flexible 3-day to 7-day event rental periods.</p>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <MapPin className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-semibold text-white uppercase">In-Store Trial</h4>
                <p className="text-[11px] text-gray-400">Fitting & blouse adjustment at our boutique.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setActiveCategory(cat.slug)}
              className={`py-2 px-5 rounded-full text-xs font-medium uppercase tracking-wider transition-all ${
                activeCategory === cat.slug
                  ? 'bg-brand-gold text-brand-dark shadow-sm font-semibold'
                  : 'bg-brand-charcoal text-gray-300 border border-brand-border hover:border-brand-gold'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <ProductGrid
          products={rentalProducts}
          onOpenRentalModal={(p) => setSelectedRentalProduct(p)}
        />

      </div>

      {/* Rental Availability Enquiry Modal */}
      <RentalEnquiryModal
        product={selectedRentalProduct}
        isOpen={!!selectedRentalProduct}
        onClose={() => setSelectedRentalProduct(null)}
      />
    </div>
  );
};
