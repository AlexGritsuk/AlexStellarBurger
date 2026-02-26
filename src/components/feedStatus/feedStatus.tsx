import { useMemo } from "react";
import { useAppSelector } from "../../services/store";
import style from "./feedStatus.module.scss";

const FeedStatus = () => { 
  const { orders, total, totalToday } = useAppSelector((state) => state.feed);  
  const readyOrders = useMemo(
    () =>
      orders
        .filter((order) => order.status === "done")
        .map((order) => order.number)
        .slice(0, 20), 
    [orders]
  );

  const pendingOrders = useMemo(
    () =>
      orders
        .filter((order) => order.status === "pending")
        .map((order) => order.number)
        .slice(0, 20),
    [orders]
  );

  return (
    <div className={style.container}>
      <div className={style.board}>
       
        <div className={style.column}>
          <h3 className="text text_type_main-medium mb-6">Готовы:</h3>
          <ul className={`${style.list} ${style.ready_list}`}>
            {readyOrders.map((num) => (
              <li key={num} className="text text_type_digits-default mb-2">
                {num}
              </li>
            ))}
          </ul>
        </div>

        
        <div className={style.column}>
          <h3 className="text text_type_main-medium mb-6">В работе:</h3>
          <ul className={style.list}>
            {pendingOrders.map((num) => (
              <li key={num} className="text text_type_digits-default mb-2">
                {num}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-15">
        <h3 className="text text_type_main-medium">Выполнено за все время:</h3>
        <p className={`${style.digits} text text_type_digits-large`}>{total}</p>
      </div>

      <div className="mt-15">
        <h3 className="text text_type_main-medium">Выполнено за сегодня:</h3>
        <p className={`${style.digits} text text_type_digits-large`}>
          {totalToday}
        </p>
      </div>
    </div>
  );
};

export default FeedStatus;
