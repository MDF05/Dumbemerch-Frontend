import { createSlice } from "@reduxjs/toolkit";
import { TransactionDTO } from "../../DTO/transaction-DTO";
import { PostTransaction } from "./async-transaction";

interface InitialState {
  loading: boolean;
  transaction: TransactionDTO[];
}

const initialState: InitialState = {
  loading: false,
  transaction: [],
};

const TransactionSlice = createSlice({
  name: "Transaction",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(PostTransaction.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(PostTransaction.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(PostTransaction.pending, (state) => {
      state.loading = true;
    });
  },
});

export default TransactionSlice.reducer;
