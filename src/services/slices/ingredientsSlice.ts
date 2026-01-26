import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IIngredients } from "../../utils/types";
import { fetchIngredients } from "./asyncThunk/fetchIngredients";

interface IIngredientsState {
  ingredients: IIngredients[];
  isLoading: boolean;
  error: string | null | undefined;
}

const initialState: IIngredientsState = {
  ingredients: [],
  isLoading: false,
  error: null,
};

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchIngredients.fulfilled,
        (state, action: PayloadAction<IIngredients[]>) => {
          state.isLoading = false;
          state.ingredients = action.payload;
        }
      )
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const getIngredientsState = (state: {
  ingredients: IIngredientsState;
}) => state.ingredients;
export const getAllIngredients = (state: { ingredients: IIngredientsState }) =>
  state.ingredients.ingredients;
export const getIngredientsLoading = (state: { ingredients: IIngredientsState }) =>
  state.ingredients.isLoading;

export default ingredientsSlice.reducer;
