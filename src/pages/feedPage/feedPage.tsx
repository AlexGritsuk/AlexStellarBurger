import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import FeedStatus from "../../components/feedStatus/feedStatus";
import OrderCard from "../../components/orderCard/orderCard";
import style from "./feedPage.module.scss";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { wsConnect, wsDisconnect } from "../../services/actions/feedActions";

const FeedPage = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(wsConnect("wss://norma.education-services.ru/orders/all"));

    return () => {
      dispatch(wsDisconnect());
    };
  }, [dispatch]);

  const { orders } = useAppSelector((state) => state.feed);
  return (
    <main className={style.container}>
      <h1 className="text text_type_main-large mt-10 mb-5">Лента заказов</h1>
      <div className={style.content}>
        <section className={`${style.orders} custom-scroll`}>
          {orders.map((order) => (
            <Link
              key={order._id}
              to={`/feed/${order._id}`}
              state={{ background: location }}
              className={style.link}
            >
              <OrderCard order={order} />
            </Link>
          ))}
        </section>

        <section className={style.stats}>
          <FeedStatus />
        </section>
      </div>
    </main>
  );
};

export default FeedPage;
