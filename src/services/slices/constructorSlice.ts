import { createSlice, type PayloadAction, nanoid } from "@reduxjs/toolkit";
import type { IIngredient } from "../../utils/types";

export interface IConstructorIngredient extends IIngredient {
  id: string;
}

interface IConstructorState {
  bun: IIngredient | null;
  ingredients: IConstructorIngredient[];
}

const initialState: IConstructorState = {
  bun: null,
  ingredients: [],
};

const constructorSlice = createSlice({ 
  name: "burgerConstructor",
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<IConstructorIngredient>) => {
        if (action.payload.type === "bun") {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: IIngredient) => {
        return { payload: { ...ingredient, id: nanoid() } };
      },
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id != action.payload
      );
    },
    moveIngredient: (
      state,
      action: PayloadAction<{ hoverIndex: number; dragIndex: number }>
    ) => {
      const { hoverIndex, dragIndex } = action.payload;
      const dragItem = state.ingredients[dragIndex];
      state.ingredients.splice(dragIndex, 1);
      state.ingredients.splice(hoverIndex, 0, dragItem);
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    },
  },
});

export const {
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor,
} = constructorSlice.actions;
export default constructorSlice.reducer;
