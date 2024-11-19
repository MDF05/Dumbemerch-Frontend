import { ProductDTO } from "./product-DTO";

export interface Cart {
  countItem?: number;
  product: ProductDTO;
}

export interface CartDTO {
  cart: Cart[];
  _count: {
    cart: number;
  };
}

export interface PostCartDTO {
  addCart: number;
  countItem: number;
  createdAt: string;
  id: number;
  productId: number;
  updatedAt: string;
  userId: number;
}
