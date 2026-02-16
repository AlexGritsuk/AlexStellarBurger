import { type FormEvent } from "react";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import style from "./registerPage.module.scss";
import { useForm } from "../../helper/hooks/useForm";
import { useAppDispatch } from "../../services/store";
import { setUser } from "../../services/slices/userSlice";
import { request } from "../../utils/api";
import type { ILoginResponse } from "../../utils/types";

const RegisterPage = () => {
  const { values, handleChange } = useForm({
    email: "",
    password: "",
    name: "",
  });

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await request<ILoginResponse>("/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      dispatch(setUser(data.user));
      localStorage.setItem("refreshToken", data.refreshToken);
      document.cookie = `accessToken=${data.accessToken}; path=/;`;
      navigate("/");
    } catch (err) {
      console.error("Ошибка регистрации:", err);
    }
  };

  return (
    <main className={style.container}>
      <form className={style.form} onSubmit={handleSubmit}>
        <h1 className="text text_type_main-medium mb-6">Регистрация</h1>
        <div className="mb-6">
          <Input
            type="text"
            placeholder="Имя"
            value={values.name}
            name="name"
            onChange={handleChange}
          />
        </div>
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
          Зарегистрироваться
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive">
        Уже зарегистрированы?{" "}
        <Link to="/login" className={style.link}>
          Войти
        </Link>
      </p>
    </main>
  );
};

export default RegisterPage;
