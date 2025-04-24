export interface CartItem {
  productVariantId: string;
  productName: string;
  sizeName: string;
  colorName: string;
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
