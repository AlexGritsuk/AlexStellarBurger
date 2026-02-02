export const INGREDIENTS = "ingredients";

//API

export const SERVER_CONFIG = {
  BASE_URL: `https://norma.education-services.ru/api/`,
  HEADERS: {
    "Content-Type": "application/json",
  },
};

export const URL_API = "https://norma.education-services.ru/api/ingredients";
export const URL_API_ORDERS = "https://norma.education-services.ru/api/orders";

export const ingredientTabs = [
  {
    name: "Булки",
    type: "bun",
  },
  {
    name: "Соусы",
    type: "sauce",
  },
  {
    name: "Начинки",
    type: "main",
  },
];

export const TABS = {
  BUN: "bun",
  MAIN: "main",
  SAUCE: "sauce",
};
