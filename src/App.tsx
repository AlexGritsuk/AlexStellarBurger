import AppHeader from "./components/AppHeader/appHeader";
import style from "./App.module.scss";
import { useEffect, useState } from "react";

export const App = () => {
  const [data, setData] = useState({
    burgerData: [],
    loading: false,
  });

  useEffect(() => {
    const getProductData = async () => {
      setData({ ...data, loading: false });
      try {
        const res = await fetch(
          "https://norma.education-services.ru/api/ingredients"
        );
        if (!res.ok) {
          throw new Error("С ответом что-то не так");
        }
        const product = await res.json();
        setData({
          burgerData: product.data,
          loading: true,
        });
      } catch (error: any) {
        console.log("Возникла ошибка с fetch запросом: ", error.message);
      }
    };
    getProductData();
  }, []);

  console.log(data);
  

  return (
    <div className={style.app}>
      <AppHeader />
    </div>
  );
};

export default App;
