import style from "./constructorEmpty.module.scss";

const ConstructorEmpty = ({
  text,
  isTop,
}: {
  text: string;
  isTop?: boolean;
}) => {
  return (
    <div
      className={`${style.empty_element} ${
        isTop ? style.empty_top : style.empty_bottom
      }`}
    >
      <span className="text text_type_main-default">{text}</span>
    </div>
  );
};

export default ConstructorEmpty;
