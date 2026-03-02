import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IIngredient } from "../../utils/types";
import { fetchIngredients } from "./asyncThunk/fetchIngredients";

interface IIngredientsState {
  ingredients: IIngredient[];
  isLoading: boolean;
  currentIngredient: IIngredient | null;
  currentTab: string;
  error: string | null | undefined;
}

const initialState: IIngredientsState = {
  ingredients: [],
  isLoading: false,
  currentIngredient: null,
  currentTab: "bun",
  error: null,
};

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    setCurrentIngredient: (state, action: PayloadAction<IIngredient>) => {
      state.currentIngredient = action.payload;
    },
    clearCurrentIngredient: (state) => {
      state.currentIngredient = null;
    },
    setTab: (state, action: PayloadAction<string>) => {
        state.currentTab = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchIngredients.fulfilled,
        (state, action: PayloadAction<IIngredient[]>) => {
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
export const getIngredientsLoading = (state: {
  ingredients: IIngredientsState;
}) => state.ingredients.isLoading;

export const { setCurrentIngredient, clearCurrentIngredient, setTab } =
  ingredientsSlice.actions;
export default ingredientsSlice.reducer;
