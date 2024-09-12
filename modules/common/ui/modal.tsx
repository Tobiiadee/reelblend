/** @format */

// components/Modal.js
import React from "react";
import { createPortal } from "react-dom";
import Backdrop from "./backdrop/backdrop";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  const portalElement = document.getElementById("overlay")!;

  return (
    <div className='hidden md:block'>
      {createPortal(<Backdrop isOpen={isOpen} closeModal={onClose} />, portalElement)}
       {children}
    </div>
  );
};

export default Modal;
