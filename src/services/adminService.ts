import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Create axios instance for admin API
const adminApi = axios.create({
  baseURL: `${API_BASE_URL}/api/admin`,
  timeout: 30000,
});

// Add auth interceptor
adminApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('np_auth_token');
  const isLocalAdmin = localStorage.getItem('np_local_admin') === 'true';
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else if (isLocalAdmin) {
    // Send local admin header for development
    config.headers['x-local-admin'] = 'true';
  }
  
  return config;
});

// Response interceptor for error handling
adminApi.interceptors.response.use(
  (response) => response,
  (error) => {
    // Check if user is local admin before redirecting
    const isLocalAdmin = localStorage.getItem('np_local_admin') === 'true';
    
    // Only redirect on 401/403 if we're not already on the login page and not local admin
    if ((error.response?.status === 401 || error.response?.status === 403) && 
        !window.location.pathname.includes('admin-login') && !isLocalAdmin) {
      console.warn('Admin API auth failed, redirecting to login');
      localStorage.removeItem('np_auth_token');
      localStorage.removeItem('np_local_admin');
      window.location.href = '/admin-login';
    }
    return Promise.reject(error);
  }
);

export interface DashboardStats {
  overview: {
    totalUsers: number;
    totalProducts: number;
    totalOrders: number;
    totalRevenue: number;
    pendingOrders: number;
    lowStockProducts: number;
  };
  recentOrders: Array<{
    id: string;
    orderNumber: string;
    customerName: string;
    customerEmail: string;
    status: string;
    paymentStatus: string;
    totalAmount: number;
    itemCount: number;
    createdAt: string;
  }>;
  topProducts: Array<{
    product: {
      id: string;
      name: string;
      price: number;
      images: Array<{ url: string }>;
    };
    totalSold: number;
    orderCount: number;
  }>;
}

export interface Order {
  id: string;
  orderNumber: string;
  status: string;
  paymentStatus: string;
  totalAmount: number;
  createdAt: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  shippingAddress: any;
  items: Array<{
    id: string;
    quantity: number;
    price: number;
    total: number;
    product: {
      id: string;
      name: string;
      images: Array<{ url: string }>;
    };
  }>;
  payments: any[];
  notes?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'CUSTOMER' | 'ADMIN' | 'SUPER_ADMIN';
  isActive: boolean;
  createdAt: string;
  orderCount: number;
  reviewCount: number;
}

export interface AdminProduct {
  id: string;
  name: string;
  slug: string;
  sku: string;
  price: number;
  comparePrice?: number;
  quantity: number;
  isActive: boolean;
  isFeatured: boolean;
  createdAt: string;
  category: {
    id: string;
    name: string;
  };
  images: Array<{
    url: string;
    altText?: string;
  }>;
  orderCount: number;
  reviewCount: number;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

// Dashboard Analytics
export const getDashboardStats = async (): Promise<DashboardStats> => {
  const response = await adminApi.get('/dashboard/stats');
  return response.data.data;
};

// Order Management
export const getAllOrders = async (params?: {
  page?: number;
  limit?: number;
  status?: string;
  paymentStatus?: string;
  search?: string;
}) => {
  const response = await adminApi.get('/orders', { params });
  return {
    orders: response.data.data.orders as Order[],
    pagination: response.data.data.pagination as Pagination & { totalOrders: number },
  };
};

export const updateOrderStatus = async (
  orderId: string,
  data: {
    status?: string;
    paymentStatus?: string;
    notes?: string;
  }
): Promise<Order> => {
  const response = await adminApi.put(`/orders/${orderId}`, data);
  return response.data.data.order;
};

// User Management
export const getAllUsers = async (params?: {
  page?: number;
  limit?: number;
  role?: string;
  search?: string;
  isActive?: boolean;
}) => {
  const response = await adminApi.get('/users', { params });
  return {
    users: response.data.data.users as User[],
    pagination: response.data.data.pagination as Pagination & { totalUsers: number },
  };
};

export const updateUserStatus = async (
  userId: string,
  data: {
    isActive?: boolean;
    role?: string;
  }
): Promise<User> => {
  const response = await adminApi.put(`/users/${userId}`, data);
  return response.data.data.user;
};

// Product Management
export const getAdminProducts = async (params?: {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  status?: string;
}) => {
  const response = await adminApi.get('/products', { params });
  return {
    products: response.data.data.products as AdminProduct[],
    pagination: response.data.data.pagination as Pagination & { totalProducts: number },
  };
};

export const createProduct = async (productData: {
  name: string;
  slug: string;
  description?: string;
  shortDescription?: string;
  sku: string;
  price: number;
  comparePrice?: number;
  costPrice?: number;
  categoryId: string;
  quantity?: number;
  minQuantity?: number;
  weight?: number;
  dimensions?: string;
  isFeatured?: boolean;
  metaTitle?: string;
  metaDescription?: string;
  tags?: string[];
  images?: Array<{
    url: string;
    altText?: string;
  }>;
}): Promise<AdminProduct> => {
  const response = await adminApi.post('/products', productData);
  return response.data.data.product;
};

export const updateProduct = async (
  productId: string,
  productData: Partial<{
    name: string;
    slug: string;
    description: string;
    shortDescription: string;
    sku: string;
    price: number;
    comparePrice: number;
    costPrice: number;
    categoryId: string;
    quantity: number;
    minQuantity: number;
    weight: number;
    dimensions: string;
    isFeatured: boolean;
    metaTitle: string;
    metaDescription: string;
    tags: string[];
    images: Array<{
      url: string;
      altText?: string;
    }>;
  }>
): Promise<AdminProduct> => {
  const response = await adminApi.put(`/products/${productId}`, productData);
  return response.data.data.product;
};

export const deleteProduct = async (productId: string): Promise<void> => {
  await adminApi.delete(`/products/${productId}`);
};

// Helper function to get auth token
export const getAuthToken = (): string | null => {
  return localStorage.getItem('np_auth_token');
};

// Helper function to check if user is admin
export const isAdminLoggedIn = (): boolean => {
  return !!(getAuthToken() || localStorage.getItem('np_local_admin'));
};

// Get categories for product creation
export const getCategories = async () => {
  try {
    const response = await adminApi.get('/categories');
    return response.data.data.categories;
  } catch (error) {
    // Fallback categories if API fails
    return [
  // Removed Supplements, Wellness, Beauty, Health, Nutrition
    ];
  }
};
