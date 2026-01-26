import { useCallback, useEffect, useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useAppDispatch, useAppSelector } from "../../services/store";

import clsx from "clsx";
import style from "./burgerIngredients.module.scss";
import Tabs from "../tabs/tabs";

import { TABS, ingredientTabs } from "../../utils/vars";
import type { IIngredients, TabShape } from "../../utils/types";
import {
  getAllIngredients,
  getIngredientsLoading,
} from "../../services/slices/ingredientsSlice";
import { fetchIngredients } from "../../services/slices/asyncThunk/fetchIngredients";
import IngredientsContainer from "./ingredientsContainer/ingredientsContainer";
import Ingredient from "./ingredient/ingredient";

const BurgerIngredients = () => {
  const [tabs] = useState<TabShape[]>(ingredientTabs);
  const [currentTab, setCurrentTab] = useState(TABS.BUN);
  const [isScrollable, setIsScrollable] = useState(true);

  const [bunsRef, inViewBuns] = useInView({ threshold: 0.2 });
  const [saucesRef, inViewSauces] = useInView({ threshold: 0.2 });
  const [mainsRef, inViewMain] = useInView({ threshold: 0.2 });

  const dispatch = useAppDispatch();

  const ingredients = useAppSelector(getAllIngredients);
  const isLoading = useAppSelector(getIngredientsLoading);

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
    return ingredients.reduce<Record<string, IIngredients[]>>((acc, item) => {
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
              <Ingredient ingredient={item} key={item._id} />
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
              <Ingredient ingredient={item} key={item._id} />
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
              <Ingredient ingredient={item} key={item._id} />
            ))}
          </IngredientsContainer>
        </li>
      </ul>
    </section>
  );
};

export default BurgerIngredients;
