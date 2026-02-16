import { createSelector, createSlice } from "@reduxjs/toolkit";
import type { ITodos } from "../../pages/todo/todo";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface ITodosState {
  items: ITodos[];
  filter: "all" | "active" | "completed";
}

const initialState: ITodosState = {
  items: [],
  filter: "all",
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.items.push({
        id: Date.now(),
        text: action.payload,
        completed: false,
      });
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      state.items = state.items.map((item) =>
        item.id === action.payload
          ? { ...item, completed: !item.completed }
          : item
      );
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    setFilter: (state, action: PayloadAction<ITodosState["filter"]>) => {
      state.filter = action.payload;
    },
  },
});

const selectTodos = (state: RootState) => state.todo.items;
const selectFilter = (state: RootState) => state.todo.filter;

export const selectFilteredTodos = createSelector(
  [selectTodos, selectFilter],
  (todos, filter) => {
    console.log("Фильтрация в селекторе...");
    switch (filter) {
      case "active":
        return todos.filter((t: ITodos) => !t.completed);
      case "completed":
        return todos.filter((t: ITodos) => t.completed);
      default:
        return todos;
    }
  }
);

export const { addTodo, toggleTodo, removeTodo, setFilter } =
  todosSlice.actions;
export default todosSlice.reducer;
