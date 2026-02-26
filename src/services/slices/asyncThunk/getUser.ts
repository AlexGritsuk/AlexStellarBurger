import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchWithRefresh } from "../../../utils/api";
import type { IUserResponse } from "../../../utils/types";

export function getCookie(name: string) {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}()\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export const getUser = createAsyncThunk("user/getUser", async () => {
  return await fetchWithRefresh<IUserResponse>("/auth/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: getCookie("accessToken"),
    },
  });
});
