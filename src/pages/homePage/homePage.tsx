import BurgerConstructor from "../../components/BurgerConstructor/burgerConstructor";
import BurgerIngredients from "../../components/BurgerIngredients/burgerIngredients";
import style from "./homePage.module.scss";

const HomePage = () => {
  return (
    <main className={`${style.main} pt-10 pl-5 pr-5`}>
      <section className={style.mainConstructor}>
        <BurgerIngredients />
        <BurgerConstructor />
      </section>
    </main>
  );
};

export default HomePage;
