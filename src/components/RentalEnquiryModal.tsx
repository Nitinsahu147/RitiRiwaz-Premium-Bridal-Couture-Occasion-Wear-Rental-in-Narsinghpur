import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Phone, User, MessageCircle, Sparkles } from 'lucide-react';
import { Product } from '../data/products';
import { getStructuredEnquiryWhatsAppUrl } from '../utils/whatsapp';
import { createEnquiryApi } from '../services/api';

interface RentalEnquiryModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const RentalEnquiryModal: React.FC<RentalEnquiryModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [preferredSize, setPreferredSize] = useState(product?.sizes[0] || 'M');
  const [occasion, setOccasion] = useState(product?.occasion[0] || 'Wedding');
  const [customMessage, setCustomMessage] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  if (!isOpen || !product) return null;

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!customerName.trim()) errs.customerName = 'Please enter your full name';
    if (!phone.trim() || phone.trim().length < 10) errs.phone = 'Please enter a valid 10-digit phone number';
    if (!eventDate) errs.eventDate = 'Please select your event date';
    if (!preferredSize) errs.preferredSize = 'Please select a size';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Save enquiry to backend DB asynchronously
    try {
      await createEnquiryApi({
        customerName: customerName.trim(),
        phone: phone.trim(),
        productName: product.name,
        eventDate,
        preferredSize,
        occasion,
        customMessage: customMessage.trim(),
      });
    } catch (err) {
      console.warn('Backend enquiry save error:', err);
    }

    const whatsappUrl = getStructuredEnquiryWhatsAppUrl({
      productName: product.name,
      productCode: product.code,
      customerName: customerName.trim(),
      phone: phone.trim(),
      eventDate,
      preferredSize,
      occasion,
      customMessage: customMessage.trim(),
      isRental: product.rentalAvailable,
    });

    window.open(whatsappUrl, '_blank');
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-brand-dark border border-brand-gold/40 rounded-sm w-full max-w-lg p-6 sm:p-8 shadow-2xl z-10 overflow-y-auto max-h-[90vh]"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="mb-6 pb-4 border-b border-brand-border/60">
            <div className="inline-flex items-center space-x-1.5 text-brand-gold text-[10px] font-bold uppercase tracking-widest mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>RENTAL AVAILABILITY CHECK</span>
            </div>
            <h2 className="font-serif text-2xl font-medium text-white">
              Check Outfit Availability
            </h2>
            <p className="text-xs text-gray-400 mt-1 font-sans">
              Selected Look: <span className="text-brand-gold font-serif">{product.name}</span> ({product.code})
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Customer Name */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-300 block mb-1">
                Your Name *
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Ananya Sharma"
                  className={`w-full bg-brand-charcoal border ${
                    errors.customerName ? 'border-red-500' : 'border-brand-border'
                  } rounded-xs py-2.5 px-3 pl-9 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold`}
                />
                <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              </div>
              {errors.customerName && <p className="text-[10px] text-red-400 mt-1">{errors.customerName}</p>}
            </div>

            {/* Phone Number */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-300 block mb-1">
                WhatsApp Phone Number *
              </label>
              <div className="relative">
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +91 9876543210"
                  className={`w-full bg-brand-charcoal border ${
                    errors.phone ? 'border-red-500' : 'border-brand-border'
                  } rounded-xs py-2.5 px-3 pl-9 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold`}
                />
                <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              </div>
              {errors.phone && <p className="text-[10px] text-red-400 mt-1">{errors.phone}</p>}
            </div>

            {/* Event Date & Preferred Size */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-300 block mb-1">
                  Event Date *
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className={`w-full bg-brand-charcoal border ${
                      errors.eventDate ? 'border-red-500' : 'border-brand-border'
                    } rounded-xs py-2.5 px-3 text-xs text-white focus:outline-none focus:border-brand-gold`}
                  />
                </div>
                {errors.eventDate && <p className="text-[10px] text-red-400 mt-1">{errors.eventDate}</p>}
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-300 block mb-1">
                  Preferred Size *
                </label>
                <select
                  value={preferredSize}
                  onChange={(e) => setPreferredSize(e.target.value)}
                  className="w-full bg-brand-charcoal border border-brand-border rounded-xs py-2.5 px-3 text-xs text-white focus:outline-none focus:border-brand-gold"
                >
                  {product.sizes.map((sz) => (
                    <option key={sz} value={sz}>{sz}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Occasion & Custom Message */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-300 block mb-1">
                Occasion Type
              </label>
              <select
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
                className="w-full bg-brand-charcoal border border-brand-border rounded-xs py-2.5 px-3 text-xs text-white focus:outline-none focus:border-brand-gold"
              >
                {product.occasion.map((occ) => (
                  <option key={occ} value={occ}>{occ}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-300 block mb-1">
                Additional Notes / Fitting Requirements
              </label>
              <textarea
                rows={2}
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                placeholder="Mention any custom trial requests or blouse fitting specifications..."
                className="w-full bg-brand-charcoal border border-brand-border rounded-xs py-2 px-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-3">
              <button
                type="submit"
                className="w-full py-3.5 px-4 bg-brand-gold text-brand-dark font-medium text-xs uppercase tracking-widest rounded-xs hover:bg-brand-goldLight transition-colors flex items-center justify-center space-x-2 shadow-gold-glow"
              >
                <MessageCircle className="w-4 h-4 fill-brand-dark" />
                <span>Check Availability On WhatsApp</span>
              </button>
              <p className="text-[10px] text-gray-400 text-center mt-2">
                Clicking opens WhatsApp directly with +91 9131548602 for instant boutique consultation.
              </p>
            </div>

          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
