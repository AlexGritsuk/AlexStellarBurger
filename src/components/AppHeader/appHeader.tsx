import { Link, NavLink } from "react-router-dom";
import style from "./appHeader.module.scss";
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppSelector } from "../../services/store";

const AppHeader = () => {
  const { data: user } = useAppSelector((state) => state.user);

  const isActive = false;
  return (
    <header className={`pt-4 pb-4 ${style.header}`}>
      <div className={style.container}>
        <Link to={"/"} className={style.logo}>
          <Logo />
        </Link>
        <nav className={style.nav}>
          <ul className={style.list}>
            <li>
              <NavLink
                to={"/"}
                className={({ isActive }) =>
                  `${style.link} text_type_main-default mt-4 mb-4 ml-5 mr-5 ${
                    isActive ? style.active : ""
                  }`
                }
              >
                <BurgerIcon type={isActive ? "primary" : "secondary"} />
                <span className={`ml-2`}>Конструктор</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={'/feed'}
                className={`text_type_main-default mt-4 mb-4  ml-5 mr-5 ${style.link}`}
              >
                <ListIcon type={isActive ? "primary" : "secondary"} />
                <span className={`ml-2`}>Лента заказов</span>
              </NavLink>
            </li>

            <li className={style.left}>
              <NavLink
                to={user ? "/profile" : "/login"}
                className={({ isActive }) =>
                  `${style.link} text_type_main-default mt-4 mb-4 ml-5 mr-5 ${
                    isActive ? style.active : ""
                  }`
                }
              >
                <ProfileIcon type="secondary" />
                <span className="ml-2">
                  {user ? user.name : "Личный кабинет"}
                </span>
              </NavLink>
            </li>
            <li className={style.todo}>
              <NavLink
                to={"./todoList"}
                className={({ isActive }) =>
                  `${style.link} text_type_main-default mt-4 mb-4 ml-5 mr-5 ${
                    isActive ? style.active : ""
                  }`
                }
              >
                <ProfileIcon type={isActive ? "primary" : "secondary"} />
                <span className={`ml-2`}>Список дел</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default AppHeader;
