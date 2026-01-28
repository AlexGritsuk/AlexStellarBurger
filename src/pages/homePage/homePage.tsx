import { DndProvider } from "react-dnd";
import BurgerConstructor from "../../components/BurgerConstructor/burgerConstructor";
import BurgerIngredients from "../../components/BurgerIngredients/burgerIngredients";
import style from "./homePage.module.scss";
import { HTML5Backend } from "react-dnd-html5-backend";

const HomePage = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <main className={`${style.main} pt-10 pl-5 pr-5`}>
        <section className={style.mainConstructor}>
          <BurgerIngredients />
          <BurgerConstructor />
        </section>
      </main>
    </DndProvider>
  );
};

export default HomePage;
