import type { Middleware, MiddlewareAPI } from "@reduxjs/toolkit";
import type { TWSActionTypes } from "../../utils/types";
import type { AppDispatch, RootState } from "../store";

export const socketMiddleware = (wsActions: TWSActionTypes): Middleware => {
  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action) => {
      const { dispatch } = store;

      const { wsConnect, wsDisconnect, onOpen, onClose, onError, onMessage } =
        wsActions;

      if (wsConnect.match(action)) {
        socket = new WebSocket(action.payload);
        socket.onopen = (event) => dispatch(onOpen(event));
        socket.onerror = (event) => dispatch(onError(event));
        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch(onMessage(parsedData));
        };
        socket.onclose = () => dispatch(onClose());
      }

      if (socket && wsDisconnect.match(action)) {
        socket.close();
        socket = null;
      }

      next(action);
    };
  };
};
