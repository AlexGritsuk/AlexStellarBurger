import { createAsyncThunk } from "@reduxjs/toolkit";
import { URL_API } from "../../../utils/vars";
import type { IIngredient } from "../../../utils/types";

export const fetchIngredients = createAsyncThunk<
  IIngredient[],
  void,
  { rejectValue: string }
>("ingredients/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(URL_API);
    if (!response.ok) throw new Error("Ошибка сети");
    const data = await response.json();
    return data.data;
  } catch (error: any) {
    return rejectWithValue(error.message || "Неизвестная ошибка");
  }
});
