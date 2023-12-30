import { useState, forwardRef, useImperativeHandle } from "react";
import Modal from 'react-modal';
import { useTodoList } from "../hooks/useTodoList"
import { ReactModalMethods } from "../interfaces/reactModalMethods";

const DeleteConfirmModal = forwardRef<ReactModalMethods, {}>((props, ref) => {
  const [ modalIsOpen, setIsOpen ] = useState(false);
  const [ deleteTargetId, setDeleteTargetId ] = useState(0);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  Modal.setAppElement('#root');

  const { onDeleteTodo } = useTodoList();

  const onClickDeleteTodo = () => {
    onDeleteTodo(deleteTargetId);
    closeModal();
  }
  
  // 削除時のモーダル
  const showDeleteModal = (id:number) => {
    openModal();
    setDeleteTargetId(id);
  }

  // 親コンポーネントでshowDeleteModalの利用を可能にする
  useImperativeHandle(ref, () => ({
    showDeleteModal,
  }));

  const customStyles = {
    content: {
      top: '25%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      width: '500px',
      height: '120px',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Delete Modal"
    >
      <p className="mb-4">本当に削除してもよろしいですか？</p>
      <div className="flex justify-end">
        <button
          className="w-24 p-2 text-sm border border-blue-500 rounded-md bg-blue-500 text-white"
          onClick={onClickDeleteTodo}
        >OK</button>
        <button
          className="w-24 p-2 ml-2 text-sm border border-gray-200 rounded-md text-blue-500"
          onClick={closeModal}
        >キャンセル</button>
      </div>
    </Modal>
  )
})

export { DeleteConfirmModal };