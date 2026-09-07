import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, Heart, Search, MapPin } from 'lucide-react';
import { SITE_CONFIG } from '../data/config';
import { ASSETS } from '../data/assets';
import { getGeneralContactWhatsAppUrl } from '../utils/whatsapp';
import { useWishlist } from '../context/WishlistContext';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSearch: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, onOpenSearch }) => {
  const { count: wishlistCount } = useWishlist();

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'The Collection', path: '/collections' },
    { label: 'Bridal Couture', path: '/collections/bridal' },
    { label: 'The Rental Edit', path: '/rentals' },
    { label: 'Real Brides & Gallery', path: '/gallery' },
    { label: 'About Riti Riwaz', path: '/about' },
    { label: 'Visit Store & Contact', path: '/contact' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 md:hidden"
          />

          {/* Slide-out Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-brand-dark border-l border-brand-border z-50 flex flex-col justify-between p-6 shadow-2xl overflow-y-auto md:hidden"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-6 border-b border-brand-border/60">
                <div className="flex items-center space-x-3">
                  <img
                    src={ASSETS.logo}
                    alt="Riti Riwaz Logo"
                    className="w-9 h-9 object-contain"
                  />
                  <span className="font-serif text-2xl font-bold tracking-wider text-gold-gradient">
                    RITI RIWAZ
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Action row */}
              <div className="grid grid-cols-2 gap-3 my-6">
                <button
                  onClick={() => {
                    onClose();
                    onOpenSearch();
                  }}
                  className="flex items-center justify-center space-x-2 py-2.5 px-4 bg-brand-charcoal border border-brand-border rounded-sm text-xs font-medium uppercase tracking-wider text-gray-200 hover:border-brand-gold transition-colors"
                >
                  <Search className="w-4 h-4 text-brand-gold" />
                  <span>Search</span>
                </button>

                <NavLink
                  to="/wishlist"
                  onClick={onClose}
                  className="flex items-center justify-center space-x-2 py-2.5 px-4 bg-brand-charcoal border border-brand-border rounded-sm text-xs font-medium uppercase tracking-wider text-gray-200 hover:border-brand-gold transition-colors relative"
                >
                  <Heart className="w-4 h-4 text-brand-gold" />
                  <span>Saved ({wishlistCount})</span>
                </NavLink>
              </div>

              {/* Links */}
              <nav className="flex flex-col space-y-4">
                {navItems.map((item, idx) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <NavLink
                      to={item.path}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `block py-2 text-lg font-serif tracking-wide transition-colors ${
                          isActive
                            ? 'text-brand-gold font-medium pl-2 border-l-2 border-brand-gold'
                            : 'text-gray-300 hover:text-brand-gold'
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  </motion.div>
                ))}
              </nav>
            </div>

            {/* Mobile Footer CTAs */}
            <div className="pt-6 border-t border-brand-border/60 space-y-3">
              <a
                href={getGeneralContactWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-brand-gold text-brand-dark font-medium text-sm tracking-wider uppercase rounded-sm shadow-md hover:bg-brand-goldLight transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Enquiry</span>
              </a>

              <div className="flex items-center justify-between text-xs text-gray-400 pt-2">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5 text-brand-gold" />
                  <span>{SITE_CONFIG.location.city}, MP</span>
                </div>
                <span>{SITE_CONFIG.whatsappDisplay}</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
