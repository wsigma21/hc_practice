import { useContext, useEffect } from "react";
import { AllUserContext } from "../providers/AllUserProvider";
import { useMentorList } from "./useMentorList";
import { useStudentList } from "./useStudentList";

export const useAllUserList = () => {
  const { allUsers, setAllUsers } = useContext(AllUserContext);
  const { mentors } = useMentorList();
  const { students } = useStudentList();

  useEffect(() => {
    setAllUsers([...students, ...mentors].sort((a,b) => a.id - b.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[students, mentors]);  

  return { allUsers }
}