export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  category: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  quantity?: number;
  featured?: boolean;
}

export interface CartItem extends Product {
  cartQuantity: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  isAdmin?: boolean;
}

export interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault?: boolean;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  address: Address;
  createdAt: string;
  updatedAt: string;
}

export type ViewMode = 'grid' | 'list';