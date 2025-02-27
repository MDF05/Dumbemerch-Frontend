import { createAsyncThunk } from "@reduxjs/toolkit";
import { responseDTO } from "./../../DTO/response-DTO";
import { CartDTO, PostCartDTO } from "./../../DTO/cart-DTO";
import { apiV1 } from "../../lib/api-v1";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";

export const GetCartAsync = createAsyncThunk<responseDTO<CartDTO>, void>("/get/cart", async (_, thunkAPI) => {
  try {
    const res = await apiV1.get(`/cart`);
    return res.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      toast.error(error?.response?.data.message);
    } else toast.error("Post data failed, please try again");
    return thunkAPI.rejectWithValue("failed post data");
  }
});

export const PostCartAsync = createAsyncThunk<responseDTO<PostCartDTO>, { productId: string }>("/get/post", async (data, thunkAPI) => {
  try {
    const res = await apiV1.post(`/cart/${data.productId}`);
    return res.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      toast.error(error?.response?.data.message);
    } else toast.error("Post data failed, please try again");
    return thunkAPI.rejectWithValue("failed post data");
  }
});
