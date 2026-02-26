import type { FormEvent } from "react";
import {
  Input,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useForm } from "../../helper/hooks/useForm";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { updateUser } from "../../services/slices/asyncThunk/updateUser";
import style from "./profilePage.module.scss";

export const ProfileForm = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.data);

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

  return (
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
  );
};
