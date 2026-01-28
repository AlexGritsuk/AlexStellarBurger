import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./burgerConstructor.module.scss";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrop } from "react-dnd";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import ConstructorEmpty from "./constructorEmpty/constructorEmpty";
import { useAppDispatch, useAppSelector } from "../../services/store";
import type { IIngredient } from "../../utils/types";
import {
  addIngredient,
  removeIngredient,
} from "../../services/slices/constructorSlice";
import { ConstructorItem } from "./constructorItem/constructorItem";

const BurgerConstructor = () => {
  const dispatch = useAppDispatch();
  const { bun, ingredients } = useAppSelector(
    (state) => state.burgerConstructor
  );

  console.log(ingredients);

  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item: IIngredient) {
      dispatch(addIngredient(item));
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  return (
    <section
      ref={(node) => {
        dropTarget(node);
      }}
      className={`${style.constructor} mt-25 ml-10 ${
        isHover ? style.onHover : ""
      }`}
    >
      <div className="pl-8">
        {bun ? (
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        ) : (
          <ConstructorEmpty text="Выберите булку" isTop />
        )}
      </div>

      <ul className={`${style.list} custom-scroll`}>
        {ingredients.length > 0 ? (
          ingredients.map((item, index) => (
            <ConstructorItem key={item.id} item={item} index={index} />
          ))
        ) : (
          <div className={style.empty_ingredients}>
            <span className="text text_type_main-default">
              Добавьте начинку
            </span>
          </div>
        )}
      </ul>

      <div className="pl-8">
        {bun ? (
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        ) : (
          <ConstructorEmpty text="Выберите булку" />
        )}
      </div>

      {/* Подвал */}
      <div className={`${style.total} mt-10`}>
        <div className={`${style.price} mr-10`}>
          <span className="text text_type_digits-medium mr-2">600</span>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

export default BurgerConstructor;
