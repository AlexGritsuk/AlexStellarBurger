import type { FormEvent } from "react";
import style from "./forgotPasswordPage.module.scss";
import { useForm } from "../../helper/hooks/useForm";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { request } from "../../utils/api";
import type { IResponse } from "../../utils/types";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const { values, handleChange } = useForm({ email: "" });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await request<IResponse>("/password-reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (data.success) {
        localStorage.setItem("forgotPassword", "true");
        navigate("/reset-password");
      }
    } catch (err) {
      console.error("Ошибка сброса:", err);
    }
  };

  return (
    <main className={style.container}>
      <form className={style.form} onSubmit={handleSubmit}>
        <h1 className="text text_type_main-medium mb-6">
          Восстановление пароля
        </h1>
        <div className="mb-6">
          <Input
            type="email"
            placeholder="Укажите e-mail"
            value={values.email}
            name="email"
            onChange={handleChange}
          />
        </div>
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass="mb-20"
        >
          Восстановить
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive">
        Вспомнили пароль?{" "}
        <Link to={"/login"} className={style.link}>
          Войти
        </Link>
      </p>
    </main>
  );
};

export default ForgotPasswordPage;
