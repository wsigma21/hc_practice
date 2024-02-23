import { useState } from "react";
import Modal from 'react-modal';

export const useCustomModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  Modal.setAppElement('#root');

  return {isOpen, openModal, closeModal, setIsOpen}
}