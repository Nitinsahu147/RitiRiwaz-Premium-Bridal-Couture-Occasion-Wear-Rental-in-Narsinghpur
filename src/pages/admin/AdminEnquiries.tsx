import React, { useState, useEffect } from 'react';
import { fetchEnquiriesApi, updateEnquiryStatusApi, deleteEnquiryApi, Enquiry } from '../../services/api';
import { Phone, Calendar, Loader2, Trash2, RefreshCw } from 'lucide-react';

export const AdminEnquiries: React.FC = () => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadEnquiries = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchEnquiriesApi();
      setEnquiries(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch inquiries');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEnquiries();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: Enquiry['status']) => {
    try {
      await updateEnquiryStatusApi(id, newStatus);
      setEnquiries((prev) =>
        prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
      );
    } catch (err: any) {
      alert('Failed to update status: ' + err.message);
    }
  };

  const handleDelete = async (id: string, customerName: string) => {
    if (window.confirm(`Are you sure you want to delete inquiry from ${customerName}?`)) {
      try {
        await deleteEnquiryApi(id);
        setEnquiries((prev) => prev.filter((e) => e.id !== id));
      } catch (err: any) {
        alert('Failed to delete enquiry: ' + err.message);
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-medium text-white">Rental & Outfit Enquiries</h1>
          <p className="text-xs text-gray-400 font-sans mt-0.5">
            Track incoming WhatsApp availability requests and appointment bookings stored in backend DB.
          </p>
        </div>
        <button
          onClick={loadEnquiries}
          className="inline-flex items-center space-x-1.5 py-2 px-3 bg-brand-charcoal border border-brand-border text-gray-300 hover:text-white text-xs rounded-xs transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-900/30 border border-red-500/50 rounded text-red-300 text-xs">
          {error}
        </div>
      )}

      {/* Enquiries List */}
      <div className="bg-brand-charcoal border border-brand-border rounded-sm overflow-hidden shadow-luxury">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-brand-border/60 bg-brand-dark text-gray-400 uppercase tracking-widest text-[10px]">
              <tr>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Requested Outfit</th>
                <th className="py-3 px-4">Event Date</th>
                <th className="py-3 px-4">Size & Occasion</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Update Status & Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border/40 text-gray-300">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-400">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto text-brand-gold mb-2" />
                    <span>Loading customer enquiries...</span>
                  </td>
                </tr>
              ) : enquiries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-400">
                    No inquiries recorded yet. Customer submissions will automatically appear here.
                  </td>
                </tr>
              ) : (
                enquiries.map((enq) => (
                  <tr key={enq.id} className="hover:bg-brand-dark/40 transition-colors">
                    <td className="py-3.5 px-4 space-y-0.5">
                      <span className="font-medium text-white block">{enq.customerName}</span>
                      <span className="text-[11px] text-brand-gold flex items-center space-x-1">
                        <Phone className="w-3 h-3" />
                        <span>{enq.phone}</span>
                      </span>
                    </td>

                    <td className="py-3.5 px-4 font-serif text-sm text-white">
                      {enq.productName}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center space-x-1 text-gray-300">
                        <Calendar className="w-3.5 h-3.5 text-brand-gold" />
                        <span>{enq.eventDate || 'TBD'}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 space-y-0.5 text-[11px]">
                      <span className="text-gray-300 block">Size: {enq.preferredSize || 'Standard'}</span>
                      <span className="text-gray-400 block">{enq.occasion || 'General Inquiry'}</span>
                      {enq.customMessage && (
                        <p className="text-[10px] text-gray-500 italic truncate max-w-xs">{enq.customMessage}</p>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                        enq.status === 'New' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                        enq.status === 'Contacted' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40' :
                        enq.status === 'Confirmed' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' :
                        enq.status === 'Completed' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40' :
                        'bg-red-500/20 text-red-300 border border-red-500/40'
                      }`}>
                        {enq.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right space-x-2">
                      <select
                        value={enq.status}
                        onChange={(e) => handleUpdateStatus(enq.id, e.target.value as Enquiry['status'])}
                        className="bg-brand-dark border border-brand-border rounded-xs py-1 px-2 text-xs text-gray-300 focus:outline-none focus:border-brand-gold"
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>

                      <button
                        onClick={() => handleDelete(enq.id, enq.customerName)}
                        className="p-1.5 text-gray-400 hover:text-red-400 transition-colors align-middle inline-block"
                        title="Delete Enquiry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
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
