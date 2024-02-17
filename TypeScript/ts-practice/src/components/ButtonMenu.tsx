import { useContext } from "react";
import { UserAttributeContext } from "../providers/UserAttributeProvider";
import { UserAttributeType } from "../types/userAttribute"

export const ButtonMenu = () => {
  const { setUserAttribute } = useContext(UserAttributeContext);
  const changeListType = (selectedType: UserAttributeType) => {
    setUserAttribute(selectedType);
  }
  const buttonStyle = "w-2/12 py-1.5 border border-teal-300 rounded-sm bg-teal-500 text-white hover:bg-white hover:text-teal-500"
  return (
    <div className="mb-5 flex justify-center">
      <button
        className={buttonStyle}
        onClick={() => changeListType("allUser")}
      >全員</button>
      <button
        className={buttonStyle}
        onClick={() => changeListType("student")}
      >生徒のみ</button>
      <button
        className={buttonStyle}
        onClick={() => changeListType("mentor")}
      >メンターのみ</button>
    </div>
  )
}