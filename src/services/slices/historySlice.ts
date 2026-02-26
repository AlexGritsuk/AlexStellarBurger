import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { wsClose, wsError, wsMessage, wsOpen } from "../actions/feedActions";

interface IHistorySliceState {
  orders: any[];
  total: number;
  totalToday: number;
  status: string;
}

const initialState: IHistorySliceState = {
  orders: [],
  total: 0,
  totalToday: 0,
  status: "offline",
};

const historySlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    setHistoryData: (state, action: PayloadAction<any>) => {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(wsOpen, (state) => {
        state.status = "online";
      })
      .addCase(wsClose, (state) => {
        state.status = "offline";
      })
      .addCase(wsError, (state) => {
        state.status = "error";
      })
      .addCase(wsMessage, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      });
  },
});

export const { setHistoryData } = historySlice.actions;
export default historySlice.reducer;
