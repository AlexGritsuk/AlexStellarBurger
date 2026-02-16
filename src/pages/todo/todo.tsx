import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { type FormEvent, type ChangeEvent } from "react";
import style from "./todo.module.scss";
import { useAppDispatch, useAppSelector } from "../../services/store";
import type { RootState } from "../../services/store";
import {
  addTodo,
  removeTodo,
  selectFilteredTodos,
  setFilter,
  toggleTodo,
} from "../../services/slices/todosSlice";

export interface ITodos {
  id: number;
  text: string;
  completed: boolean;
}

const TodoList = () => {
  const [text, setText] = useState("");
  const dispatch = useAppDispatch();
  const { filter } = useAppSelector(
    (state: RootState) => state.todo
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    dispatch(addTodo(text));
    setText("");
  };

  const handleRemove = (id: number) => {
    dispatch(removeTodo(id));
  };

  const handleToggleTodo = (id: number) => {
    dispatch(toggleTodo(id));
  };

  const filteredTodos = useAppSelector(selectFilteredTodos);

  return (
    <div className={style.container}>
      <form className={style.form} onSubmit={handleSubmit}>
        <Input
          type="text"
          value={text}
          onChange={handleChange}
          placeholder="Введите задание"
        />
        <div className={style.btn_form}>
          <Button htmlType="submit" type="primary">
            Добавить
          </Button>
        </div>
      </form>

      <div style={{ display: "flex", padding: "20px" }}>
        <Button
          type={filter === "all" ? "primary" : "secondary"}
          onClick={() => dispatch(setFilter("all"))}
        >
          Все задачи
        </Button>
        <Button
          type={filter === "completed" ? "primary" : "secondary"}
          onClick={() => dispatch(setFilter("completed"))}
        >
          Выполенные
        </Button>
        <Button
          type={filter === "active" ? "primary" : "secondary"}
          onClick={() => dispatch(setFilter("active"))}
        >
          Невыполненные
        </Button>
      </div>

      <ul>
        {filteredTodos.map((todo) => (
          <li
            key={todo.id}
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
              padding: "20px",
            }}
          >
            <span onClick={() => handleToggleTodo(todo.id)}>{todo.text}</span>
            <div className={style.btn_form}>
              <Button onClick={() => handleRemove(todo.id)}>Удалить</Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
