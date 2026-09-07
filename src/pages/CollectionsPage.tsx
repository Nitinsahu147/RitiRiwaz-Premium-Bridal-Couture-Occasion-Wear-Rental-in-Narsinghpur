import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Product } from '../data/products';
import { useProducts } from '../context/ProductContext';
import { CATEGORIES } from '../data/categories';
import { ProductFilters, FilterState } from '../components/ProductFilters';
import { ProductGrid } from '../components/ProductGrid';
import { RentalEnquiryModal } from '../components/RentalEnquiryModal';

export const CollectionsPage: React.FC = () => {
  const { products } = useProducts();
  const { categorySlug } = useParams<{ categorySlug?: string }>();
  const navigate = useNavigate();

  const [filters, setFilters] = useState<FilterState>({
    category: categorySlug || 'all',
    occasion: 'all',
    size: 'all',
    rentalOnly: false,
  });

  const [selectedRentalProduct, setSelectedRentalProduct] = useState<Product | null>(null);

  // Sync route param with category filter state
  React.useEffect(() => {
    if (categorySlug) {
      setFilters((prev) => ({ ...prev, category: categorySlug }));
    } else {
      setFilters((prev) => ({ ...prev, category: 'all' }));
    }
  }, [categorySlug]);

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    if (newFilters.category === 'all') {
      navigate('/collections', { replace: true });
    } else if (newFilters.category !== categorySlug) {
      navigate(`/collections/${newFilters.category}`, { replace: true });
    }
  };

  const handleClearFilters = () => {
    setFilters({
      category: 'all',
      occasion: 'all',
      size: 'all',
      rentalOnly: false,
    });
    navigate('/collections', { replace: true });
  };

  // Filter computation
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category check
      if (filters.category !== 'all' && p.category !== filters.category) {
        return false;
      }
      // Occasion check
      if (filters.occasion !== 'all' && !p.occasion.includes(filters.occasion)) {
        return false;
      }
      // Size check
      if (filters.size !== 'all' && !p.sizes.includes(filters.size)) {
        return false;
      }
      // Rental check
      if (filters.rentalOnly && !p.rentalAvailable) {
        return false;
      }
      return true;
    });
  }, [filters]);

  const activeCategoryObj = CATEGORIES.find((c) => c.slug === filters.category);

  return (
    <div className="bg-brand-dark min-h-screen text-white pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10 text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-gold block">
            RITI RIWAZ CATALOGUE
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-medium tracking-tight text-white">
            {activeCategoryObj ? activeCategoryObj.name : 'The Full Collection'}
          </h1>
          <p className="text-sm sm:text-base text-gray-300 font-sans font-light leading-relaxed">
            {activeCategoryObj
              ? activeCategoryObj.description
              : 'Curated bridal lehengas, statement side lehengas, gowns, and occasion wear — available for purchase and rental.'}
          </p>
        </div>

        {/* Filter Controls */}
        <ProductFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          totalResults={filteredProducts.length}
        />

        {/* Outfit Grid */}
        <ProductGrid
          products={filteredProducts}
          onOpenRentalModal={(p) => setSelectedRentalProduct(p)}
          onResetFilters={handleClearFilters}
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
