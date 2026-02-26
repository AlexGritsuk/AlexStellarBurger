import { useParams } from "react-router-dom";
import style from "./ingredientDetails.module.scss";
import { useAppSelector } from "../../../services/store";
import { useMemo } from "react";

const IngredientDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { ingredients } = useAppSelector((state) => state.ingredients);
  const ingredient = useMemo(() => {
    return ingredients.find((item) => item._id === id);
  }, [ingredients, id]);


   if (ingredients.length === 0) {
     return (
       <p className="text text_type_main-medium mt-30">
         Загружаем данные с орбиты...
       </p>
     );
   }

  if (!ingredient) {
    return (
      <p className="text text_type_main-medium mt-30">Ингредиент не найден</p>
    );
  }
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
