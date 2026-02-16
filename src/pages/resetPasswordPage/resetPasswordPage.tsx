import { useEffect, type FormEvent } from "react";
import { useForm } from "../../helper/hooks/useForm";
import style from "./resetPasswordPage.module.scss";
import { Link, useNavigate } from "react-router-dom";
import {
  PasswordInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { request } from "../../utils/api";
import type { IResponse } from "../../utils/types";

const ResetPasswordPage = () => {
  const { values, handleChange } = useForm({ password: "", token: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const hasAccess = localStorage.getItem("forgotPassword");
    if (!hasAccess) {
      navigate("/forgor-password", { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await request<IResponse>("/password-reset/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (data.success) {
        localStorage.removeItem("forgotPassword");
        navigate("/login");
      }
    } catch (error: any) {
      console.error(error.message || "Неизвестная ошибка");
    }
  };

  return (
    <main className={style.container}>
      <form className={style.form} onSubmit={handleSubmit}>
        <h1 className="text text_type_main-medium mb-6">Сброс пароля</h1>
        <div className="mb-6">
          <PasswordInput
            placeholder="Введите новый пароль"
            name="password"
            onChange={handleChange}
            value={values.password}
          />
        </div>
        <div className="mb-6">
          <Input
            type="text"
            placeholder="Введите код из письма"
            name="token"
            onChange={handleChange}
            value={values.token}
          />
        </div>
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass="mb-20"
        >
          Сохранить
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive mt-10">
        Вспомнили пароль?{" "}
        <Link to={"/login"} className={style.link}>
          Войти
        </Link>
      </p>
    </main>
  );
};

export default ResetPasswordPage;
