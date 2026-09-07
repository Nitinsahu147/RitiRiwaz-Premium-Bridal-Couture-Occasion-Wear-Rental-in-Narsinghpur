import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../../context/ProductContext';
import { fetchEnquiriesApi, Enquiry } from '../../services/api';
import { ShoppingBag, RefreshCw, MessageSquare, Plus, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { products, loading: productsLoading } = useProducts();
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [enquiriesLoading, setEnquiriesLoading] = useState(true);

  useEffect(() => {
    fetchEnquiriesApi()
      .then((data) => setEnquiries(data))
      .catch((err) => console.warn('Dashboard enquiries fetch error:', err))
      .finally(() => setEnquiriesLoading(false));
  }, []);

  const totalProducts = products.length;
  const availableProducts = products.filter((p) => p.availabilityStatus === 'AVAILABLE').length;
  const rentedProducts = products.filter((p) => p.availabilityStatus === 'CURRENTLY RENTED').length;
  const totalRentals = products.filter((p) => p.rentalAvailable).length;
  const newEnquiriesCount = enquiries.filter((e) => e.status === 'New').length;

  const recentEnquiries = enquiries.slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-medium text-white">Boutique Overview</h1>
          <p className="text-xs text-gray-400 font-sans mt-0.5">Manage products, Cloudinary images, rental inventory, and customer availability inquiries.</p>
        </div>
        <Link
          to="/admin/products"
          className="inline-flex items-center space-x-2 py-2.5 px-4 bg-brand-gold text-brand-dark font-medium text-xs uppercase tracking-wider rounded-xs hover:bg-brand-goldLight transition-colors shadow-gold-glow"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Outfit</span>
        </Link>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-brand-charcoal p-5 rounded-sm border border-brand-border space-y-2">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-[10px] font-bold uppercase tracking-widest">Total Outfits</span>
            <ShoppingBag className="w-4 h-4 text-brand-gold" />
          </div>
          <p className="font-serif text-3xl font-bold text-white">
            {productsLoading ? <Loader2 className="w-6 h-6 animate-spin inline-block" /> : totalProducts}
          </p>
          <p className="text-[11px] text-gray-400">{totalRentals} Available on Rent</p>
        </div>

        <div className="bg-brand-charcoal p-5 rounded-sm border border-brand-border space-y-2">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-[10px] font-bold uppercase tracking-widest">Available Now</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="font-serif text-3xl font-bold text-emerald-400">
            {productsLoading ? <Loader2 className="w-6 h-6 animate-spin inline-block" /> : availableProducts}
          </p>
          <p className="text-[11px] text-gray-400">Ready for instant trial</p>
        </div>

        <div className="bg-brand-charcoal p-5 rounded-sm border border-brand-border space-y-2">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-[10px] font-bold uppercase tracking-widest">Currently Rented</span>
            <RefreshCw className="w-4 h-4 text-amber-400" />
          </div>
          <p className="font-serif text-3xl font-bold text-amber-400">
            {productsLoading ? <Loader2 className="w-6 h-6 animate-spin inline-block" /> : rentedProducts}
          </p>
          <p className="text-[11px] text-gray-400">Out for client events</p>
        </div>

        <div className="bg-brand-charcoal p-5 rounded-sm border border-brand-border space-y-2">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-[10px] font-bold uppercase tracking-widest">New Enquiries</span>
            <MessageSquare className="w-4 h-4 text-brand-gold" />
          </div>
          <p className="font-serif text-3xl font-bold text-brand-gold">
            {enquiriesLoading ? <Loader2 className="w-6 h-6 animate-spin inline-block" /> : newEnquiriesCount}
          </p>
          <p className="text-[11px] text-gray-400">Pending response</p>
        </div>
      </div>

      {/* Recent Enquiries Table */}
      <div className="bg-brand-charcoal border border-brand-border rounded-sm p-6 space-y-4 shadow-luxury">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl font-medium text-white">Recent Customer Enquiries</h2>
          <Link to="/admin/enquiries" className="text-xs text-brand-gold hover:underline inline-flex items-center space-x-1">
            <span>View All Enquiries</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-brand-border/60 text-gray-400 uppercase tracking-widest text-[10px]">
              <tr>
                <th className="py-3 px-2">Customer</th>
                <th className="py-3 px-2">Phone</th>
                <th className="py-3 px-2">Outfit Name</th>
                <th className="py-3 px-2">Event Date</th>
                <th className="py-3 px-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border/40 text-gray-300">
              {enquiriesLoading ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-400">
                    <Loader2 className="w-5 h-5 animate-spin mx-auto text-brand-gold" />
                  </td>
                </tr>
              ) : recentEnquiries.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-400">
                    No customer enquiries recorded yet.
                  </td>
                </tr>
              ) : (
                recentEnquiries.map((enq) => (
                  <tr key={enq.id} className="hover:bg-brand-dark/40 transition-colors">
                    <td className="py-3 px-2 font-medium text-white">{enq.customerName}</td>
                    <td className="py-3 px-2">{enq.phone}</td>
                    <td className="py-3 px-2 text-brand-gold font-serif">{enq.productName}</td>
                    <td className="py-3 px-2">{enq.eventDate || 'TBD'}</td>
                    <td className="py-3 px-2">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        enq.status === 'New' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-blue-500/20 text-blue-300'
                      }`}>
                        {enq.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
