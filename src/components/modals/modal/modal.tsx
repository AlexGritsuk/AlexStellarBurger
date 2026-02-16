import { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import style from "./modal.module.scss";
import ModalOverLay from "../modalOverlay/modalOverlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

type TModalProps = {
  title?: string;
  children: ReactNode;
  onClose: () => void;
};
const modalRoot = document.getElementById("modals");
const Modal = ({
  title,
  children,
  onClose,
}: TModalProps): React.ReactElement | null => {
  if (!modalRoot) return null;
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  return createPortal(
    <>
      <ModalOverLay onClick={onClose} />
      <div className={`${style.modal} p-10`}>
        <div>
          <h3 className="text text_type_main-large">{title}</h3>
          <button className={style.close_button} onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
        <div className={style.content}>{children}</div>
      </div>
    </>,
    modalRoot
  );
};

export default Modal;
