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
  const [{ isDragging }, dragRef] = useDrag({
    type: "sort_item",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(), // Вытаскиваем флаг "тянем ли мы сейчас этот элемент"
    }),
  });

  // 2. Логика наведения (Drop/Hover)
  const [, dropRef] = useDrop({
    accept: "sort_item",
    hover: (draggedItem: { index: number }) => {
      if (!ref.current) return;
      const dragIndex = draggedItem.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;

      dispatch(moveIngredient({ dragIndex, hoverIndex }));
      draggedItem.index = hoverIndex;
    },
  });

  // Объединяем рефы для одного элемента li
  dragRef(dropRef(ref));

  return (
    <li
      className={style.item}
      ref={ref}
      style={{ opacity: isDragging ? 0.1 : 1, cursor: "move" }}
    >
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
