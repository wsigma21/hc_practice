import { useState, createContext, Dispatch, ReactNode, SetStateAction } from "react";
import { AllUserType } from "../types/allUser";
import { USER_LIST } from "../user_list";

export type AllUserContextType = {
  allUsers: AllUserType[];
  setAllUsers: Dispatch<SetStateAction<AllUserType[]>>;
}

export const AllUserContext = createContext<AllUserContextType>(
  {} as AllUserContextType
);

export const AllUserProvider = (props: { children: ReactNode }) => {
  const { children } = props;
  const [ allUsers, setAllUsers ] = useState<AllUserType[]>(USER_LIST);

  return (
    <AllUserContext.Provider value={{ allUsers, setAllUsers }} >
      { children }
    </AllUserContext.Provider>
  )
}

