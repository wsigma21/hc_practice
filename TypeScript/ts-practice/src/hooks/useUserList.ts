import { USER_LIST } from "../user_list";
import { UserAttributeType } from "../types/userAttribute"
import { StudentType } from "../types/student";
import { MentorType } from "../types/mentor";
import { AllUserType } from "../types/allUser";
import { useEffect, useState } from "react";

export const useUserList = (selectedUserAttribute: UserAttributeType) => {
  console.log("useUserListページ");
  console.log("selectedUserAttribute=", selectedUserAttribute);
  const [students, setStudents] = useState<StudentType[]>([])
  const [mentors, setMentors] = useState<MentorType[]>([])
  const fetchUsers: AllUserType[] = USER_LIST;

  // 初期設定
  useEffect(() => {
    const fetchStudents: StudentType[]  = fetchUsers.filter((user): user is StudentType  => user.role === "student")
    const fetchMentors: MentorType[] = fetchUsers.filter((user): user is MentorType => user.role === "mentor")
    // 対応可能なメンターのリストを作成
    setStudents(fetchStudents.map((student) => (
      { ...student, 
        mentorList: fetchMentors.filter((mentor) => 
        mentor.availableStartCode <= student.taskCode && student.taskCode <= mentor.availableEndCode)
      }
    )));
    // 対応可能な生徒のリストを作成
    setMentors(fetchMentors.map((mentor) => (
      { ...mentor, 
        studentList: fetchStudents.filter((student) => 
        mentor.availableStartCode <= student.taskCode && student.taskCode <= mentor.availableEndCode)
      }
    )));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  type sortType = "asc" | "desc";

  const sortStudentList = <T extends keyof StudentType>(sortField: T, sortType: sortType) => {
    const newStudents = [...students];
    newStudents.sort((a, b) => (
      sortType === "desc" ? 
        Number(a[sortField]) - Number(b[sortField]) : 
        Number(b[sortField]) - Number(a[sortField])
      ));
    setStudents(newStudents);
  }

  const sortMentorList = <T extends keyof MentorType>(sortField: T, sortType: sortType) => {
    const newMentors = [...mentors];
    newMentors.sort((a, b) => (sortType === "desc" ? Number(a[sortField]) - Number(b[sortField]) : Number(b[sortField]) - Number(a[sortField])));
    setMentors(newMentors);
  }

  // studentsとmentorsのリストを結合し、idの昇順にソート
  const allUsers = [...students, ...mentors].sort((a,b) => a.id - b.id);

  // return { allUsers, students, mentors }
  return { allUsers, students, mentors, sortStudentList, sortMentorList }
}