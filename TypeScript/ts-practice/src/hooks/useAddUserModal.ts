import { useState } from "react"; 
import { useCustomModal } from "./useCustomModal";
import { SubmitHandler, useForm } from 'react-hook-form';
import { UserAttributeType } from "../types/userAttribute";
import { MentorType } from "../types/mentor";
import { StudentType } from "../types/student";

type useAddUserModalType = {
  filterUsers: (MentorType | StudentType)[];
  isMentor: (user: MentorType | StudentType) => boolean;
  isStudent: (user: MentorType | StudentType) => boolean;
  addUser: (newUser: MentorType | StudentType) => void;
}

export const useAddUserModal = ({filterUsers, isMentor, isStudent, addUser}: useAddUserModalType) => {
  const { isOpen, openModal, closeModal } = useCustomModal();
  const [selectedRole, setSelectedRole] = useState<UserAttributeType>("student");
  const [multiInputTarget, setMultiInputTarget] = useState("勉強中の言語");
  const { register, handleSubmit, reset, formState: { errors }} = useForm<MentorType & StudentType>();

  // ロール変更で注釈文字列切り替え
  const onChangeRole = (role: UserAttributeType) => {
    setSelectedRole(role);
    role === "student" ? setMultiInputTarget("勉強中の言語") : setMultiInputTarget("現場で使っている言語")
  }

  const onClickEntry = () => {
    reset();
    openModal();
  }

  const onSubmit: SubmitHandler<MentorType & StudentType> = (data: MentorType & StudentType) => {
    const postCode: string = data.postCode.slice(0,3) + "-" + data.postCode.slice(-4);
    const hobbies: string[] = data.hobbies.toString().split(/[,、・]/);
    const studyLangs: string[] = isStudent(data) ? data.studyLangs.toString().split(/[,、・]/) : [];
    const useLangs: string[] = isMentor(data) ? data.useLangs.toString().split(/[,、・]/) : [];
    addUser({
      ...data, 
      id: filterUsers.length + 1,
      postCode,
      studyLangs,
      hobbies,
      useLangs,
    });
    closeModal();
  }

  return { isOpen, onClickEntry, closeModal, register, handleSubmit, errors, selectedRole, multiInputTarget, onChangeRole, onSubmit  }
}