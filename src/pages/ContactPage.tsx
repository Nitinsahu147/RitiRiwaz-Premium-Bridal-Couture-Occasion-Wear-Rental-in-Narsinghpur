import React, { useState } from 'react';
import { MapPin, Phone, Clock, MessageCircle, ArrowRight } from 'lucide-react';
import { SITE_CONFIG } from '../data/config';
import { buildWhatsAppUrl } from '../utils/whatsapp';
import { createEnquiryApi } from '../services/api';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [inquiryType, setInquiryType] = useState('Bridal Consultation');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    try {
      await createEnquiryApi({
        customerName: name.trim(),
        phone: phone.trim(),
        productName: inquiryType,
        eventDate: eventDate || 'TBD',
        preferredSize: 'Custom',
        occasion: inquiryType,
        customMessage: message.trim(),
      });
    } catch (err) {
      console.warn('Backend contact enquiry save error:', err);
    }

    const msg = `Hello Riti Riwaz,

I would like to schedule a boutique appointment / consultation:
• Name: ${name}
• Phone: ${phone}
• Interest: ${inquiryType}
• Event Date: ${eventDate || 'TBD'}
${message ? `• Message: ${message}` : ''}`;

    window.open(buildWhatsAppUrl(msg), '_blank');
  };

  return (
    <div className="bg-brand-dark min-h-screen text-white pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-gold block">
            STORE LOCATION & INQUIRIES
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-medium tracking-tight text-white">
            Visit Riti Riwaz
          </h1>
          <p className="text-sm sm:text-base text-gray-300 font-sans font-light leading-relaxed">
            We look forward to welcoming you to our boutique in Narsinghpur. Reach out for custom trials, rental availability, or direct styling sessions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Location Cards & Directions */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Address Card */}
            <div className="bg-brand-charcoal p-6 rounded-sm border border-brand-border space-y-4">
              <div className="flex items-center space-x-3 text-brand-gold">
                <MapPin className="w-5 h-5" />
                <h3 className="font-serif text-xl font-medium text-white">Boutique Address</h3>
              </div>
              <p className="text-xs text-gray-300 font-sans leading-relaxed">
                {SITE_CONFIG.location.address}
              </p>
              <div>
                <a
                  href={SITE_CONFIG.location.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 py-2.5 px-4 bg-brand-dark border border-brand-gold/60 text-brand-gold font-medium text-xs uppercase tracking-wider rounded-xs hover:bg-brand-gold hover:text-brand-dark transition-colors"
                >
                  <span>Get Directions On Maps</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Phone & WhatsApp Card */}
            <div className="bg-brand-charcoal p-6 rounded-sm border border-brand-border space-y-4">
              <div className="flex items-center space-x-3 text-brand-gold">
                <Phone className="w-5 h-5" />
                <h3 className="font-serif text-xl font-medium text-white">WhatsApp & Phone</h3>
              </div>
              <p className="text-xs text-gray-300 font-sans">
                {SITE_CONFIG.whatsappDisplay}
              </p>
              <div>
                <a
                  href={`https://wa.me/${SITE_CONFIG.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 py-2.5 px-4 bg-brand-gold text-brand-dark font-medium text-xs uppercase tracking-wider rounded-xs hover:bg-brand-goldLight transition-colors"
                >
                  <MessageCircle className="w-4 h-4 fill-brand-dark" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Timings Card */}
            <div className="bg-brand-charcoal p-6 rounded-sm border border-brand-border space-y-4">
              <div className="flex items-center space-x-3 text-brand-gold">
                <Clock className="w-5 h-5" />
                <h3 className="font-serif text-xl font-medium text-white">Opening Hours</h3>
              </div>
              <p className="text-xs text-gray-300 font-sans">
                {SITE_CONFIG.openingHours}
              </p>
            </div>

          </div>

          {/* Right Column: Appointment Form */}
          <div className="lg:col-span-7">
            <div className="bg-brand-charcoal p-8 rounded-sm border border-brand-gold/40 shadow-luxury space-y-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold block mb-1">
                  DIRECT CONSULTATION
                </span>
                <h2 className="font-serif text-2xl font-medium text-white">
                  Schedule a Boutique Visit
                </h2>
                <p className="text-xs text-gray-400 font-sans mt-1">
                  Send your enquiry directly to our WhatsApp team for custom outfit fitting or trial booking.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-300 block mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full bg-brand-dark border border-brand-border rounded-xs py-2.5 px-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-gray-300 block mb-1">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 9876543210"
                      className="w-full bg-brand-dark border border-brand-border rounded-xs py-2.5 px-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-gray-300 block mb-1">
                      Target Event Date
                    </label>
                    <input
                      type="date"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full bg-brand-dark border border-brand-border rounded-xs py-2.5 px-3 text-xs text-white focus:outline-none focus:border-brand-gold"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-300 block mb-1">
                    Type of Consultation
                  </label>
                  <select
                    value={inquiryType}
                    onChange={(e) => setInquiryType(e.target.value)}
                    className="w-full bg-brand-dark border border-brand-border rounded-xs py-2.5 px-3 text-xs text-white focus:outline-none focus:border-brand-gold"
                  >
                    <option value="Bridal Couture Trial">Bridal Couture Trial</option>
                    <option value="Rental Outfit Availability">Rental Outfit Availability</option>
                    <option value="Haldi / Mehndi / Sangeet Wear">Haldi / Mehndi / Sangeet Wear</option>
                    <option value="Pre-Wedding Shoot Gowns">Pre-Wedding Shoot Gowns</option>
                    <option value="Bridal Jewellery Pairing">Bridal Jewellery Pairing</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-300 block mb-1">
                    Message / Special Requests
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your outfit preferences, color choices, or trial requirements..."
                    className="w-full bg-brand-dark border border-brand-border rounded-xs py-2 px-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-brand-gold"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 bg-brand-gold text-brand-dark font-medium text-xs uppercase tracking-widest rounded-xs hover:bg-brand-goldLight transition-colors flex items-center justify-center space-x-2 shadow-gold-glow"
                >
                  <MessageCircle className="w-4 h-4 fill-brand-dark" />
                  <span>Send WhatsApp Inquiry</span>
                </button>
              </form>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
