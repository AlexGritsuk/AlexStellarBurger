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
