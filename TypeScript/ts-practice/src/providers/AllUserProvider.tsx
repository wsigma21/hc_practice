import { useState, createContext, Dispatch, ReactNode, SetStateAction } from "react";
import { USER_LIST } from "../user_list";
import { StudentType } from "../types/student";
import { MentorType } from "../types/mentor";

export type AllUserContextType = {
  allUsers: (StudentType | MentorType)[];
  setAllUsers: Dispatch<SetStateAction<(StudentType | MentorType)[]>>;
}

export const AllUserContext = createContext<AllUserContextType>(
  {} as AllUserContextType
);

export const AllUserProvider = (props: { children: ReactNode }) => {
  const { children } = props;
  const [ allUsers, setAllUsers ] = useState<(StudentType | MentorType)[]>(USER_LIST);

  return (
    <AllUserContext.Provider value={{ allUsers, setAllUsers }} >
      { children }
    </AllUserContext.Provider>
  )
}

