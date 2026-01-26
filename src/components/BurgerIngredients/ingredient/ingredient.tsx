import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import type { IIngredients } from "../../../utils/types";
import style from "./ingredient.module.scss";
import clsx from "clsx";

type Props = {
  ingredient: IIngredients;
};

const Ingredient = ({ ingredient }: Props) => {
  return (
    <li>
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
