import { createAsyncThunk } from "@reduxjs/toolkit";
import { URL_API } from "../../../utils/vars";
import type { IIngredient} from "../../../utils/types";



//1, create thunk
export const fetchIngredients = createAsyncThunk<
  IIngredient[],
  void,
  { rejectValue: string }
>(
  "ingredients/fetchAll", // для Devtools
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(URL_API);
      if (!response.ok) throw new Error("Ошибка сети");
      const data = await response.json();
      return data.data; // Это попадет в action.payload
    } catch (error: any) {
      return rejectWithValue(error.message || "Неизвестная ошибка");
    }
  }
);
