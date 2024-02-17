import { StudentType } from "../types/student";
import { MentorType } from "../types/mentor";
import { useContext, useEffect, useState } from "react";
import { AllUserContext } from "../providers/AllUserProvider";
import { sortType } from "../types/sort";
import { AllUserType } from "../types/allUser";

const createMentorList = (mentors: MentorType[], student: StudentType): string[] => {
  return mentors
      .filter((mentor) => 
        mentor.availableStartCode <= student.taskCode && student.taskCode <= mentor.availableEndCode)
      .map((mentor) => mentor.name)
}
const createStudentList = (students: StudentType[], mentor: MentorType): string[] => {
  return students
      .filter((student) => 
        mentor.availableStartCode <= student.taskCode && student.taskCode <= mentor.availableEndCode)
      .map((student) => student.name)
}

const sortUserList = <T extends AllUserType, K extends keyof T>(list: T[], sortField: K, sortType: sortType) => {
  const newUsers = [...list];
  newUsers.sort((a, b) => (
    sortType === "desc" ? 
    Number(a[sortField]) - Number(b[sortField]) :
    Number(b[sortField]) - Number(a[sortField])));
  return newUsers;
}

export const useUserList = () => {
  const isMentor = (user: AllUserType): user is MentorType => {
    return user.role === "mentor";
  }

  const isStudent = (user: AllUserType): user is StudentType => {
    return user.role === "student";
  }

  const { allUsers, setAllUsers } = useContext(AllUserContext);
  const fetchMentors: MentorType[] = allUsers.filter((user): user is MentorType => user.role === "mentor");
  const [students, setStudents] = useState<StudentType[]>(
    allUsers
    .filter((user): user is StudentType  => isStudent(user))
      .map((student) => ({...student, 
        mentorList: createMentorList(fetchMentors, student)
      }))
  );
  const [mentors, setMentors] = useState<MentorType[]>(
    allUsers
      .filter((user): user is MentorType => isMentor(user))
      .map((mentor) => (
        { ...mentor, 
          studentList: createStudentList(students, mentor)
        }
      ))
  );

  useEffect(() => {
    setAllUsers([...students, ...mentors].sort((a,b) => a.id - b.id));
  },[students, mentors, setAllUsers]);  

  const addUser = <T extends StudentType | MentorType>(newUser: T) => {
    if (isStudent(newUser)) {
      const newStudents: StudentType[] = [...students, {...newUser, mentorList: createMentorList(mentors, newUser)}];
      setStudents(newStudents);
    } 
    if (isMentor(newUser)){
      const newMentors: MentorType[] = [...mentors, {...newUser, studentList: createStudentList(students, newUser)}];
      setMentors(newMentors);
    }
  }

  const sortStudentList = <T extends keyof StudentType>(sortField: T, sortType: sortType) => {
    const newStudents = sortUserList(students, sortField, sortType)
    setStudents(newStudents);
  }

  const sortMentorList = <T extends keyof MentorType>(sortField: T, sortType: sortType) => {
    const newMentors = sortUserList(mentors, sortField, sortType)
    setMentors(newMentors);
  }
  return {allUsers, addUser, students, isStudent, sortStudentList, mentors, isMentor, sortMentorList}
}