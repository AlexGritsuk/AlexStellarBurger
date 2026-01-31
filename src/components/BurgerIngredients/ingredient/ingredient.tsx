import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import type { IIngredient } from "../../../utils/types";
import style from "./ingredient.module.scss";
import { useDrag } from "react-dnd";
import clsx from "clsx";

type Props = {
  ingredient: IIngredient;
  onClick?: any;
};

const Ingredient = ({ ingredient, onClick }: Props) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: "ingredient",
    item: ingredient,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  return (
    <li
      ref={(node) => {
        dragRef(node);
      }}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      onClick={onClick}
    >
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
    </li>
  );
};

export default Ingredient;
