import { ReactNode, useEffect } from "react";
import { ReactComponent as Close } from "../../assets/icons/close.svg";
import "./modal.sass";

type ModalType = {
  isOpen: boolean;
  setModalOpen: () => void;
  children: ReactNode;
};

const Modal = ({ isOpen, setModalOpen, children }: ModalType) => {
  useEffect(() => {
    document.addEventListener("keydown", detectKeyDown, true);
  });

  const detectKeyDown = (e: any) => {
    if (e.key === "Escape" && isOpen) return setModalOpen();
  };

  if (isOpen) {
    return (
      <div className="modal">
        <div className="modal-style">
          <div className="close-icon">
            <Close
              height={26}
              onClick={setModalOpen}
            />
          </div>
          {children}
        </div>
      </div>
    );
  }

  return <></>;
};

export default Modal;
