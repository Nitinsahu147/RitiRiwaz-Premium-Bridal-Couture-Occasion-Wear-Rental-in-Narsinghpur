import React from 'react';
import { SignIn, useClerk } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import { Lock, ArrowLeft, ShieldCheck } from 'lucide-react';
import { SITE_CONFIG } from '../../data/config';
import { ASSETS } from '../../data/assets';

export const AdminLoginPage: React.FC = () => {
  const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
  const isKeyMissing = !publishableKey || publishableKey.includes('placeholder');

  return (
    <div className="min-h-screen bg-brand-dark flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Background Subtle Gradient & Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-gold/10 via-transparent to-brand-dark pointer-events-none" />
      
      <div className="w-full max-w-md relative z-10 space-y-6 text-center">
        
        {/* Header Branding */}
        <div className="flex flex-col items-center justify-center space-y-3">
          <Link to="/" className="block group">
            <img
              src={ASSETS.fullLogo}
              alt="Riti Riwaz Logo"
              className="h-16 mx-auto object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
            />
          </Link>

          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-charcoal border border-brand-gold/30 text-brand-gold text-[10px] uppercase font-semibold tracking-widest">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Admin Management Portal</span>
          </div>
        </div>

        {/* Warning if Clerk Key is missing or invalid */}
        {isKeyMissing && (
          <div className="p-4 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs text-left space-y-1">
            <p className="font-semibold flex items-center gap-1.5">
              <Lock className="w-4 h-4" /> Clerk Publishable Key Required
            </p>
            <p className="text-[11px] text-amber-200/80">
              Please set <code className="bg-black/40 px-1 py-0.5 rounded text-white">VITE_CLERK_PUBLISHABLE_KEY</code> in your <code className="bg-black/40 px-1 py-0.5 rounded text-white">.env</code> file with your Clerk Dashboard API key.
            </p>
          </div>
        )}

        {/* Clerk Sign In Card Container */}
        <div className="flex justify-center">
          <SignIn
            appearance={{
              elements: {
                rootBox: 'w-full',
                card: 'bg-brand-charcoal border border-brand-border/80 shadow-2xl rounded-sm p-6 w-full text-white',
                header: 'text-center flex flex-col items-center justify-center w-full',
                cardHeader: 'text-center flex flex-col items-center justify-center w-full',
                headerTitle: 'font-serif text-gold-gradient text-2xl font-bold tracking-wide text-center w-full',
                headerSubtitle: 'text-gray-400 text-xs tracking-wider font-sans text-center w-full',
                formButtonPrimary:
                  'bg-brand-gold hover:bg-brand-goldLight text-brand-dark font-semibold text-xs uppercase tracking-widest py-3 rounded-xs transition-colors shadow-luxury',
                formFieldLabel: 'text-gray-300 text-xs uppercase tracking-wider font-medium',
                formFieldInput:
                  'bg-brand-dark border-brand-border text-white text-sm focus:border-brand-gold rounded-xs py-2.5',
                footerActionLink: 'hidden',
                footerActionText: 'hidden',
                footerAction: 'hidden',
                footer: 'hidden',
                devModeBadge: 'hidden',
                identityPreviewText: 'text-gray-200 font-medium',
                identityPreviewEditButton: 'text-brand-gold hover:underline text-xs',
                formResendCodeLink: 'text-brand-gold hover:underline text-xs',
                socialButtonsBlockButton:
                  'bg-brand-dark border-brand-border text-gray-200 hover:bg-brand-dark/80 text-xs font-medium',
                dividerLine: 'bg-brand-border',
                dividerText: 'text-gray-400 text-[10px] uppercase tracking-widest',
              },
            }}
            routing="path"
            path="/admin"
            signUpUrl="/admin"
            fallbackRedirectUrl="/admin"
            forceRedirectUrl="/admin"
          />
        </div>

        {/* Back to Website */}
        <div>
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-xs text-gray-400 hover:text-brand-gold transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Public Storefront</span>
          </Link>
        </div>

      </div>
    </div>
  );
};
