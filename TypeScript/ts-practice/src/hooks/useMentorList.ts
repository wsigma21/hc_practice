import { StudentType } from "../types/student";
import { MentorType } from "../types/mentor";
import { useContext, useEffect, useState } from "react";
import { AllUserContext } from "../providers/AllUserProvider";
import { sortType } from "../types/sort";

export const useMentorList = () => {
  const {allUsers} = useContext(AllUserContext);
  const [mentors, setMentors] = useState<MentorType[]>([]);
  
  // 初期設定
  useEffect(() => {
    const fetchStudents: StudentType[]  = allUsers.filter((user): user is StudentType  => user.role === "student");
    const fetchMentors: MentorType[] = allUsers.filter((user): user is MentorType => user.role === "mentor");

    // 対応可能な生徒のリストを作成
    setMentors(fetchMentors.map((mentor) => (
      { ...mentor, 
        studentList: fetchStudents.filter((student) => 
        mentor.availableStartCode <= student.taskCode && student.taskCode <= mentor.availableEndCode)
      }
    )));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const sortMentorList = <T extends keyof MentorType>(sortField: T, sortType: sortType) => {
    const newMentors = [...mentors];
    newMentors.sort((a, b) => (
      sortType === "desc" ? 
      Number(a[sortField]) - Number(b[sortField]) :
      Number(b[sortField]) - Number(a[sortField])));
    setMentors(newMentors);
  }

  return { mentors, sortMentorList }
}