import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./burgerConstructor.module.scss";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

const BurgerConstructor = () => {
  return (
    <section className={`${style.constructor} mt-25 ml-10`}>
      <div className={`${style.element_wrapper} pl-8`}>
        <ConstructorElement
          top="top"
          isLocked={true}
          text="Краторная булка N-210i (верх)"
          price={200}
          thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
        />
      </div>
      <ul className={`${style.list} custom-scroll`}>
        <li className={style.item}>
          <div className={style.drag_handle}>
            <DragIcon type="primary" />
          </div>
          <ConstructorElement
            text="Филе люминесцентного тетраодона"
            price={300}
            thumbnail="https://code.s3.yandex.net/react/code/meat-03.png"
          />
        </li>
      </ul>
      <div className={`${style.element_wrapper} pl-8`}>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text="Краторная булка N-210i (низ)"
          price={200}
          thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
        />
      </div>
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
