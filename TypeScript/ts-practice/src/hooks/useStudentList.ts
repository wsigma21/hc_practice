import { StudentType } from "../types/student";
import { MentorType } from "../types/mentor";
import { useContext, useEffect, useState } from "react";
import { AllUserContext } from "../providers/AllUserProvider";
import { sortType } from "../types/sort";

export const useStudentList = () => {
  const {allUsers} = useContext(AllUserContext);
  const [students, setStudents] = useState<StudentType[]>([]);
  console.log("生徒一覧のカスタムフック")
  console.log("students=", students)
  
  // 初期設定
  useEffect(() => {
    const fetchStudents: StudentType[]  = allUsers.filter((user): user is StudentType  => user.role === "student");
    const fetchMentors: MentorType[] = allUsers.filter((user): user is MentorType => user.role === "mentor");
    
    // 対応可能なメンターのリストを作成
    setStudents(fetchStudents.map((student) => (
      { ...student, 
        mentorList: fetchMentors
        .filter((mentor) => 
          mentor.availableStartCode <= student.taskCode && student.taskCode <= mentor.availableEndCode)
        .map((student) => student.name)
      }
    )));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const sortStudentList = <T extends keyof StudentType>(sortField: T, sortType: sortType) => {
    const newStudents = [...students];
    newStudents.sort((a, b) => (
      sortType === "desc" ? 
      Number(a[sortField]) - Number(b[sortField]) : 
      Number(b[sortField]) - Number(a[sortField])
    ));
    setStudents(newStudents);
  }

  return { students, setStudents, sortStudentList }
}