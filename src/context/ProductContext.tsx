import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, PRODUCTS as DEFAULT_PRODUCTS } from '../data/products';
import { fetchProductsFromApi, createProductApi, updateProductApi, deleteProductApi } from '../services/api';

interface ProductContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  refreshProducts: () => Promise<void>;
  addProduct: (productData: Partial<Product>) => Promise<Product>;
  updateProduct: (id: string, productData: Partial<Product>) => Promise<Product>;
  deleteProduct: (id: string) => Promise<void>;
  toggleRentalStatus: (id: string) => Promise<void>;
  toggleAvailabilityStatus: (id: string) => Promise<void>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Helper to normalize product objects from API/MongoDB
function normalizeProduct(p: any): Product {
  return {
    ...p,
    id: p.id || p._id?.toString() || `prod-${Date.now()}`,
    rentalAvailable: Boolean(p.rentalAvailable),
    availabilityStatus: p.availabilityStatus || 'AVAILABLE',
  };
}

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(DEFAULT_PRODUCTS);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const rawData = await fetchProductsFromApi();
      const normalized = rawData.map(normalizeProduct);
      setProducts(normalized);
    } catch (err: any) {
      console.error('Error fetching products:', err);
      setError(err.message || 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const addProduct = async (productData: Partial<Product>): Promise<Product> => {
    try {
      const createdRaw = await createProductApi(productData);
      const created = normalizeProduct(createdRaw);
      setProducts((prev) => [created, ...prev]);
      return created;
    } catch (err: any) {
      const localProduct: Product = {
        id: `prod-${Date.now()}`,
        code: (productData.code || 'RR-NEW').toUpperCase(),
        name: productData.name || 'New Outfit',
        slug: (productData.name || 'new-outfit').toLowerCase().replace(/\s+/g, '-'),
        category: productData.category || 'bridal',
        occasion: productData.occasion || ['Wedding'],
        description: productData.description || '',
        images: productData.images && productData.images.length ? productData.images : ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=85&w=800'],
        sizes: productData.sizes || ['S', 'M', 'L'],
        rentalAvailable: productData.rentalAvailable !== undefined ? productData.rentalAvailable : true,
        availabilityStatus: productData.availabilityStatus || 'AVAILABLE',
        featured: productData.featured !== undefined ? productData.featured : true,
        tags: productData.tags || ['New Arrival'],
      };
      setProducts((prev) => [localProduct, ...prev]);
      return localProduct;
    }
  };

  const updateProduct = async (id: string, productData: Partial<Product>): Promise<Product> => {
    // 1. Optimistic instant update on local state
    setProducts((prev) =>
      prev.map((p) => {
        const pId = p.id || (p as any)._id;
        if (pId === id || p.code === id) {
          return { ...p, ...productData };
        }
        return p;
      })
    );

    // 2. Call backend API
    try {
      const updatedRaw = await updateProductApi(id, productData);
      const updated = normalizeProduct(updatedRaw);
      setProducts((prev) =>
        prev.map((p) => {
          const pId = p.id || (p as any)._id;
          if (pId === id || pId === updated.id || p.code === updated.code) {
            return updated;
          }
          return p;
        })
      );
      return updated;
    } catch (err: any) {
      console.warn('API update failed, keeping optimistic state update:', err);
      const fallbackTarget = products.find((p) => p.id === id || (p as any)._id === id);
      return { ...fallbackTarget, ...productData } as Product;
    }
  };

  const deleteProduct = async (id: string): Promise<void> => {
    setProducts((prev) => prev.filter((p) => p.id !== id && (p as any)._id !== id));
    try {
      await deleteProductApi(id);
    } catch (err) {
      console.warn('API delete error, deleted locally:', err);
    }
  };

  const toggleRentalStatus = async (id: string): Promise<void> => {
    const target = products.find((p) => p.id === id || (p as any)._id === id);
    if (!target) return;
    const nextRental = !target.rentalAvailable;
    await updateProduct(id, { rentalAvailable: nextRental });
  };

  const toggleAvailabilityStatus = async (id: string): Promise<void> => {
    const target = products.find((p) => p.id === id || (p as any)._id === id);
    if (!target) return;
    const nextStatus = target.availabilityStatus === 'AVAILABLE' ? 'CURRENTLY RENTED' : 'AVAILABLE';
    await updateProduct(id, { availabilityStatus: nextStatus });
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        refreshProducts: loadProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleRentalStatus,
        toggleAvailabilityStatus,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
