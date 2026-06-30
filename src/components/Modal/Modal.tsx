import { useEffect, useState, type ReactNode } from "react";
import css from "./Modal.module.css";

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}
const ANIMATION_DURATION = 250;

export default function Modal({ children, onClose }: ModalProps) {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);

    setTimeout(() => {
      onClose();
    }, ANIMATION_DURATION);
  };

  useEffect(() => {
    const handleEscClick = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleEscClick);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscClick);
      document.body.style.overflow = "";
    };
  }, []);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  };

  return (
    <div
      className={`${css.backdrop} ${isClosing ? css.backdropClosing : ""}`}
      onClick={handleBackdropClick}
    >
      <div className={`${css.modal} ${isClosing ? css.modalClosing : ""}`}>
        <button
          type="button"
          className={css.closeBtn}
          onClick={handleClose}
          aria-label="Close modal"
        >
          <svg width="32" height="32" className={css.closeIcon}>
            <use href="/public/symbol-defs.svg#icon-x" />
          </svg>
        </button>

        {children}
      </div>
    </div>
  );
}
