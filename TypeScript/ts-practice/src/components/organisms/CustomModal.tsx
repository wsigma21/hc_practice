import { memo, FC } from "react";
import Modal from 'react-modal';
import { ModalType } from "../../types/modal" 

type CustomModalType = {
  modal: ModalType;
  title: string;
  confirm: () => void;
  cancel?: () => void;
  children: React.ReactNode;
}

export const CustomModal: FC<CustomModalType> = memo(({modal, title, confirm, cancel, children}) => {
  const customStyles = {
    content: {
      top: '40%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      width: '750px',
      height: '750px',
      marginRight: '-50%',
      borderRadius: '3%',
      transform: 'translate(-50%, -50%)',
    },
  }

  return (
    <Modal
      isOpen={modal.isOpen}
      onRequestClose={cancel}
      style={customStyles}
      contentLabel="Entry Modal"
    >
      <p className="mb-4">{title}</p>
      {children}
      <div className="mt-5 flex justify-end">
        <button
          className="
            w-24 p-2 
            text-sm text-white
            border border-blue-500 rounded-md 
            bg-blue-500"
          onClick={confirm}
        >登録</button>
        { cancel && (
          <button
            className="
              w-24 p-2 ml-2 
              text-sm text-blue-500
              border border-gray-200 rounded-md"
            onClick={cancel}
          >キャンセル</button>)
        }
      </div>
    </Modal>
  )
})