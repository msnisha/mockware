import React, { useRef, useEffect } from "react";

const Modal = ({
  title,
  content,
  onClose,
}: {
  title: string;
  content: React.ReactNode;
  onClose?: Function;
}) => {
  const modalDiv = useRef<HTMLDivElement>(null);
  const toggle = () => {
    if (modalDiv.current) {
      modalDiv.current.classList.remove("show-modal");
      if (onClose) {
        onClose();
      }
    }
  };

  useEffect(() => {
    return () => {
      if (modalDiv.current) {
        modalDiv.current.classList.add("show-modal");
      }
    };
  }, []);

  return (
    <div className="modal" ref={modalDiv}>
      <div className="modal-content">
        <span
          className="close-button"
          onClick={(e) => {
            e.preventDefault();
            toggle();
          }}
        >
          &times;
        </span>
        <h1>{title}</h1>
        {content}
      </div>
    </div>
  );
};

export default Modal;
