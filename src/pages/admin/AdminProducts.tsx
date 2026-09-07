import React, { useState } from 'react';
import { useProducts } from '../../context/ProductContext';
import { Product } from '../../data/products';
import { uploadImageApi, deleteImageApi } from '../../services/api';
import { Plus, Edit3, Trash2, Upload, Loader2, Sparkles, X, Check, Image as ImageIcon, Link as LinkIcon } from 'lucide-react';

export const AdminProducts: React.FC = () => {
  const {
    products,
    loading,
    error,
    addProduct,
    updateProduct,
    deleteProduct,
    toggleRentalStatus,
    toggleAvailabilityStatus,
  } = useProducts();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [category, setCategory] = useState('bridal');
  const [description, setDescription] = useState('');
  const [rentalAvailable, setRentalAvailable] = useState(true);
  const [availabilityStatus, setAvailabilityStatus] = useState<'AVAILABLE' | 'CURRENTLY RENTED'>('AVAILABLE');
  const [imageUrl, setImageUrl] = useState('');
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadNotice, setUploadNotice] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openAddModal = () => {
    setEditingProduct(null);
    setName('');
    setCode('');
    setCategory('bridal');
    setDescription('');
    setRentalAvailable(true);
    setAvailabilityStatus('AVAILABLE');
    setImageUrl('');
    setImageUrls([]);
    setUploadNotice(null);
    setFormError(null);
    setIsModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setName(product.name);
    setCode(product.code);
    setCategory(product.category);
    setDescription(product.description || '');
    setRentalAvailable(product.rentalAvailable);
    setAvailabilityStatus(product.availabilityStatus);
    setImageUrls(product.images || []);
    setImageUrl(product.images && product.images[0] ? product.images[0] : '');
    setUploadNotice(null);
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadNotice(null);
    setFormError(null);
    try {
      const res = await uploadImageApi(file);
      if (res.url) {
        setImageUrls((prev) => [...prev, res.url]);
        if (!imageUrl) setImageUrl(res.url);
        if (res.notice) {
          setUploadNotice(res.notice);
        } else {
          setUploadNotice('Image uploaded to Cloudinary successfully!');
        }
      }
    } catch (err: any) {
      setFormError('Upload failed: ' + (err.message || 'Error uploading to Cloudinary'));
    } finally {
      setIsUploading(false);
    }
  };

  const handleAddImageUrl = () => {
    if (!imageUrl.trim()) return;
    if (!imageUrls.includes(imageUrl.trim())) {
      setImageUrls([...imageUrls, imageUrl.trim()]);
    }
    setImageUrl('');
  };

  const handleRemoveImage = (index: number) => {
    const removedUrl = imageUrls[index];
    if (removedUrl) {
      deleteImageApi(removedUrl).catch((err) => console.warn('Cloudinary image removal error:', err));
    }
    setImageUrls(imageUrls.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !code.trim()) {
      setFormError('Outfit Name and Product Code are required.');
      return;
    }

    const finalImages = imageUrls.length > 0 
      ? imageUrls 
      : [imageUrl.trim() || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=85&w=800'];

    setIsSubmitting(true);
    setFormError(null);

    const payload: Partial<Product> = {
      name: name.trim(),
      code: code.trim().toUpperCase(),
      category,
      description: description.trim(),
      images: finalImages,
      rentalAvailable,
      availabilityStatus,
      featured: editingProduct ? editingProduct.featured : true,
      tags: [category, rentalAvailable ? 'Rental Ready' : 'Sale Only'],
      sizes: editingProduct?.sizes || ['S', 'M', 'L', 'Custom Fitting'],
      occasion: editingProduct?.occasion || ['Wedding', 'Reception']
    };

    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, payload);
      } else {
        await addProduct(payload);
      }
      setIsModalOpen(false);
    } catch (err: any) {
      setFormError(err.message || 'Failed to save outfit');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, prodName: string) => {
    if (window.confirm(`Are you sure you want to remove "${prodName}" from inventory?`)) {
      await deleteProduct(id);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-medium text-white">Outfit & Rental Inventory</h1>
          <p className="text-xs text-gray-400 font-sans mt-0.5">
            Manage catalogue outfits, Cloudinary images, rental availability, and status badges.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center space-x-2 py-2.5 px-4 bg-brand-gold text-brand-dark font-medium text-xs uppercase tracking-wider rounded-xs hover:bg-brand-goldLight transition-colors shadow-gold-glow"
        >
          <Plus className="w-4 h-4" />
          <span>Add Outfit</span>
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-900/30 border border-red-500/50 rounded text-red-300 text-xs">
          {error}
        </div>
      )}

      {/* Products Table */}
      <div className="bg-brand-charcoal border border-brand-border rounded-sm overflow-hidden shadow-luxury">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-brand-border/60 bg-brand-dark text-gray-400 uppercase tracking-widest text-[10px]">
              <tr>
                <th className="py-3 px-4">Outfit</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Rental Available</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border/40 text-gray-300">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-gray-400">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto text-brand-gold mb-2" />
                    <span>Loading outfits from backend...</span>
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-gray-400">
                    No outfits found. Click "Add Outfit" to create one.
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className="hover:bg-brand-dark/40 transition-colors">
                    <td className="py-3 px-4 flex items-center space-x-3">
                      <img
                        src={product.images && product.images[0] ? product.images[0] : 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=85&w=400'}
                        alt={product.name}
                        className="w-10 h-12 object-cover rounded-xs border border-brand-border"
                      />
                      <div>
                        <span className="font-mono text-[10px] text-brand-gold block">{product.code}</span>
                        <span className="font-serif text-sm text-white font-medium block">{product.name}</span>
                      </div>
                    </td>

                    <td className="py-3 px-4 uppercase text-[10px] tracking-wider text-gray-400 font-semibold">
                      {product.category}
                    </td>

                    <td className="py-3 px-4">
                      <button
                        onClick={() => toggleRentalStatus(product.id)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase transition-colors ${
                          product.rentalAvailable
                            ? 'bg-brand-gold/20 text-brand-gold border border-brand-gold/40'
                            : 'bg-gray-800 text-gray-400 border border-gray-700'
                        }`}
                      >
                        {product.rentalAvailable ? 'Yes (Rental)' : 'No (Sale Only)'}
                      </button>
                    </td>

                    <td className="py-3 px-4">
                      <button
                        onClick={() => toggleAvailabilityStatus(product.id)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase transition-colors ${
                          product.availabilityStatus === 'AVAILABLE'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        }`}
                      >
                        {product.availabilityStatus}
                      </button>
                    </td>

                    <td className="py-3 px-4 text-right space-x-1">
                      <button
                        onClick={() => openEditModal(product)}
                        className="p-1.5 text-gray-400 hover:text-brand-gold transition-colors"
                        title="Edit Outfit"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id, product.name)}
                        className="p-1.5 text-gray-400 hover:text-red-400 transition-colors"
                        title="Delete Outfit"
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

      {/* Add / Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-brand-dark border border-brand-gold/40 rounded-sm w-full max-w-xl p-6 space-y-4 shadow-2xl relative my-8">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="font-serif text-2xl font-medium text-white border-b border-brand-border/60 pb-3 flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-brand-gold" />
              <span>{editingProduct ? 'Edit Outfit Details' : 'Add New Outfit'}</span>
            </h2>

            {formError && (
              <div className="p-3 bg-red-900/40 border border-red-500/60 rounded text-red-300 text-xs">
                {formError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold uppercase text-gray-300 block mb-1">Outfit Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Royal Silk Zardozi Lehenga"
                    className="w-full bg-brand-charcoal border border-brand-border rounded-xs py-2 px-3 text-xs text-white focus:border-brand-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase text-gray-300 block mb-1">Product Code *</label>
                  <input
                    type="text"
                    required
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="e.g. RR-BD-09"
                    className="w-full bg-brand-charcoal border border-brand-border rounded-xs py-2 px-3 text-xs text-white focus:border-brand-gold focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold uppercase text-gray-300 block mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-brand-charcoal border border-brand-border rounded-xs py-2 px-3 text-xs text-white focus:border-brand-gold focus:outline-none"
                  >
                    <option value="bridal">Bridal Lehengas</option>
                    <option value="side-lehenga">Side Lehengas</option>
                    <option value="haldi">Haldi Dresses</option>
                    <option value="mehndi">Mehndi Dresses</option>
                    <option value="pre-wedding">Pre-Wedding Gowns</option>
                    <option value="jewellery">Bridal Jewellery</option>
                    <option value="maternity">Maternity Wear</option>
                    <option value="western">Western / Indo-Western</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase text-gray-300 block mb-1">Availability Status</label>
                  <select
                    value={availabilityStatus}
                    onChange={(e) => setAvailabilityStatus(e.target.value as any)}
                    className="w-full bg-brand-charcoal border border-brand-border rounded-xs py-2 px-3 text-xs text-white focus:border-brand-gold focus:outline-none"
                  >
                    <option value="AVAILABLE">AVAILABLE (In Boutique)</option>
                    <option value="CURRENTLY RENTED">CURRENTLY RENTED</option>
                  </select>
                </div>
              </div>

              {/* Cloudinary Image Upload Section */}
              <div className="space-y-2 border border-brand-border/60 bg-brand-charcoal/50 p-4 rounded-xs">
                <label className="text-xs font-semibold uppercase text-brand-gold flex items-center space-x-1.5">
                  <ImageIcon className="w-4 h-4" />
                  <span>Cloudinary Outfit Images</span>
                </label>

                {/* Upload Button */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <label className="cursor-pointer inline-flex items-center justify-center space-x-2 py-2 px-3 bg-brand-dark border border-brand-gold/60 text-brand-gold text-xs font-medium uppercase rounded-xs hover:bg-brand-gold hover:text-brand-dark transition-colors">
                    {isUploading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Upload className="w-4 h-4" />
                    )}
                    <span>{isUploading ? 'Uploading...' : 'Upload Image to Cloudinary'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      disabled={isUploading}
                      className="hidden"
                    />
                  </label>

                  <span className="text-[10px] text-gray-400 text-center sm:text-left">or enter Image URL below</span>
                </div>

                {uploadNotice && (
                  <p className="text-[11px] text-emerald-400 bg-emerald-950/40 p-2 rounded border border-emerald-500/30">
                    {uploadNotice}
                  </p>
                )}

                {/* Direct URL input */}
                <div className="flex items-center space-x-2 pt-1">
                  <div className="relative flex-1">
                    <input
                      type="url"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="https://res.cloudinary.com/... or image URL"
                      className="w-full bg-brand-dark border border-brand-border rounded-xs py-2 px-3 pl-8 text-xs text-white focus:border-brand-gold focus:outline-none"
                    />
                    <LinkIcon className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
                  </div>
                  <button
                    type="button"
                    onClick={handleAddImageUrl}
                    className="py-2 px-3 bg-brand-dark border border-brand-border text-gray-300 hover:text-white text-xs rounded-xs"
                  >
                    Add URL
                  </button>
                </div>

                {/* Attached Images Preview List */}
                {imageUrls.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {imageUrls.map((url, idx) => (
                      <div key={idx} className="relative group w-16 h-16 rounded overflow-hidden border border-brand-gold/40">
                        <img src={url} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(idx)}
                          className="absolute inset-0 bg-black/60 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="text-xs font-semibold uppercase text-gray-300 block mb-1">Description</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Outfit details, fabric specifications, work type..."
                  className="w-full bg-brand-charcoal border border-brand-border rounded-xs py-2 px-3 text-xs text-white focus:border-brand-gold focus:outline-none"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="rentalAvailable"
                  checked={rentalAvailable}
                  onChange={(e) => setRentalAvailable(e.target.checked)}
                  className="accent-brand-gold"
                />
                <label htmlFor="rentalAvailable" className="text-xs text-gray-300 uppercase tracking-wider">
                  Available for Rental Service
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-brand-gold text-brand-dark font-medium text-xs uppercase tracking-widest rounded-xs hover:bg-brand-goldLight transition-colors flex items-center justify-center space-x-2 shadow-gold-glow"
              >
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                <span>{editingProduct ? 'Update Outfit' : 'Save Outfit to Inventory'}</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
