import { createAction } from "@reduxjs/toolkit";

export const wsHistoryConnect = createAction<string, "HISTORY_CONNECT">(
  "HISTORY_CONNECT"
);
export const wsHistoryDisconnect = createAction("HISTORY_DISCONNECT");

export const wsHistoryConnecting = createAction("HISTORY_WS_CONNECTING");
export const wsHistoryOpen = createAction("HISTORY_WS_OPEN");
export const wsHistoryClose = createAction("HISTORY_WS_CLOSE");
export const wsHistoryError = createAction<string, "HISTORY_WS_ERROR">(
  "HISTORY_WS_ERROR"
);
export const wsHistoryMessage = createAction<any, "HISTORY_WS_MESSAGE">(
  "HISTORY_WS_MESSAGE"
);

export const historyActionTypes = {
  wsConnect: wsHistoryConnect,
  wsDisconnect: wsHistoryDisconnect,
  wsConnecting: wsHistoryConnecting,
  onOpen: wsHistoryOpen,
  onClose: wsHistoryClose,
  onError: wsHistoryError,
  onMessage: wsHistoryMessage,
};
