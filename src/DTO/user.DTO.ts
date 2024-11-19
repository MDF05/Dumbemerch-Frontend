import { ProductDTO } from "./product-DTO";

export interface UserDTO {
  id: number;
  email: string;
  role: string;
  cart: ProductDTO[];
  _count: {
    cart: number;
  };
}
