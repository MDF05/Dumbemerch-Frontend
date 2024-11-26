import { createAsyncThunk } from "@reduxjs/toolkit";
import { responseDTO } from "../../DTO/response-DTO";
import { TransactionDTO } from "../../DTO/transaction-DTO";
import { apiV1 } from "../../lib/api-v1";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";

export const PostTransaction = createAsyncThunk<responseDTO<TransactionDTO>, TransactionDTO[]>("/post/transaction", async (data, thunkAPI) => {
  try {
    const res = await apiV1.post(`/transaction`, data);
    return thunkAPI.fulfillWithValue(res.data);
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      toast.error(error?.response?.data.message);
    } else toast.error("Post data failed, please try again");
    return thunkAPI.rejectWithValue("failed post data");
  }
});
