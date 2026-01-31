import { useCallback, useEffect, useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useAppDispatch, useAppSelector } from "../../services/store";

import clsx from "clsx";
import style from "./burgerIngredients.module.scss";
import Tabs from "../tabs/tabs";

import { TABS, ingredientTabs } from "../../utils/vars";
import type { IIngredient, TabShape } from "../../utils/types";
import { fetchIngredients } from "../../services/slices/asyncThunk/fetchIngredients";
import IngredientsContainer from "./ingredientsContainer/ingredientsContainer";
import Ingredient from "./ingredient/ingredient";
import Modal from "../modals/modal/modal";
import IngredientDetails from "../modals/ingredientDetails/ingredientDetails";

const BurgerIngredients = () => {
  const { ingredients, isLoading } = useAppSelector(
    (state) => state.ingredients
  );
  const [tabs] = useState<TabShape[]>(ingredientTabs);
  const [currentTab, setCurrentTab] = useState(TABS.BUN);
  const [isScrollable, setIsScrollable] = useState(true);

  const [bunsRef, inViewBuns] = useInView({ threshold: 0.2 }); // Для табов
  const [saucesRef, inViewSauces] = useInView({ threshold: 0.2 });
  const [mainsRef, inViewMain] = useInView({ threshold: 0.2 });

  const [currentIngredient, setCurrentIngredient] =
    useState<IIngredient | null>(null);

  const closeModal = () => setCurrentIngredient(null);

  const handleIngredientClick = (ingredient: IIngredient) => {
    setCurrentIngredient(ingredient);
  };

  const dispatch = useAppDispatch();

  console.log(ingredients);

  useEffect(() => {
    if (ingredients.length === 0) {
      dispatch(fetchIngredients());
    }
  }, []);

  useEffect(() => {
    if (isScrollable) {
      if (inViewBuns) {
        setCurrentTab(TABS.BUN);
      } else if (inViewSauces) {
        setCurrentTab(TABS.SAUCE);
      } else if (inViewMain) {
        setCurrentTab(TABS.MAIN);
      }
    }
  }, [inViewBuns, inViewMain, inViewSauces, isScrollable]);

  const scrollToId = useCallback((tab: string) => {
    const element = document.getElementById(tab);
    if (element) {
      setIsScrollable(false);
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const handleTabClick = useCallback(
    (value: string) => {
      setCurrentTab(value);
      scrollToId(value);
    },
    [scrollToId]
  );

  const filteredIngredients = useMemo(() => {
    return ingredients.reduce<Record<string, IIngredient[]>>((acc, item) => {
      (acc[item.type] ??= []).push(item);
      return acc;
    }, {});
  }, [ingredients]);

  if (isLoading) return <p>Загрузка...</p>;

  return (
    <section className={clsx(style.section, "mt-10")}>
      <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>

      <Tabs changeTab={handleTabClick} currentTab={currentTab} tabs={tabs} />

      <ul className={style.ingredients}>
        <li>
          <IngredientsContainer title={"Булки"} type={TABS.BUN} ref={bunsRef}>
            {filteredIngredients.bun?.map((item) => (
              <Ingredient
                ingredient={item}
                key={item._id}
                onClick={() => handleIngredientClick(item)}
              />
            ))}
          </IngredientsContainer>
        </li>
        <li>
          <IngredientsContainer
            title={"Соусы"}
            type={TABS.SAUCE}
            ref={saucesRef}
          >
            {filteredIngredients.sauce?.map((item) => (
              <Ingredient
                ingredient={item}
                key={item._id}
                onClick={() => handleIngredientClick(item)}
              />
            ))}
          </IngredientsContainer>
        </li>
        <li>
          <IngredientsContainer
            title={"Начинки"}
            type={TABS.MAIN}
            ref={mainsRef}
          >
            {filteredIngredients.main?.map((item) => (
              <Ingredient
                ingredient={item}
                key={item._id}
                onClick={() => handleIngredientClick(item)}
              />
            ))}
          </IngredientsContainer>
        </li>
      </ul>
      {currentIngredient && (
        <Modal onClose={closeModal}>
          <IngredientDetails ingredient={currentIngredient} />
        </Modal>
      )}
    </section>
  );
};

export default BurgerIngredients;
