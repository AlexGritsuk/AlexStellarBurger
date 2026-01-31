import AppHeader from "./components/AppHeader/appHeader";
import style from "./App.module.scss";
import HomePage from "./pages/homePage/homePage";

export const App = () => {
  return (
    <div className={style.app}>
      <AppHeader />
      <HomePage />
    </div>
  );
};

export default App;
