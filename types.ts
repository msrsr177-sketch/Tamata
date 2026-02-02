
export type Category = 'software' | 'design' | 'ebooks' | 'templates' | 'all';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  rating: number;
  sales: number;
  imageUrl: string;
  badge?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
