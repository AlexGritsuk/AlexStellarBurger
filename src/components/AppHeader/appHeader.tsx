import style from "./appHeader.module.scss";
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo,
} from "@ya.praktikum/react-developer-burger-ui-components";

const AppHeader = () => {
  const isActive = false;
  return (
    <header className={`pt-4 pb-4 ${style.header}`}>
      <div className={style.container}>
        <a className={style.logo}>
          <Logo />
        </a>
        <nav className={style.nav}>
          <ul className={style.list}>
            <li>
              <a
                className={`text_type_main-default mt-4 mb-4 ml-5 mr-5 ${style.link}`}
              >
                <BurgerIcon type={isActive ? "primary" : "secondary"} />
                <span className={`ml-2`}>Конструктор</span>
              </a>
            </li>
            <li>
              <a
                className={`text_type_main-default mt-4 mb-4  ml-5 mr-5 ${style.link}`}
              >
                <ListIcon type={isActive ? "primary" : "secondary"} />
                <span className={`ml-2`}>Лента заказов</span>
              </a>
            </li>
            <li className={style.left}>
              <a
                className={`text_type_main-default mt-4 mb-4 ml-5 mr-5 ${style.link}`}
              >
                <ProfileIcon type={isActive ? "primary" : "secondary"} />
                <span className={`ml-2`}>Личный кабинет</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default AppHeader;
