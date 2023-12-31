import { useState } from "react";
import Modal from 'react-modal';

type DeleteModalProps = {
  onDeleteTodo: (id:number) => void;
}

type DeleteModalReturn = {
  modalIsOpen: boolean;
  closeModal: () => void;
  onClickDeleteTodo: () => void;
  showDeleteModal: (id: number) => void;
}

export const useDeleteModal= ({ onDeleteTodo }: DeleteModalProps ): DeleteModalReturn => {
  const [ modalIsOpen, setIsOpen ] = useState(false);
  const [ deleteTargetId, setDeleteTargetId ] = useState(0);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  Modal.setAppElement('#root');

  const onClickDeleteTodo = () => {
    onDeleteTodo(deleteTargetId);
    closeModal();
  }
  
  // 削除時のモーダル
  const showDeleteModal = (id: number) => {
    openModal();
    setDeleteTargetId(id);
  }

  return { modalIsOpen, closeModal, onClickDeleteTodo, showDeleteModal }
}