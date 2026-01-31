import style from "./modalOverlay.module.scss";

const ModalOverLay = ({ onClick }: { onClick: () => void }) => {
  return <div className={style.overlay} onClick={onClick}></div>;
};

export default ModalOverLay;
