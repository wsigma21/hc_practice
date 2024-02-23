import { ReactNode, useContext } from "react";
import { UserAttributeContext } from "../providers/UserAttributeProvider";
import { UserAttributeType } from "../types/userAttribute";

type MenuButtonProps = {
  children: ReactNode;
  thisAttribute: UserAttributeType;
}

export const MenuButton = ({children, thisAttribute}: MenuButtonProps) => {
  const { userAttribute, setUserAttribute } = useContext(UserAttributeContext);
  const buttonStyle = "w-52 py-1.5 border-2 border-emerald-500 rounded-sm"
  const unSelectedButtonStyle = `${buttonStyle} bg-emerald-500 text-white`
  const selectedunSelectedButtonStyle = `${buttonStyle} bg-white text-emerald-500`
  return (
    <div>
      <button
        className={userAttribute === thisAttribute ? selectedunSelectedButtonStyle : unSelectedButtonStyle}
        onClick={() => setUserAttribute(thisAttribute)}
      >{children}</button>
    </div>
  )
}
