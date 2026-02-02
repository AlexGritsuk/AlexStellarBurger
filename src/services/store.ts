import { configureStore } from "@reduxjs/toolkit";
import {
  useDispatch,
  type TypedUseSelectorHook,
  useSelector,
} from "react-redux";
import ingredientsReducer from "./slices/ingredientsSlice";
import constructorReducer from "./slices/constructorSlice";
import orderSlice from "./slices/orderSlice";

export const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    burgerConstructor: constructorReducer,
    order: orderSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
