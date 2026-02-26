import { type FC } from "react";

import style from "./orderInfoPage.module.scss";
import OrderInfo from "../../components/orderInfo/orderInfo";

export const OrderInfoPage: FC = () => {
  return (
    <main className={style.container}>
      <div className={style.content}>        
        <OrderInfo />
      </div>
    </main>
  );
};
