import { useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { getCookie } from "../../services/slices/asyncThunk/getUser";
import { useAppDispatch, useAppSelector } from "../../services/store";
import {
  wsHistoryConnect,
  wsHistoryDisconnect,
} from "../../services/actions/historyAction";
import OrderCard from "../../components/orderCard/orderCard";
import style from "./profileOrder.module.scss";

const ProfileOrders = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const { orders } = useAppSelector((state) => state.history);

  const reversedOrders = useMemo(
    () => (orders ? [...orders].reverse() : []),
    [orders]
  );

  useEffect(() => {
    const token = getCookie("accessToken");
    if (!token) return;
    if (token) {
      const accessToken = token.replace("Bearer ", "");

      const WS_URL = `wss://norma.education-services.ru/orders?token=${accessToken}`;
      dispatch(wsHistoryConnect(WS_URL));
    }

    return () => {
      dispatch(wsHistoryDisconnect());
    };
  }, [dispatch]);

  if (orders.length === 0) {
    return (
      <p className="text text_type_main-medium mt-20">У вас пока нет заказов</p>
    );
  }

  return (
    <section className={`${style.ordersList} custom-scroll`}>
      {reversedOrders.map((order) => (
        <Link
          key={order._id}
          to={`/profile/orders/${order.number}`}
          state={{ background: location }}
          className={style.link}
        >
          <OrderCard order={order} isStatus={true} />
        </Link>
      ))}
    </section>
  );
};

export default ProfileOrders;
