export interface CartItem {
  productId: string;
  productName: string;
  quantity: number;
  image: string;
  price: number;
  totalPrice: number;
}

// cart.model.ts
export interface Cart {
  userId: string;
  items: CartItem[];
}