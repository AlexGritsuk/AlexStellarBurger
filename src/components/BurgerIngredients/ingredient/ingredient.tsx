import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import type { IIngredient } from "../../../utils/types";
import style from "./ingredient.module.scss";
import { useDrag } from "react-dnd";
import clsx from "clsx";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation } from "react-router-dom";

type Props = {
  ingredient: IIngredient;
  onClick?: any;
  count?: number;
};

const Ingredient = ({ ingredient, onClick, count }: Props) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: "ingredient",
    item: ingredient,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const location = useLocation();
  return (
    <li
      ref={(node) => {
        dragRef(node);
      }}
      className={style.ingredient}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      onClick={onClick}
    >
      <Link
        key={ingredient._id}
        to={`/ingredients/${ingredient._id}`}
        state={{ background: location }}
        className={style.link}
      >
        {count && count > 0 && (
          <Counter count={count} size="default" extraClass="m-1" />
        )}
        <picture>
          <img
            src={ingredient.image}
            alt={ingredient.name}
            className={style.image}
          />
        </picture>
        <div className={style.price}>
          <span className="text text_type_digits-default">
            {ingredient.price}
          </span>
          <CurrencyIcon type="primary" />
        </div>
        <h3 className={clsx(style.name, "text", "text_type_main-default")}>
          {ingredient.name}
        </h3>
      </Link>
    </li>
  );
};

export default Ingredient;
