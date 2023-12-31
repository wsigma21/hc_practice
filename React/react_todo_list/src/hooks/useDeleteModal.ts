import { useState } from "react";
import Modal from 'react-modal';
import { ModalType } from "../types/modal" 

type DeleteModalProps = {
  onDeleteTodo: (id:number) => void;
}

type DeleteModalReturn = {
  modal: ModalType;
  closeModal: () => void;
  onClickDeleteTodo: () => void;
  showDeleteModal: (id: number) => void;
}

export const useDeleteModal= ({ onDeleteTodo }: DeleteModalProps ): DeleteModalReturn => {
  const [modal, setModal] = useState<ModalType>({isOpen: false, targetId: 0});
  const openModal = () => setModal({...modal, isOpen: true});
  const closeModal = () => setModal({...modal, isOpen: false});
  Modal.setAppElement('#root');

  const onClickDeleteTodo = () => {
    onDeleteTodo(modal.targetId);
    closeModal();
  }
  
  // 削除時のモーダル
  const showDeleteModal = (id: number) => {
    openModal();
    setModal({isOpen: true, targetId: id});
  }

  return { modal, closeModal, onClickDeleteTodo, showDeleteModal }
}