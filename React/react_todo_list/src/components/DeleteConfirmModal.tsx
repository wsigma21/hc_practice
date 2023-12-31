import { FC } from "react";
// import Modal from 'react-modal';
import { ModalType } from "../types/modal" 
import { CustomModal } from "./organisms/CustomModal" 

type DeleteConfirmModalType = {
  modal: ModalType;
  onClickDeleteTodo: () => void;
  closeModal: () => void;
}

export const DeleteConfirmModal: FC<DeleteConfirmModalType> = ({ modal, onClickDeleteTodo, closeModal }) => {
  const confirmText = ""

  return (
    <CustomModal
      modal={modal}
      confirmText={confirmText}
      confirm={onClickDeleteTodo}
      cancel={closeModal}
    />
  )
}