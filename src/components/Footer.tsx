import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, MapPin, Phone, Instagram, Clock, ArrowRight } from 'lucide-react';
import { SITE_CONFIG } from '../data/config';
import { ASSETS } from '../data/assets';
import { getGeneralContactWhatsAppUrl } from '../utils/whatsapp';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-charcoal text-gray-400 border-t border-brand-border/60 relative pt-16 pb-24 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-brand-border/40">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img
                src={ASSETS.logo}
                alt="Riti Riwaz Logo"
                className="w-12 h-12 object-contain drop-shadow-md"
              />
              <span className="font-serif text-2xl font-bold tracking-widest text-gold-gradient">
                RITI RIWAZ
              </span>
            </div>

            <p className="font-serif italic text-gray-300 text-sm tracking-wide">
              "{SITE_CONFIG.tagline}"
            </p>

            <p className="text-xs leading-relaxed text-gray-400">
              Narsinghpur’s premier Indian fashion boutique specializing in bespoke bridal lehengas, occasion wear, and exclusive designer outfits available for purchase and rental.
            </p>

            <div className="pt-2">
              <a
                href={SITE_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-xs font-medium uppercase tracking-wider text-brand-gold hover:underline"
              >
                <Instagram className="w-4 h-4" />
                <span>{SITE_CONFIG.instagram}</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="font-serif text-base font-medium tracking-wider text-gray-200 uppercase border-b border-brand-border/60 pb-2">
              Quick Navigation
            </h3>
            <ul className="space-y-2 text-xs font-medium uppercase tracking-wider">
              <li>
                <Link to="/" className="hover:text-brand-gold transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/collections" className="hover:text-brand-gold transition-colors">The Collection</Link>
              </li>
              <li>
                <Link to="/rentals" className="hover:text-brand-gold transition-colors">The Rental Edit</Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-brand-gold transition-colors">Real Brides & Gallery</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-brand-gold transition-colors">About Riti Riwaz</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-brand-gold transition-colors">Store Visit & Contact</Link>
              </li>
              <li>
                <Link to="/wishlist" className="hover:text-brand-gold transition-colors">Saved Wishlist</Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h3 className="font-serif text-base font-medium tracking-wider text-gray-200 uppercase border-b border-brand-border/60 pb-2">
              Occasion Wear
            </h3>
            <ul className="space-y-2 text-xs font-medium uppercase tracking-wider">
              <li>
                <Link to="/collections/bridal" className="hover:text-brand-gold transition-colors">Bridal Lehengas</Link>
              </li>
              <li>
                <Link to="/collections/side-lehenga" className="hover:text-brand-gold transition-colors">Side Lehengas & Sangeet</Link>
              </li>
              <li>
                <Link to="/collections/haldi" className="hover:text-brand-gold transition-colors">Haldi Dresses</Link>
              </li>
              <li>
                <Link to="/collections/mehndi" className="hover:text-brand-gold transition-colors">Mehndi Outfits</Link>
              </li>
              <li>
                <Link to="/collections/pre-wedding" className="hover:text-brand-gold transition-colors">Pre-Wedding Gowns</Link>
              </li>
              <li>
                <Link to="/collections/jewellery" className="hover:text-brand-gold transition-colors">Bridal Jewellery</Link>
              </li>
            </ul>
          </div>

          {/* Contact & Location */}
          <div className="space-y-3">
            <h3 className="font-serif text-base font-medium tracking-wider text-gray-200 uppercase border-b border-brand-border/60 pb-2">
              Boutique Location
            </h3>
            
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                <span>{SITE_CONFIG.location.address}</span>
              </div>

              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-brand-gold shrink-0" />
                <span>{SITE_CONFIG.whatsappDisplay}</span>
              </div>

              <div className="flex items-start space-x-2">
                <Clock className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                <span>{SITE_CONFIG.openingHours}</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={getGeneralContactWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 bg-brand-gold text-brand-dark font-medium text-xs uppercase tracking-wider rounded-sm hover:bg-brand-goldLight transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Consultation</span>
              </a>
            </div>
          </div>

        </div>

        {/* Sub-footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 space-y-4 sm:space-y-0">
          <div>
            © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved. Narsinghpur, Madhya Pradesh.
          </div>
          <div className="flex items-center space-x-6">
            <Link to="/admin" className="hover:text-brand-gold transition-colors">
              Boutique Admin
            </Link>
            <a
              href={SITE_CONFIG.location.googleMapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-gold transition-colors inline-flex items-center space-x-1"
            >
              <span>Get Directions</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
