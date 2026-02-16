import { useNavigate, NavLink } from "react-router-dom";
import style from "./profilePage.module.scss";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useForm } from "../../helper/hooks/useForm";
import { PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppDispatch, useAppSelector } from "../../services/store";
import type { FormEvent } from "react";
import { updateUser } from "../../services/slices/asyncThunk/updateUser";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { logoutRequest } from "../../utils/api";
import { setUser } from "../../services/slices/userSlice";

const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.data);
  const navigate = useNavigate();
  const { values, handleChange, setValues } = useForm({
    name: user?.name || "",
    email: user?.email || "",
    password: "",
  });

  const isFormChanged =
    values.name !== user?.name ||
    values.email !== user?.email ||
    values.password !== "";

  const handleCancel = () => {
    setValues({
      name: user?.name || "",
      email: user?.email || "",
      password: "",
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(updateUser(values));
  };

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

        <form className={style.form} onSubmit={handleSubmit}>
          <div className="mb-6">
            <Input
              type="text"
              name="name"
              placeholder="Имя"
              onChange={handleChange}
              value={values.name}
              icon="EditIcon"
            />
          </div>
          <div className="mb-6">
            <Input
              type="email"
              name="email"
              placeholder="Логин"
              onChange={handleChange}
              value={values.email}
              icon="EditIcon"
            />
          </div>
          <div className="mb-6">
            <PasswordInput
              value={values.password}
              name="password"
              onChange={handleChange}
              icon="EditIcon"
            />
          </div>

          {isFormChanged && (
            <div className={style.buttons}>
              <Button htmlType="button" type="secondary" onClick={handleCancel}>
                Отмена
              </Button>
              <Button htmlType="submit" type="primary">
                Сохранить
              </Button>
            </div>
          )}
        </form>
      </div>
    </main>
  );
};

export default ProfilePage;
