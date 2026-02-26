import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { wsClose, wsError, wsMessage, wsOpen } from "../actions/feedActions";

interface IFeedState {
  orders: any[];
  total: number;
  totalToday: number;
  status: string;
}

const initialState: IFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  status: "offline",
};

const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    setFeedData: (state, action: PayloadAction<any>) => {
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

export const { setFeedData } = feedSlice.actions;
export default feedSlice.reducer;
