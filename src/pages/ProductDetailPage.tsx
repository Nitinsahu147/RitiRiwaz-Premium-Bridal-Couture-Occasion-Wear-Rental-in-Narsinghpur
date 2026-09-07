import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Product } from '../data/products';
import { useProducts } from '../context/ProductContext';
import { useWishlist } from '../context/WishlistContext';
import { getProductWhatsAppUrl } from '../utils/whatsapp';
import { RentalEnquiryModal } from '../components/RentalEnquiryModal';
import { ProductCard } from '../components/ProductCard';
import { Heart, MessageCircle, Sparkles, CheckCircle2, ChevronRight, ShieldCheck, ArrowLeft, Clock } from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { products } = useProducts();
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const product = products.find((p) => p.slug === slug || p.id === slug || p.code === slug);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isRentalModalOpen, setIsRentalModalOpen] = useState(false);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedImageIndex(0);
  }, [slug]);

  if (!product) {
    return (
      <div className="bg-brand-dark min-h-screen text-white pt-32 pb-20 px-4 text-center">
        <div className="max-w-md mx-auto space-y-4">
          <h2 className="font-serif text-3xl font-medium text-white">This Look Has Wandered Away</h2>
          <p className="text-sm text-gray-400 font-sans">We couldn't locate the outfit details you requested.</p>
          <Link
            to="/collections"
            className="inline-flex items-center space-x-2 py-3 px-6 bg-brand-gold text-brand-dark font-medium text-xs uppercase tracking-widest rounded-xs"
          >
            <span>Back to Collection</span>
          </Link>
        </div>
      </div>
    );
  }

  const isSaved = isInWishlist(product.id);

  // Complete Your Look items (Jewellery items if outfit, or outfits if jewellery)
  const jewelleryItems = products.filter((p) => p.category === 'jewellery' && p.id !== product.id).slice(0, 2);
  const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="bg-brand-dark min-h-screen text-white pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center space-x-2 text-xs uppercase tracking-widest text-gray-400 mb-8">
          <button onClick={() => navigate(-1)} className="hover:text-brand-gold flex items-center space-x-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>
          <span>/</span>
          <Link to="/collections" className="hover:text-brand-gold">Collections</Link>
          <span>/</span>
          <Link to={`/collections/${product.category}`} className="hover:text-brand-gold">{product.category}</Link>
          <span>/</span>
          <span className="text-brand-gold truncate max-w-[200px]">{product.name}</span>
        </div>

        {/* 2-Column Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 mb-20">
          
          {/* LEFT: Image Gallery */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Featured Image */}
            <div className="relative aspect-[3/4] rounded-sm overflow-hidden bg-brand-charcoal border border-brand-border/80 shadow-luxury group">
              <img
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              {product.availabilityStatus === 'CURRENTLY RENTED' ? (
                <div className="absolute top-4 left-4 py-1 px-3 bg-amber-950/90 border border-amber-500/60 text-amber-300 text-[10px] font-bold uppercase tracking-widest rounded-xs flex items-center space-x-1 backdrop-blur-md shadow-md">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Currently Rented</span>
                </div>
              ) : product.rentalAvailable ? (
                <div className="absolute top-4 left-4 py-1 px-3 bg-brand-dark/90 border border-brand-gold/60 text-brand-gold text-[10px] font-bold uppercase tracking-widest rounded-xs flex items-center space-x-1 backdrop-blur-md shadow-md">
                  <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
                  <span>Available on Rent</span>
                </div>
              ) : (
                <div className="absolute top-4 left-4 py-1 px-3 bg-gray-900/90 border border-gray-700 text-gray-300 text-[10px] font-bold uppercase tracking-widest rounded-xs flex items-center space-x-1 backdrop-blur-md shadow-md">
                  <span>Sale / Custom Order Only</span>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex space-x-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-20 h-24 rounded-xs overflow-hidden border-2 transition-all shrink-0 ${
                      selectedImageIndex === idx
                        ? 'border-brand-gold scale-95'
                        : 'border-brand-border opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Product Specs & CTAs */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              {/* Category & Code */}
              <div className="flex items-center justify-between text-xs uppercase tracking-widest text-brand-gold font-mono mb-2">
                <span>{product.category.replace('-', ' ')}</span>
                <span>CODE: {product.code}</span>
              </div>

              {/* Outfit Name */}
              <h1 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-white mb-3">
                {product.name}
              </h1>

              {/* Occasion Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {product.occasion.map((occ) => (
                  <span
                    key={occ}
                    className="text-xs px-2.5 py-1 bg-brand-charcoal text-gray-300 rounded-xs border border-brand-border"
                  >
                    {occ}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="pt-4 border-t border-brand-border/60">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                Craftsmanship & Style Notes
              </h3>
              <p className="text-sm text-gray-300 font-sans font-light leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Size & Fitting Availability */}
            <div className="pt-4 border-t border-brand-border/60 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-300 block">
                Available Sizes
              </span>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((sz) => (
                  <span
                    key={sz}
                    className="px-3 py-1.5 bg-brand-charcoal border border-brand-gold/40 text-xs font-mono text-brand-gold rounded-xs"
                  >
                    {sz}
                  </span>
                ))}
              </div>
              <p className="text-[11px] text-gray-400 font-sans pt-1">
                Custom trial and alterations available at our Narsinghpur store.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="pt-6 border-t border-brand-border/60 space-y-3">
              <div className="flex gap-3">
                <button
                  onClick={() => setIsRentalModalOpen(true)}
                  className="flex-1 py-4 px-6 bg-brand-gold text-brand-dark font-medium text-xs sm:text-sm uppercase tracking-widest rounded-xs hover:bg-brand-goldLight transition-colors shadow-gold-glow flex items-center justify-center space-x-2"
                >
                  <Sparkles className="w-4 h-4 fill-brand-dark" />
                  <span>Check Availability</span>
                </button>

                <button
                  onClick={() => toggleWishlist(product)}
                  className={`py-4 px-4 border rounded-xs transition-colors flex items-center justify-center ${
                    isSaved
                      ? 'bg-brand-gold text-brand-dark border-brand-gold'
                      : 'border-brand-border text-white hover:border-brand-gold'
                  }`}
                  aria-label="Save to Wishlist"
                  title={isSaved ? 'Saved' : 'Save'}
                >
                  <Heart className={`w-5 h-5 ${isSaved ? 'fill-brand-dark' : ''}`} />
                </button>
              </div>

              <a
                href={getProductWhatsAppUrl(product, true)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 bg-brand-charcoal border border-brand-gold/60 text-brand-gold hover:bg-brand-dark font-medium text-xs uppercase tracking-widest rounded-xs transition-colors flex items-center justify-center space-x-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Enquire On WhatsApp Direct</span>
              </a>
            </div>

            {/* Assurance Perks */}
            <div className="bg-brand-charcoal p-4 rounded-sm border border-brand-border/60 space-y-2 text-xs text-gray-400">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-brand-gold" />
                <span>100% Authentic Handcrafted Couture</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-brand-gold" />
                <span>Boutique Trial & Custom Fitting Assistance</span>
              </div>
            </div>

          </div>
        </div>

        {/* COMPLETE YOUR LOOK SECTION (#20) */}
        {jewelleryItems.length > 0 && (
          <section className="py-12 border-t border-brand-border/60">
            <div className="mb-8">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-gold block mb-1">
                RECOMMENDED ACCESSORIES
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-medium text-white">
                Complete Your Look
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {jewelleryItems.map((jItem) => (
                <ProductCard key={jItem.id} product={jItem} />
              ))}
            </div>
          </section>
        )}

        {/* YOU MAY ALSO LIKE SECTION (#20) */}
        {relatedProducts.length > 0 && (
          <section className="py-12 border-t border-brand-border/60">
            <div className="mb-8">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-gold block mb-1">
                SIMILAR DESIGNS
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-medium text-white">
                You May Also Like
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </section>
        )}

      </div>

      {/* Availability Check Modal */}
      <RentalEnquiryModal
        product={product}
        isOpen={isRentalModalOpen}
        onClose={() => setIsRentalModalOpen(false)}
      />
    </div>
  );
};
