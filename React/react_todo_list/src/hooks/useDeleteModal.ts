import { ModalType } from "../types/modal" 

type DeleteModalProps = {
  onDeleteTodo: (id:number) => void,
  modal: ModalType,
  setModal: (modalState: ModalType) => void,
  openModal: () => void,
  closeModal: () => void,
}

type DeleteModalReturn = {
  onClickDeleteTodo: () => void;
  showDeleteModal: (id: number) => void;
}

export const useDeleteModal= ({ 
  onDeleteTodo, 
  modal,
  setModal, 
  openModal, 
  closeModal
 }: DeleteModalProps ): DeleteModalReturn => {

  // 削除処理
  const onClickDeleteTodo = () => {
    if (modal.targetId !== undefined) onDeleteTodo(modal?.targetId);
    closeModal();
  }
  
  // 削除時のモーダルを表示
  const showDeleteModal = (id: number) => {
    openModal();
    setModal({isOpen: true, targetId: id});
  }

  return { onClickDeleteTodo, showDeleteModal }
}