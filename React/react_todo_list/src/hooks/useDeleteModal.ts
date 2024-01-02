import { ModalType } from "../types/modal";
import { useCustomModal } from "./useCustomModal";

type DeleteModalProps = {
  onDeleteTodo: (id:number) => void,
}

type DeleteModalReturn = {
  onClickDeleteTodo: () => void;
  showDeleteModal: (id: number) => void;
  modal: ModalType,
  closeModal: () => void,
}

export const useDeleteModal= ({ onDeleteTodo }: DeleteModalProps ): DeleteModalReturn => {
  const { modal, setModal, openModal, closeModal } = useCustomModal();

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

  return {onClickDeleteTodo, showDeleteModal, modal, closeModal}
}