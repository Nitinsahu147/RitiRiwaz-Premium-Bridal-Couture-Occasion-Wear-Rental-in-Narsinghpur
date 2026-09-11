import { Product, PRODUCTS } from '../data/products';

const getApiBaseUrl = () => {
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }
  if (typeof window !== 'undefined' && window.location) {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return `http://${window.location.hostname}:5000/api`;
    }
  }
  return 'https://ritiriwaz-premium-bridal-couture.onrender.com/api';
};

const API_BASE_URL = getApiBaseUrl();

export interface Enquiry {
  id: string;
  customerName: string;
  phone: string;
  productName: string;
  eventDate: string;
  preferredSize: string;
  occasion: string;
  customMessage?: string;
  status: 'New' | 'Contacted' | 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
}

// Helper to handle API response
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorText = await response.text();
    let errorMessage = `HTTP error ${response.status}`;
    try {
      const parsed = JSON.parse(errorText);
      if (parsed.error) errorMessage = parsed.error;
    } catch {
      if (errorText) errorMessage = errorText;
    }
    throw new Error(errorMessage);
  }
  return response.json();
}

// ---------------- PRODUCTS API ----------------

export async function fetchProductsFromApi(): Promise<Product[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/products`);
    if (!res.ok) throw new Error('Backend failed');
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) {
      return data;
    }
    return PRODUCTS;
  } catch (err) {
    console.warn('Backend API unreachable or offline, using fallback catalog:', err);
    return PRODUCTS;
  }
}

export async function createProductApi(productData: Partial<Product>): Promise<Product> {
  const res = await fetch(`${API_BASE_URL}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData),
  });
  return handleResponse<Product>(res);
}

export async function updateProductApi(id: string, productData: Partial<Product>): Promise<Product> {
  const res = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData),
  });
  return handleResponse<Product>(res);
}

export async function deleteProductApi(id: string): Promise<{ message: string; id: string }> {
  const res = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: 'DELETE',
  });
  return handleResponse<{ message: string; id: string }>(res);
}

// ---------------- CLOUDINARY UPLOAD API ----------------

export async function uploadImageApi(file: File): Promise<{ url: string; notice?: string }> {
  const formData = new FormData();
  formData.append('image', file);

  const res = await fetch(`${API_BASE_URL}/upload`, {
    method: 'POST',
    body: formData,
  });
  return handleResponse<{ url: string; notice?: string }>(res);
}

export async function deleteImageApi(url: string): Promise<{ message: string; url: string }> {
  const res = await fetch(`${API_BASE_URL}/upload/delete`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url }),
  });
  return handleResponse<{ message: string; url: string }>(res);
}

// ---------------- ENQUIRIES API ----------------

export async function fetchEnquiriesApi(): Promise<Enquiry[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/enquiries`);
    if (!res.ok) throw new Error('Failed to fetch enquiries');
    return await res.json();
  } catch (err) {
    console.warn('Failed fetching enquiries from API:', err);
    return [];
  }
}

export async function createEnquiryApi(enquiryData: {
  customerName: string;
  phone: string;
  productName: string;
  eventDate: string;
  preferredSize: string;
  occasion: string;
  customMessage?: string;
}): Promise<Enquiry> {
  const res = await fetch(`${API_BASE_URL}/enquiries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(enquiryData),
  });
  return handleResponse<Enquiry>(res);
}

export async function updateEnquiryStatusApi(id: string, status: Enquiry['status']): Promise<Enquiry> {
  const res = await fetch(`${API_BASE_URL}/enquiries/${id}/status`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  return handleResponse<Enquiry>(res);
}

export async function deleteEnquiryApi(id: string): Promise<{ message: string; id: string }> {
  const res = await fetch(`${API_BASE_URL}/enquiries/${id}`, {
    method: 'DELETE',
  });
  return handleResponse<{ message: string; id: string }>(res);
}
