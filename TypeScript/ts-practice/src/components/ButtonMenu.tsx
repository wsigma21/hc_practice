import { useContext } from "react";
import { UserAttributeContext } from "../providers/UserAttributeProvider";
import { UserAttributeType } from "../types/userAttribute"

export const ButtonMenu = () => {
  const { setUserAttribute } = useContext(UserAttributeContext);
  const changeListType = (selectedType: UserAttributeType) => {
    setUserAttribute(selectedType);
  }
  return (
    <>
      <button
        className=" border border-blue-500"
        onClick={() => changeListType("allUser")}
      >全員</button>
      <button
        className=" border border-blue-500"
        onClick={() => changeListType("student")}
      >生徒のみ</button>
      <button
        className=" border border-blue-500"
        onClick={() => changeListType("mentor")}
      >メンターのみ</button>
    </>
  )
}