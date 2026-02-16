import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IUser, IUserResponse } from "../../../utils/types";
import { fetchWithRefresh } from "../../../utils/api";
import { getCookie } from "./getUser";

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (userData: IUser) => {
    return await fetchWithRefresh<IUserResponse>("/auth/user", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: getCookie("accessToken") || "",
      },
      body: JSON.stringify({
        email: userData.email,
        name: userData.name,
        ...(userData.password ? { password: userData.password } : {}),
      }),
    });
  }
);
