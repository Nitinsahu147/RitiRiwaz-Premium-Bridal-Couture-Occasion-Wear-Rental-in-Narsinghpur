import React from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';
import { SignedIn, SignedOut, UserButton, useUser, useClerk } from '@clerk/clerk-react';
import { LayoutDashboard, ShoppingBag, MessageSquare, Home, LogOut, ShieldCheck } from 'lucide-react';
import { SITE_CONFIG } from '../../data/config';
import { ASSETS } from '../../data/assets';
import { AdminLoginPage } from './AdminLoginPage';

export const AdminLayout: React.FC = () => {
  const { user } = useUser();
  const { signOut } = useClerk();

  return (
    <>
      <SignedOut>
        <AdminLoginPage />
      </SignedOut>

      <SignedIn>
        <div className="min-h-screen bg-brand-dark text-white flex flex-col md:flex-row">
          
          {/* Sidebar */}
          <aside className="w-full md:w-64 bg-brand-charcoal border-b md:border-b-0 md:border-r border-brand-border p-6 flex flex-col justify-between shrink-0">
            <div className="space-y-8">
              
              {/* Logo */}
              <div className="flex items-center space-x-3">
                <img
                  src={ASSETS.logo}
                  alt="Riti Riwaz Logo"
                  className="w-10 h-10 object-contain drop-shadow-md"
                />
                <div>
                  <span className="font-serif text-lg font-bold tracking-widest text-gold-gradient block">
                    ADMIN PORTAL
                  </span>
                  <span className="text-[9px] uppercase tracking-widest text-gray-400 block">
                    {SITE_CONFIG.name} Boutique
                  </span>
                </div>
              </div>

              {/* Navigation Links */}
              <nav className="space-y-1">
                <NavLink
                  to="/admin"
                  end
                  className={({ isActive }) =>
                    `flex items-center space-x-3 py-2.5 px-3 rounded-xs text-xs uppercase font-medium tracking-wider transition-colors ${
                      isActive
                        ? 'bg-brand-gold text-brand-dark font-semibold'
                        : 'text-gray-300 hover:bg-brand-dark hover:text-brand-gold'
                    }`
                  }
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Dashboard</span>
                </NavLink>

                <NavLink
                  to="/admin/products"
                  className={({ isActive }) =>
                    `flex items-center space-x-3 py-2.5 px-3 rounded-xs text-xs uppercase font-medium tracking-wider transition-colors ${
                      isActive
                        ? 'bg-brand-gold text-brand-dark font-semibold'
                        : 'text-gray-300 hover:bg-brand-dark hover:text-brand-gold'
                    }`
                  }
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Products & Rentals</span>
                </NavLink>

                <NavLink
                  to="/admin/enquiries"
                  className={({ isActive }) =>
                    `flex items-center space-x-3 py-2.5 px-3 rounded-xs text-xs uppercase font-medium tracking-wider transition-colors ${
                      isActive
                        ? 'bg-brand-gold text-brand-dark font-semibold'
                        : 'text-gray-300 hover:bg-brand-dark hover:text-brand-gold'
                    }`
                  }
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Rental Enquiries</span>
                </NavLink>
              </nav>

            </div>

            {/* Footer controls & Logged in Admin User */}
            <div className="pt-6 border-t border-brand-border/60 space-y-4">
              {/* User Profile Card */}
              {user && (
                <div className="flex items-center justify-between p-2 rounded bg-brand-dark/60 border border-brand-border/40">
                  <div className="flex items-center space-x-2.5 overflow-hidden">
                    <UserButton afterSignOutUrl="/admin" />
                    <div className="truncate text-left">
                      <p className="text-xs font-semibold text-gray-200 truncate">
                        {user.fullName || user.primaryEmailAddress?.emailAddress}
                      </p>
                      <p className="text-[10px] text-brand-gold flex items-center gap-1 font-sans">
                        <ShieldCheck className="w-3 h-3" /> Admin
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <button
                  onClick={() => signOut()}
                  className="w-full flex items-center space-x-2 py-2 px-3 text-xs text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>

                <Link
                  to="/"
                  className="flex items-center space-x-2 py-2 px-3 text-xs text-gray-400 hover:text-brand-gold transition-colors"
                >
                  <Home className="w-4 h-4" />
                  <span>Return to Website</span>
                </Link>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
            <Outlet />
          </main>

        </div>
      </SignedIn>
    </>
  );
};

