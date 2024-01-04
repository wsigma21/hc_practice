import { memo, FC } from "react";
import Modal from 'react-modal';
import { ModalType } from "../../types/modal" 

type CustomModalType = {
  modal: ModalType;
  confirmText: string;
  confirm: () => void;
  cancel?: () => void;
}

export const CustomModal: FC<CustomModalType> = memo(({modal, confirmText, confirm, cancel}) => {
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
      isOpen={modal.isOpen}
      onRequestClose={cancel}
      style={customStyles}
      contentLabel="Delete Modal"
    >
      <p className="mb-4">{confirmText}</p>
      <div className="flex justify-end">
        <button
          className="
            w-24 p-2 
            text-sm text-white
            border border-blue-500 rounded-md 
            bg-blue-500"
          onClick={confirm}
        >OK</button>
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