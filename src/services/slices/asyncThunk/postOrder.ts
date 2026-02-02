import { createAsyncThunk } from "@reduxjs/toolkit";
import { URL_API_ORDERS } from "../../../utils/vars";

interface IOrderResponse {
  name: string;
  order: {
    number: number;
  };
  success: boolean;
}

export const postOrder = createAsyncThunk<number, string[]>(
  "order/postOrder",
  async (ingredientIds) => {
    const response = await fetch(URL_API_ORDERS, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ingredients: ingredientIds }),
    });
    if (!response.ok) throw new Error("Ошибка сервера");
    const data: IOrderResponse = await response.json();
    return data.order.number;
  }
);
