import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppSelector } from "../../services/store";
import style from "./orderInfo.module.scss";
import type { IIngredient } from "../../utils/types";

const OrderInfo = () => {  
  const { ingredients: allIngredients } = useAppSelector(
    (state) => state.ingredients
  );

 
  const order = {
    number: "#034536",
    name: "Black Hole Spicy Burger",
    status: "done",
    ingredients: ["643d69a5c3f7b9001cfa093c", "643d69a5c3f7b9001cfa0941"],
  };

  interface IOrderIngredient extends IIngredient {
    count: number;
  }


  const orderIngredients = order.ingredients.reduce(
    (acc: Record<string, IOrderIngredient>, id) => {
      const item = allIngredients.find((i) => i._id === id);
      if (!item) return acc;
      if (!acc[id]) acc[id] = { ...item, count: 0 };
      acc[id].count++;
      return acc;
    },
    {}
  );

  const ingredientsList = Object.values(orderIngredients);
  const totalPrice = ingredientsList.reduce(
    (acc: number, item: any) => acc + item.price * item.count,
    0
  );

  return (
    <div className={style.container}>
      <span className="text text_type_digits-default mb-10">
        #{order.number}
      </span>
      <h2 className="text text_type_main-medium mb-3">{order.name}</h2>
      <span className={`${style.status} text text_type_main-default mb-15`}>
        {order.status === "done" ? "Выполнен" : "Готовится"}
      </span>

      <p className="text text_type_main-medium mb-6">Состав:</p>

      <ul className={`${style.list} custom-scroll mb-10`}>
        {ingredientsList.map((item: any) => (
          <li key={item._id} className={style.item}>
            <div className={style.icon_box}>
              <img
                src={item.image_mobile}
                alt={item.name}
                className={style.icon}
              />
            </div>
            <p className="text text_type_main-default ml-4">{item.name}</p>
            <div className={style.price_box}>
              <span className="text text_type_digits-default mr-2">
                {item.count} x {item.price}
              </span>
              <CurrencyIcon type="primary" />
            </div>
          </li>
        ))}
      </ul>

      <div className={style.footer}>
        <span className="text text_type_main-default text_color_inactive">
          <FormattedDate date={new Date()} />
        </span>
        <div className={style.price_box}>
          <span className="text text_type_digits-default mr-2">
            {totalPrice}
          </span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default OrderInfo;
