import type { IIngredient } from "../../../utils/types";
import style from "./ingredientDetails.module.scss";

type TIngredientDetailsProps = {
  ingredient: IIngredient;
};

const IngredientDetails = ({ ingredient }: TIngredientDetailsProps) => {
  if (!ingredient) return null;
  return (
    <div className={style.container}>
      <img
        src={ingredient.image_large}
        alt={ingredient.name}
        className={`${style.image} mb-4`}
      />
      <h3 className="text text_type_main-medium mb-8">{ingredient.name}</h3>
      <ul className={style.nutrition_list}>
        <li className={style.nutrition_item}>
          <span className="text text_type_main-default text_color_inactive">
            Калории, ккал
          </span>
          <span className="text text_type_digits-default text_color_inactive">
            {ingredient.calories}
          </span>
        </li>
        <li className={style.nutrition_item}>
          <span className="text text_type_main-default text_color_inactive">
            Белки, г
          </span>
          <span className="text text_type_digits-default text_color_inactive">
            {ingredient.proteins}
          </span>
        </li>
        <li className={style.nutrition_item}>
          <span className="text text_type_main-default text_color_inactive">
            Жиры, г
          </span>
          <span className="text text_type_digits-default text_color_inactive">
            {ingredient.fat}
          </span>
        </li>
        <li className={style.nutrition_item}>
          <span className="text text_type_main-default text_color_inactive">
            Углеводы, г
          </span>
          <span className="text text_type_digits-default text_color_inactive">
            {ingredient.carbohydrates}
          </span>
        </li>
      </ul>
    </div>
  );
};

export default IngredientDetails;
