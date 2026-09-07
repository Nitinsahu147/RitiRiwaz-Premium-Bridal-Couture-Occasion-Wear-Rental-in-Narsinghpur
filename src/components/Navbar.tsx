import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Search, Heart, MessageCircle, Menu } from 'lucide-react';
import { SITE_CONFIG } from '../data/config';
import { ASSETS } from '../data/assets';
import { useWishlist } from '../context/WishlistContext';
import { getGeneralContactWhatsAppUrl } from '../utils/whatsapp';
import { MobileMenu } from './MobileMenu';

interface NavbarProps {
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { count: wishlistCount } = useWishlist();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Collections', path: '/collections' },
    { label: 'Rentals', path: '/rentals' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled
          ? 'glass-nav py-3'
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* BRAND LOGO */}
            <Link to="/" className="flex items-center space-x-3 group">
              <img
                src={ASSETS.logo}
                alt="Riti Riwaz Logo"
                className="w-10 h-10 object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
              />
              <div className="flex flex-col">

                <span className="font-serif text-xl sm:text-2xl font-bold tracking-widest text-gold-gradient leading-none">
                  RITI RIWA
                </span>
                {/* <span className="text-[9px] uppercase tracking-widest text-gray-400 font-sans hidden sm:block mt-0.5">
                  Narsinghpur • Boutique
                </span> */}
              </div>
            </Link>

            {/* DESKTOP NAVIGATION LINKS */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-xs uppercase tracking-widest font-medium transition-colors relative py-1 ${isActive
                      ? 'text-brand-gold font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-brand-gold'
                      : 'text-gray-300 hover:text-brand-gold'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* ACTION CONTROLS */}
            <div className="flex items-center space-x-3 sm:space-x-5">
              {/* Search button */}
              <button
                onClick={onOpenSearch}
                className="p-2 text-gray-300 hover:text-brand-gold transition-colors"
                aria-label="Search Collection"
                title="Search Collection"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist Button */}
              <Link
                to="/wishlist"
                className="p-2 text-gray-300 hover:text-brand-gold transition-colors relative"
                aria-label="View Saved Wishlist"
                title="Saved Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-brand-gold text-brand-dark font-bold text-[10px] flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* WhatsApp Direct Button */}
              <a
                href={getGeneralContactWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:flex items-center space-x-2 py-2 px-4 border border-brand-gold/60 rounded-sm text-xs font-medium uppercase tracking-wider text-brand-gold hover:bg-brand-gold hover:text-brand-dark transition-all duration-300 shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>

              {/* Mobile Menu Hamburger */}
              <button
                onClick={() => setIsMobileOpen(true)}
                className="p-2 text-gray-200 hover:text-brand-gold transition-colors md:hidden"
                aria-label="Open Mobile Menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <MobileMenu
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
        onOpenSearch={onOpenSearch}
      />
    </>
  );
};
