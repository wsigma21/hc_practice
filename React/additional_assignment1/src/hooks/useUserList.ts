import { useState, ChangeEvent } from 'react';
import { USER_LIST } from "../user_list";

export const useUserList = () => {
  const [ text, setText ] = useState<string>("");
  const onChangeInputWord = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  }
  const filterUsers = USER_LIST.filter((user) => user.name.includes(text) || user.email.includes(text));
  return { onChangeInputWord, filterUsers}
}