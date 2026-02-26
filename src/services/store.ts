import { configureStore } from "@reduxjs/toolkit";
import {
  useDispatch,
  type TypedUseSelectorHook,
  useSelector,
} from "react-redux";

import ingredientsReducer from "./slices/ingredientsSlice";
import constructorReducer from "./slices/constructorSlice";
import orderReducer from "./slices/orderSlice";
import userReducer from "./slices/userSlice";
import feedReducer from "./slices/feedSlice";
import historyReducer from "./slices/historySlice";
import todoReducer from "./slices/todosSlice";

import { socketMiddleware } from "./middleware/socketMiddleware";
import {
  wsConnect,
  wsDisconnect,
  wsConnecting,
  wsOpen,
  wsClose,
  wsError,
  wsMessage,
} from "./actions/feedActions";
import { historyActionTypes } from "./actions/historyAction";

const feedActions = {
  wsConnect,
  wsDisconnect,
  wsConnecting,
  onOpen: wsOpen,
  onClose: wsClose,
  onError: wsError,
  onMessage: wsMessage,
};

export const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    burgerConstructor: constructorReducer,
    order: orderReducer,
    user: userReducer,
    feed: feedReducer,
    history: historyReducer,
    todo: todoReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      socketMiddleware(feedActions),
      socketMiddleware(historyActionTypes)
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
