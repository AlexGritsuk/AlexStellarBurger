import { createSlice } from "@reduxjs/toolkit";
import { postOrder } from "./asyncThunk/postOrder";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IOrderState {
  orderNumber: number | null;
  orderRequest: boolean;
  orderFailed: boolean;
}

const initialState: IOrderState = {
  orderNumber: null,
  orderRequest: false,
  orderFailed: false,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.orderNumber = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postOrder.pending, (state) => {
        state.orderRequest = true;
        state.orderFailed = false;
      })
      .addCase(postOrder.fulfilled, (state, action: PayloadAction<number>) => {
        state.orderRequest = false;
        state.orderNumber = action.payload;
      })
      .addCase(postOrder.rejected, (state) => {
        state.orderRequest = false;
        state.orderFailed = true;
      });
  },
});

export const { clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
