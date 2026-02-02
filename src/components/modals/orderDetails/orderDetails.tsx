import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./orderDetails.module.scss";
import { useAppSelector } from "../../../services/store";

const OrderDetails = () => {
  const { orderNumber } = useAppSelector((state) => state.order);
  return (
    <div className={style.container}>
      <h2 className="text text_type_digits-large mt-10 mb-8">{orderNumber}</h2>
      <p className="text text_type_main-medium mb-15">идентификатор заказа</p>

      <div className={style.doneIcon}>       
        <CheckMarkIcon type="primary" />
      </div>

      <p className="text text_type_main-default mb-2">
        Ваш заказ начали готовить
      </p>
      <p className={`${style.waitText} text text_type_main-default mb-10`}>
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

export default OrderDetails;
