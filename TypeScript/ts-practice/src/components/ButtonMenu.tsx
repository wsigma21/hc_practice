import { useContext } from "react";
import { UserAttributeContext } from "../providers/UserAttributeProvider";
import { UserAttributeType } from "../types/userAttribute"

export const ButtonMenu = () => {
  const { userAttribute, setUserAttribute } = useContext(UserAttributeContext);
  const changeListType = (selectedType: UserAttributeType) => {
    setUserAttribute(selectedType);
  }
  const buttonStyle = "w-2/12 py-1.5 border border-emerald-500 rounded-sm tracking-widest"
  const unSelectedButtonStyle = `${buttonStyle} bg-emerald-500 text-white`
  const selectedunSelectedButtonStyle = `${buttonStyle} bg-white text-emerald-500`
  return (
    <div className="mb-5 flex justify-center">
      <button
        className={userAttribute !== "student" && userAttribute !== "mentor" ? selectedunSelectedButtonStyle : unSelectedButtonStyle}
        onClick={() => changeListType("allUser")}
      >全員</button>
      <button
        className={userAttribute === "student" ? selectedunSelectedButtonStyle : unSelectedButtonStyle}
        onClick={() => changeListType("student")}
        >生徒のみ</button>
      <button
        className={userAttribute === "mentor" ? selectedunSelectedButtonStyle : unSelectedButtonStyle}
        onClick={() => changeListType("mentor")}
      >メンターのみ</button>
    </div>
  )
}