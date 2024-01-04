import { useState } from "react";
import Modal from 'react-modal';
import { ModalType } from "../types/modal" 

export const useCustomModal = () => {
  const [modal, setModal] = useState<ModalType>({isOpen: false, targetId: 0});
  const openModal = () => setModal({...modal, isOpen: true});
  const closeModal = () => setModal({...modal, isOpen: false});
  Modal.setAppElement('#root');

  return {modal, setModal, openModal, closeModal}
}