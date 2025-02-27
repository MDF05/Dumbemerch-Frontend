import { createAsyncThunk } from "@reduxjs/toolkit";
import { ProductResponseDTO } from "../../DTO/product-DTO";
import { ProductSchema } from "../../schemas/product-schema";
import { apiV1 } from "../../lib/api-v1";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";

export const PostProductAsync = createAsyncThunk<ProductResponseDTO, ProductSchema | any>("/product/post", async (data, thunkAPI) => {
  try {
    const res = await apiV1.post("/product", data, { headers: { "Content-Type": "multipart/form-data" } });
    return res.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      toast.error(error?.response?.data.message);
    } else toast.error("Post data failed, please try again");
    return thunkAPI.rejectWithValue("failed post data");
  }
});

export const GetProductAsync = createAsyncThunk<ProductResponseDTO, { query?: string }>("/product/get", async (data, thunkAPI) => {
  try {
    const res = await apiV1.get(`/products?search=${data.query ? data.query : ""}`);
    return thunkAPI.fulfillWithValue(res.data);
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      toast.error(error?.response?.data.message);
    } else toast.error("Post data failed, please try again");
    return thunkAPI.rejectWithValue("failed post data");
  }
});

export const PutProductAsync = createAsyncThunk<ProductResponseDTO, ProductSchema | any>("/product/put", async (data, thunkAPI) => {
  try {
    const res = await apiV1.put(`/product/${data.productId}`, data.formData, { headers: { "Content-Type": "multipart/form-data" } });
    return res.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      toast.error(error?.response?.data.message);
    } else toast.error("Post data failed, please try again");
    return thunkAPI.rejectWithValue("failed post data");
  }
});

export const DeleteProduct = createAsyncThunk<ProductResponseDTO, { productId: string }>("/product/delete", async (data, thunkAPI) => {
  try {
    const res = await apiV1.delete(`/product/${data.productId}`);
    return res.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      toast.error(error?.response?.data.message);
    } else toast.error("Post data failed, please try again");
    return thunkAPI.rejectWithValue("failed post data");
  }
});
