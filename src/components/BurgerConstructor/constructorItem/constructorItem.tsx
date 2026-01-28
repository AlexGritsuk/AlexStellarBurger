import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import {
  removeIngredient,
  type IConstructorIngredient,
  moveIngredient,
} from "../../../services/slices/constructorSlice";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./constructorItem.module.scss";
import { useAppDispatch } from "../../../services/store";

type Props = {
  item: IConstructorIngredient;
  index: number;
};

export const ConstructorItem = ({ item, index }: Props) => {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLLIElement>(null);

  // 1. Логика перетаскивания (Drag)
  const [, drag] = useDrag({
    type: "sort_item",
    item: { index }, // Передаем текущий индекс элемента
  });

  // 2. Логика наведения (Drop/Hover)
  const [, drop] = useDrop({
    accept: "sort_item",
    hover: (draggedItem: { index: number }, monitor) => {
      if (!ref.current) return;
      const dragIndex = draggedItem.index;
      const hoverIndex = index;

      // Если навели на самого себя — ничего не делаем
      if (dragIndex === hoverIndex) return;

      dispatch(moveIngredient({ dragIndex, hoverIndex }));

      draggedItem.index = hoverIndex;
    },
  });

  // Объединяем рефы для одного элемента li
  drag(drop(ref));

  return (
    <li className={style.item} ref={ref}>
      <div className={style.drag_handle}>
        <DragIcon type="Primary" />
      </div>
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={() => dispatch(removeIngredient(item.id))}
      />
    </li>
  );
};
