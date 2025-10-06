import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from '@/hooks/use-toast';

// Types
export interface CartItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image: string;
  rating?: number;
  reviewCount?: number;
  badge?: string;
  category?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  badge?: string;
  category?: string;
}

export interface CartContextType {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getItemQuantity: (id: string) => number;
  isInCart: (id: string) => boolean;
  getTotalSavings: () => number;
  getTotalWithShipping: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

const CART_STORAGE_KEY = 'wellness-cart';

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on initialization
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [items]);

  const addItem = (product: Product, quantity: number = 1) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.id === product.id);
      
      if (existingItem) {
        // Update existing item quantity
        const updatedItems = currentItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        
        toast({
          title: "Cart Updated",
          description: `${product.name} quantity updated to ${existingItem.quantity + quantity}`,
        });
        
        return updatedItems;
      } else {
        // Add new item
        const newItem: CartItem = {
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          originalPrice: product.originalPrice,
          quantity,
          image: product.image,
          rating: product.rating,
          reviewCount: product.reviewCount,
          badge: product.badge,
          category: product.category,
        };
        
        toast({
          title: "Added to Cart",
          description: `${product.name} has been added to your cart`,
        });
        
        return [...currentItems, newItem];
      }
    });
  };

  const removeItem = (id: string) => {
    setItems(currentItems => {
      const itemToRemove = currentItems.find(item => item.id === id);
      if (itemToRemove) {
        toast({
          title: "Removed from Cart",
          description: `${itemToRemove.name} has been removed from your cart`,
        });
      }
      return currentItems.filter(item => item.id !== id);
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }

    setItems(currentItems =>
      currentItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    toast({
      title: "Cart Cleared",
      description: "All items have been removed from your cart",
    });
  };

  const getItemQuantity = (id: string): number => {
    const item = items.find(item => item.id === id);
    return item ? item.quantity : 0;
  };

  const isInCart = (id: string): boolean => {
    return items.some(item => item.id === id);
  };

  const getTotalSavings = (): number => {
    return items.reduce((total, item) => 
      total + ((item.originalPrice || item.price) - item.price) * item.quantity, 0
    );
  };

  const getTotalWithShipping = (): number => {
    const shipping = subtotal > 75 ? 0 : 7.99;
    const tax = subtotal * 0.08;
    return subtotal + shipping + tax;
  };

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);

  const value: CartContextType = {
    items,
    itemCount,
    subtotal,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getItemQuantity,
    isInCart,
    getTotalSavings,
    getTotalWithShipping,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
