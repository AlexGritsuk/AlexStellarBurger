import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useAppDispatch, useAppSelector } from "../../services/store";
import clsx from "clsx";
import style from "./burgerIngredients.module.scss";
import Tabs from "../tabs/tabs";

import { TABS, ingredientTabs } from "../../utils/vars";
import type { IIngredient, TabShape } from "../../utils/types";
import IngredientsContainer from "./ingredientsContainer/ingredientsContainer";
import Ingredient from "./ingredient/ingredient";
import { 
  setCurrentIngredient,
  setTab,
} from "../../services/slices/ingredientsSlice";

const BurgerIngredients = () => {
  const dispatch = useAppDispatch();
  const { ingredients, isLoading, currentTab } =
    useAppSelector((state) => state.ingredients);
  const [tabs] = useState<TabShape[]>(ingredientTabs);
  const scrollContainerRef = useRef<HTMLUListElement>(null);
  const [isScrollable, setIsScrollable] = useState(true);

  const [bunsRef, inViewBuns] = useInView({ threshold: 0.2 });
  const [saucesRef, inViewSauces] = useInView({ threshold: 0.2 });
  const [mainsRef, inViewMain] = useInView({ threshold: 0.2 });

  const { bun, ingredients: constructorIngredients } = useAppSelector(
    (state) => state.burgerConstructor
  );

 
  
  const counters = useMemo(() => {
    const count: Record<string, number> = {};
   
    constructorIngredients.forEach((item) => {
      if (!count[item._id]) count[item._id] = 0;
      count[item._id]++;
    });

        if (bun) {
      count[bun._id] = 2;
    }

    return count;
  }, [bun, constructorIngredients]);

  const handleIngredientClick = (ingredient: IIngredient) => {
    dispatch(setCurrentIngredient(ingredient));
  };




  useEffect(() => {
    if (isScrollable) {
      if (inViewBuns) {
        dispatch(setTab(TABS.BUN));
      } else if (inViewSauces) {
        dispatch(setTab(TABS.SAUCE));
      } else if (inViewMain) {
        dispatch(setTab(TABS.MAIN));
      }
    }
  }, [inViewBuns, inViewMain, inViewSauces, isScrollable]);

  const scrollToId = useCallback((tab: string) => {
    const element = document.getElementById(tab);
    const container = scrollContainerRef.current;

    if (element && container) {
      setIsScrollable(false);
      element.scrollIntoView({ behavior: "smooth" });

      const handleScrollEnd = () => {
        setIsScrollable(true);
        container.removeEventListener("scrollend", handleScrollEnd);
      };

      if ("onscrollend" in window) {
        container.addEventListener("scrollend", handleScrollEnd);
      } else {
        setTimeout(() => setIsScrollable(true), 600);
      }
    }
  }, []);
  const handleTabClick = useCallback(
    (value: string) => {
      dispatch(setTab(value));
      scrollToId(value);
    },
    [scrollToId, dispatch]
  );

  const filteredIngredients = useMemo(() => {
    return ingredients.reduce<Record<string, IIngredient[]>>((acc, item) => {
      (acc[item.type] ??= []).push(item);
      return acc;
    }, {});
  }, [ingredients]);

  if (isLoading) return <p>Загрузка...</p>;

  return (
    <section className={clsx(style.section)}>
      <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>

      <Tabs changeTab={handleTabClick} currentTab={currentTab} tabs={tabs} />

      <ul className={style.ingredients} ref={scrollContainerRef}>
        <li>
          <IngredientsContainer title={"Булки"} type={TABS.BUN} ref={bunsRef}>
            {filteredIngredients.bun?.map((item) => (
              <Ingredient
                ingredient={item}
                key={item._id}
                onClick={() => handleIngredientClick(item)}
                count={counters[item._id]}
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
                count={counters[item._id]}
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
                count={counters[item._id]}
              />
            ))}
          </IngredientsContainer>
        </li>
      </ul>      
    </section>
  );
};

export default BurgerIngredients;
