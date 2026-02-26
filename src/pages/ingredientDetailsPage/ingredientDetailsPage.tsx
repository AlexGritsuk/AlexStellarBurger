import IngredientDetails from '../../components/modals/ingredientDetails/ingredientDetails';
import style from './ingredientDetailsPage.module.scss'



export const IngredientDetailsPage = () => (
  <div className={style.page_container}>
    <h1 className="text text_type_main-large mt-30">Детали ингредиента</h1>
    <IngredientDetails />
  </div>
);