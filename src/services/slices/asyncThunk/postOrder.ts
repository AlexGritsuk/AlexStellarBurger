import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchWithRefresh } from "../../../utils/api"; 
import { getCookie } from "./getUser"; 

interface IOrderResponse {
  name: string;
  order: {
    number: number;
  };
  success: boolean;
}

export const postOrder = createAsyncThunk<
  number,
  string[],
  { rejectValue: string }
>("order/postOrder", async (ingredientIds, { rejectWithValue }) => {
  try {
   
    const data = await fetchWithRefresh<IOrderResponse>("/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
       
        Authorization: getCookie("accessToken") || "",
      },
      body: JSON.stringify({ ingredients: ingredientIds }),
    });

    return data.order.number;
  } catch (error: any) {
    
    return rejectWithValue(error.message || "Ошибка при создании заказа");
  }
});
