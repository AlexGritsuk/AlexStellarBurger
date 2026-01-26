import { forwardRef, type ReactNode, type Ref } from "react";
import style from "./ingredientsContainer.module.scss";

type Props = {
  children: ReactNode;
  title: string;
  type: string;
};

const IngredientsContainer = forwardRef(
  ({ children, title, type }: Props, ref: Ref<HTMLUListElement>) => {
    return (
      <>
        <h2 className="text text_type_main-medium" id={type}>
          {title}
        </h2>
        <ul className={style.list} ref={ref}>
          {children}
        </ul>
      </>
    );
  }
);

IngredientsContainer.displayName = "IngredientsContainer";
export default IngredientsContainer;
