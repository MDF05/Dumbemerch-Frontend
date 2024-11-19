import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductDTO } from "../../DTO/product-DTO";
import { GetCartAsync, PostCartAsync } from "./async-cart";
import products from "./../../dummy/product";
import { cart } from "../../DTO/cart-DTO";

export interface initialStateCart {
  countCartUser: number;
  carts: cart[];
  loading: boolean;
}

const initialState: initialStateCart = {} as initialStateCart;

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart(state, action: PayloadAction<initialStateCart>) {
      state.countCartUser = action.payload.countCartUser;
      state.carts = action.payload.carts;
      state.loading = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(PostCartAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.countCartUser = state.countCartUser + action.payload.content.addCart;
      })
      .addCase(PostCartAsync.rejected, (state) => {
        state.loading = false;
      })
      .addCase(PostCartAsync.pending, (state) => {
        state.loading = true;
      });
    builder
      .addCase(GetCartAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.carts = action.payload.content.cart;
        state.countCartUser = action.payload.content._count.cart;
      })
      .addCase(GetCartAsync.rejected, (state) => {
        state.loading = false;
      })
      .addCase(GetCartAsync.pending, (state) => {
        state.loading = true;
      });
  },
});

export const { setCart } = CartSlice.actions;

export default CartSlice.reducer;
