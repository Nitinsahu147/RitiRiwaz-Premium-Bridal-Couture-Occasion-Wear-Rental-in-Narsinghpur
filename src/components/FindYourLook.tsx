import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { CATEGORIES } from '../data/categories';

export const FindYourLook: React.FC = () => {
  return (
    <section className="py-20 bg-brand-charcoal text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 border-b border-brand-border/60 pb-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-gold block mb-2">
              CURATED CATEGORIES
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight text-white">
              Find the Look for Your Moment
            </h2>
          </div>
          <p className="max-w-md text-sm text-gray-400 font-sans mt-4 md:mt-0 leading-relaxed">
            From your wedding day to the vibrant celebrations leading up to it, discover handcrafted outfits tailored for every ritual.
          </p>
        </div>

        {/* Asymmetric Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((category, idx) => {
            // Asymmetric height spans for editorial rhythm
            const isLarge = idx === 0 || idx === 4;

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                className={`${
                  isLarge ? 'sm:col-span-2 lg:col-span-2' : 'col-span-1'
                } group relative rounded-sm overflow-hidden border border-brand-border hover:border-brand-gold/60 transition-all duration-500 bg-brand-dark shadow-luxury`}
              >
                <Link to={`/collections/${category.slug}`} className="block relative h-full min-h-[360px]">
                  {/* Background Image */}
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                    loading="lazy"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-transparent opacity-85 group-hover:opacity-75 transition-opacity" />

                  {/* Optional Badge */}
                  {category.badge && (
                    <div className="absolute top-4 left-4 z-10 py-1 px-3 bg-brand-gold text-brand-dark text-[10px] font-bold uppercase tracking-widest rounded-xs">
                      {category.badge}
                    </div>
                  )}

                  {/* Card Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-10 flex flex-col justify-end">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-semibold uppercase tracking-widest text-brand-gold block mb-1">
                          COLLECTION
                        </span>
                        <h3 className="font-serif text-2xl font-medium text-white group-hover:text-gold-gradient transition-colors">
                          {category.name}
                        </h3>
                      </div>
                      
                      <div className="w-10 h-10 rounded-full border border-brand-gold/40 flex items-center justify-center bg-brand-dark/80 group-hover:bg-brand-gold group-hover:text-brand-dark text-brand-gold transition-all duration-300 transform group-hover:rotate-45">
                        <ArrowUpRight className="w-5 h-5" />
                      </div>
                    </div>

                    <p className="text-xs text-gray-300 font-sans font-light mt-2 line-clamp-2 opacity-90 group-hover:opacity-100 transition-opacity">
                      {category.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
