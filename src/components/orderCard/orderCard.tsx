import { type FC, useMemo } from "react";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./orderCard.module.scss";
import { useAppSelector } from "../../services/store";
import type { IIngredient, IOrder } from "../../utils/types";


interface IOrderCardProps {
  order: IOrder;
  isStatus?: boolean;
}

const OrderCard: FC<IOrderCardProps> = ({ order, isStatus = false }) => {

  if (!order || !order.ingredients) return null;


  const { ingredients: allIngredients } = useAppSelector( 
    (state) => state.ingredients
  );
  const orderIngredients = useMemo(() => {
    return order.ingredients
      .map((id) => allIngredients.find((item) => item._id === id))
      .filter((item): item is IIngredient => !!item);
  }, [order.ingredients, allIngredients]);


  const totalPrice = useMemo(() => {
    return orderIngredients.reduce((acc, item) => acc + item.price, 0);
  }, [orderIngredients]);

  const maxIcons = 6;
  const remains = orderIngredients.length - maxIcons;


  const statusText =
    order.status === "done"
      ? "Выполнен"
      : order.status === "pending"
      ? "Готовится"
      : "Создан";
  const statusStyle =
    order.status === "done" ? { color: "#00cccc" } : { color: "#F2F2F3" };

  return (
    <div className={`${style.card} p-6 mb-4`}>
      <div className={style.info}>
        <span className="text text_type_digits-default">#{order.number}</span>
        <span className="text text_type_main-default text_color_inactive">
          <FormattedDate date={new Date(order.createdAt)} />
        </span>
      </div>

      <h2 className="text text_type_main-medium mt-6 mb-2">{order.name}</h2>
      
      {isStatus && (
        <p className="text text_type_main-default mb-6" style={statusStyle}>
          {statusText}
        </p>
      )}

      <div className={style.details}>
        <ul className={style.ingredients}>
          {orderIngredients.slice(0, maxIcons).map((item, index) => (
            <li
              key={index}
              className={style.icon_container}
              style={{ zIndex: maxIcons - index }}
            >
              <img
                src={item.image_mobile}
                alt={item.name}
                className={style.icon}
              />
              {index === maxIcons - 1 && remains > 0 && (
                <span
                  className={`${style.remains} text text_type_main-default`}
                >
                  +{remains}
                </span>
              )}
            </li>
          ))}
        </ul>

        <div className={style.price}>
          <span className="text text_type_digits-default mr-2">
            {totalPrice}
          </span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
