import { createAction } from "@reduxjs/toolkit";


export const wsConnect = createAction<string, "FEED_CONNECT">("FEED_CONNECT");
export const wsDisconnect = createAction("FEED_DISCONNECT");


export const wsConnecting = createAction("FEED_WS_CONNECTING");
export const wsOpen = createAction("FEED_WS_OPEN");
export const wsClose = createAction("FEED_WS_CLOSE");
export const wsError = createAction<string, "FEED_WS_ERROR">("FEED_WS_ERROR");
export const wsMessage = createAction<any, "FEED_WS_MESSAGE">(
  "FEED_WS_MESSAGE"
);

