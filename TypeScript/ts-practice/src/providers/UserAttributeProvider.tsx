import { useState, createContext, Dispatch, ReactNode, SetStateAction } from "react";
import { UserAttributeType } from "../types/userAttribute";

export type UserAttributeContextType = {
  userAttribute: UserAttributeType;
  setUserAttribute: Dispatch<SetStateAction<UserAttributeType>>;
}

export const UserAttributeContext = createContext<UserAttributeContextType>(
  {} as UserAttributeContextType
);

export const UserAttributeProvider = (props: { children: ReactNode }) => {
  const { children } = props;
  const [ userAttribute, setUserAttribute ] = useState<UserAttributeType>("allUser");

  return (
    <UserAttributeContext.Provider value={{ userAttribute, setUserAttribute }} >
      { children }
    </UserAttributeContext.Provider>
  )
}

