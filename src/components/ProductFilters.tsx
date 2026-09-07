import React from 'react';
import { Filter, X, Check } from 'lucide-react';
import { CATEGORIES } from '../data/categories';

export interface FilterState {
  category: string;
  occasion: string;
  size: string;
  rentalOnly: boolean;
}

interface ProductFiltersProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  onClearFilters: () => void;
  totalResults: number;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  filters,
  onFilterChange,
  onClearFilters,
  totalResults,
}) => {
  const occasions = ['All Occasions', 'Wedding', 'Sangeet', 'Haldi', 'Mehndi', 'Pre-Wedding Shoot', 'Reception'];
  const sizes = ['All Sizes', 'S', 'M', 'L', 'XL', 'Custom Fitting Available'];

  const hasActiveFilters =
    filters.category !== 'all' ||
    filters.occasion !== 'all' ||
    filters.size !== 'all' ||
    filters.rentalOnly;

  return (
    <div className="bg-brand-charcoal border border-brand-border p-5 rounded-sm mb-8 space-y-5">
      {/* Category Chips Bar */}
      <div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-3">
          Filter By Category
        </span>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onFilterChange({ ...filters, category: 'all' })}
            className={`py-1.5 px-4 rounded-full text-xs font-medium uppercase tracking-wider transition-all ${
              filters.category === 'all'
                ? 'bg-brand-gold text-brand-dark shadow-sm'
                : 'bg-brand-dark text-gray-300 border border-brand-border hover:border-brand-gold'
            }`}
          >
            All Outfits
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onFilterChange({ ...filters, category: cat.slug })}
              className={`py-1.5 px-4 rounded-full text-xs font-medium uppercase tracking-wider transition-all ${
                filters.category === cat.slug
                  ? 'bg-brand-gold text-brand-dark shadow-sm'
                  : 'bg-brand-dark text-gray-300 border border-brand-border hover:border-brand-gold'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Secondary Dropdown & Toggle Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-brand-border/60">
        
        {/* Occasion Filter */}
        <div>
          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-1.5">
            Occasion
          </label>
          <select
            value={filters.occasion}
            onChange={(e) => onFilterChange({ ...filters, occasion: e.target.value })}
            className="w-full bg-brand-dark border border-brand-border rounded-xs text-xs text-gray-200 py-2 px-3 focus:outline-none focus:border-brand-gold"
          >
            {occasions.map((occ) => (
              <option key={occ} value={occ === 'All Occasions' ? 'all' : occ}>
                {occ}
              </option>
            ))}
          </select>
        </div>

        {/* Size Filter */}
        <div>
          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-1.5">
            Size Preference
          </label>
          <select
            value={filters.size}
            onChange={(e) => onFilterChange({ ...filters, size: e.target.value })}
            className="w-full bg-brand-dark border border-brand-border rounded-xs text-xs text-gray-200 py-2 px-3 focus:outline-none focus:border-brand-gold"
          >
            {sizes.map((s) => (
              <option key={s} value={s === 'All Sizes' ? 'all' : s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Rental Availability Toggle */}
        <div className="flex items-center">
          <label
            onClick={() => onFilterChange({ ...filters, rentalOnly: !filters.rentalOnly })}
            className="flex items-center space-x-2 cursor-pointer mt-5 py-2 px-3 bg-brand-dark border border-brand-border rounded-xs w-full hover:border-brand-gold/60 transition-colors"
          >
            <div className={`w-4 h-4 rounded-xs border flex items-center justify-center ${filters.rentalOnly ? 'bg-brand-gold border-brand-gold text-brand-dark' : 'border-gray-500'}`}>
              {filters.rentalOnly && <Check className="w-3 h-3 stroke-[3]" />}
            </div>
            <span className="text-xs text-gray-300 font-medium uppercase tracking-wider">
              Available on Rent Only
            </span>
          </label>
        </div>

        {/* Clear Filters / Total Count */}
        <div className="flex items-center justify-between sm:justify-end space-x-4 mt-5">
          <span className="text-xs text-brand-gold font-mono">
            {totalResults} {totalResults === 1 ? 'Look' : 'Looks'} Found
          </span>
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="inline-flex items-center space-x-1 text-xs text-gray-400 hover:text-brand-red transition-colors underline"
            >
              <X className="w-3.5 h-3.5" />
              <span>Clear Filters</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
