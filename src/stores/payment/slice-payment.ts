import { createSlice } from "@reduxjs/toolkit";
import { PostMidtransPayment } from "./async-payment";

export interface initialPaymentState {
  loading: boolean;
  token: string;
}

const initialState: initialPaymentState = {
  loading: false,
  token: "",
};

const paymentSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(PostMidtransPayment.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload.content.token;
    });
  },
});

export default paymentSlice.reducer;
