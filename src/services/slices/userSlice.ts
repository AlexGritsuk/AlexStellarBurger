import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { IUser } from "../../utils/types";
import { updateUser } from "./asyncThunk/updateUser";
import { getUser } from "./asyncThunk/getUser";

interface IUserState {
  data: IUser | null;
  isAuthChecked: boolean;
}

const initialState: IUserState = {
  data: null,
  isAuthChecked: false,
};

const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser | null>) => {
      state.data = action.payload;
      state.isAuthChecked = true;
    },
    setAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(getUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.isAuthChecked = true;
      })
      .addCase(getUser.rejected, (state) => {
        state.data = null;
        state.isAuthChecked = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.data = action.payload.user;
        }
      })
      .addCase(updateUser.rejected, (_state, action) => {
        console.error("Ошибка обновления пользователя:", action.error);
      });
  },
});

export const { setUser, setAuthChecked } = usersSlice.actions;
export default usersSlice.reducer;
