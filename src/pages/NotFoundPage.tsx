import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowLeft, Home } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="bg-brand-dark min-h-screen text-white flex items-center justify-center px-4 py-20">
      <div className="max-w-lg w-full text-center p-8 bg-brand-charcoal border border-brand-gold/30 rounded-sm shadow-2xl space-y-6">
        
        <div className="w-14 h-14 rounded-full bg-brand-dark border border-brand-gold/60 flex items-center justify-center mx-auto text-brand-gold">
          <Sparkles className="w-7 h-7" />
        </div>

        <span className="text-xs font-bold uppercase tracking-[0.3em] text-brand-gold block">
          404 • PAGE NOT FOUND
        </span>

        <h1 className="font-serif text-3xl sm:text-4xl font-medium text-white">
          This Look Has Wandered Away.
        </h1>

        <p className="text-xs sm:text-sm text-gray-300 font-sans font-light leading-relaxed">
          The page or outfit link you were searching for does not exist or may have been updated in our catalogue.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            to="/collections"
            className="w-full sm:w-auto py-3 px-6 bg-brand-gold text-brand-dark font-medium text-xs uppercase tracking-widest rounded-xs hover:bg-brand-goldLight transition-colors flex items-center justify-center space-x-1.5 shadow-gold-glow"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back To Collection</span>
          </Link>

          <Link
            to="/"
            className="w-full sm:w-auto py-3 px-6 bg-brand-dark border border-brand-gold/50 text-brand-gold font-medium text-xs uppercase tracking-widest rounded-xs hover:bg-brand-gold hover:text-brand-dark transition-all flex items-center justify-center space-x-1.5"
          >
            <Home className="w-4 h-4" />
            <span>Go Home</span>
          </Link>
        </div>

      </div>
    </div>
  );
};
