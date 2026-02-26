import { useNavigate, NavLink, Outlet } from "react-router-dom";
import style from "./profilePage.module.scss";
import { useAppDispatch } from "../../services/store";
import { logoutRequest } from "../../utils/api";
import { setUser } from "../../services/slices/userSlice";

const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onLogout = async () => {
    try {
      await logoutRequest();

      document.cookie =
        "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      localStorage.removeItem("refreshToken");
      dispatch(setUser(null));
      navigate("/login", { replace: true });
    } catch (error: any) {
      console.error("Ошибка при выходе:", error.message);
    }
  };

  return (
    <main className={style.container}>
      <div className={style.content}>
        <nav className={`${style.sidebar} mr-15`}>
          <NavLink
            to={"/profile"}
            end
            className={({ isActive }) =>
              `${style.link} text text_type_main-medium ${
                isActive ? style.active : "text_color_inactive"
              }`
            }
          >
            Профиль
          </NavLink>
          <NavLink
            to="/profile/orders"
            className={({ isActive }) =>
              `${style.link} text text_type_main-medium ${
                isActive ? style.active : "text_color_inactive"
              }`
            }
          >
            История заказов
          </NavLink>
          <button
            onClick={onLogout}
            className={`${style.link} ${style.logout} text text_type_main-medium text_color_inactive`}
          >
            Выход
          </button>
          <p className="text text_type_main-default text_color_inactive mt-20 opacity-40">
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </nav>

        <div className={style.formContainer}>
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
