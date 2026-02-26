import type {
  ActionCreatorWithPayload,
  ActionCreatorWithoutPayload,
} from "@reduxjs/toolkit";

export interface IIngredient {
  _id: string;
  name: string;
  type: "bun" | "main" | "sauce";
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  quantity?: number;
  uuid?: string | undefined;
}

export interface IIngredientsResponse {
  success: boolean;
  data: IIngredient[];
}

export interface TabShape {
  name: string;
  type: string;
}

export interface IUserResponse {
  success: boolean;
  user: {
    email: string;
    name: string;
    password?: string;
  };
}

export interface IUser {
  email: string;
  name: string;
  password?: string;
}

export interface IResponse {
  success: boolean;
  message?: string;
}

export interface IUserResponse extends IResponse {
  user: IUser;
}

export interface ILoginResponse extends IUserResponse {
  accessToken: string;
  refreshToken: string;
}

export interface IOrderResponse extends IResponse {
  order: { number: number };
}

export type TWSActionTypes = {
  wsConnect: ActionCreatorWithPayload<string>;
  wsDisconnect: ActionCreatorWithoutPayload;
  onOpen: ActionCreatorWithPayload<any>;
  onClose: ActionCreatorWithoutPayload;
  onError: ActionCreatorWithPayload<any>;
  onMessage: ActionCreatorWithPayload<any>;
};

export interface IOrder {
  _id: string;

  ingredients: string[];

  status: "done" | "pending" | "created";

  number: number;

  name: string;

  createdAt: string;

  updatedAt: string;
}

export interface IOrderList {
  success: boolean;
  orders: IOrder[];
  total: number;
  totalToday: number;
}
