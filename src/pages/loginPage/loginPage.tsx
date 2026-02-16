import { type FormEvent } from "react";
import {
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./loginPage.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useForm } from "../../helper/hooks/useForm";
import { useAppDispatch } from "../../services/store";
import { setUser } from "../../services/slices/userSlice";
import type { ILoginResponse } from "../../utils/types";
import { request } from "../../utils/api";

const LoginPage = () => {
  const { values, handleChange } = useForm({ email: "", password: "" });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const data = await request<ILoginResponse>("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      dispatch(setUser(data.user));
      localStorage.setItem("refreshToken", data.refreshToken);
      document.cookie = `accessToken=${data.accessToken}; path=/;`;

      navigate("/");
    } catch (error: any) {
      console.error(error.message || "Ошибка авторизации");
    }
  };

  return (
    <main className={style.container}>
      <form className={style.form} onSubmit={handleSubmit}>
        <h1 className="text text_type_main-medium mb-6">Вход</h1>
        <div className="mb-6">
          <Input
            type="email"
            placeholder="E-mail"
            value={values.email}
            name="email"
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <PasswordInput
            value={values.password}
            name="password"
            onChange={handleChange}
          />
        </div>
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass="mb-20"
        >
          Войти
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive mb-4">
        Вы — новый пользователь?{" "}
        <Link to="/register" className={style.link}>
          Зарегистрироваться
        </Link>
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Забыли пароль?{" "}
        <Link to="/forgot-password" className={style.link}>
          Восстановить пароль
        </Link>
      </p>
    </main>
  );
};

export default LoginPage;
