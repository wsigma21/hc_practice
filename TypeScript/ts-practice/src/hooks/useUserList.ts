import { StudentType } from "../types/student";
import { MentorType } from "../types/mentor";
import { useContext, useEffect, useState } from "react";
import { AllUserContext } from "../providers/AllUserProvider";
import { sortType } from "../types/sort";

const createMentorList = (mentors: MentorType[], student: StudentType): string[] => {
  const mentorList = mentors
      .filter((mentor) => 
        mentor.availableStartCode <= student.taskCode && student.taskCode <= mentor.availableEndCode)
      .map((mentor) => mentor.name)
  return mentorList
}
const createStudentList = (students: StudentType[], mentor: MentorType): string[] => {
  const studentList = students
      .filter((student) => 
        mentor.availableStartCode <= student.taskCode && student.taskCode <= mentor.availableEndCode)
      .map((student) => student.name)
  return studentList
}

export const useUserList = () => {
  const { allUsers, setAllUsers } = useContext(AllUserContext);

  const fetchMentors: MentorType[] = allUsers.filter((user): user is MentorType => user.role === "mentor");
  const [students, setStudents] = useState<StudentType[]>(
    allUsers
      .filter((user): user is StudentType  => user.role === "student")
      .map((student) => ({...student, 
        mentorList: createMentorList(fetchMentors, student)
      }))
  );
  const [mentors, setMentors] = useState<MentorType[]>(
    allUsers
      .filter((user): user is MentorType => user.role === "mentor")
      .map((mentor) => (
        { ...mentor, 
          studentList: createStudentList(students, mentor)
        }
      ))
  );

  useEffect(() => {
    setAllUsers([...students, ...mentors].sort((a,b) => a.id - b.id));
  },[students, mentors, setAllUsers]);  

  const addStudent = (newStudent: StudentType) => {
    const newStudents: StudentType[] = [...students, {...newStudent, mentorList: createMentorList(mentors, newStudent)}];
    setStudents(newStudents);
  }

  const addMentor = (newMentor: MentorType) => {
    const newMentors: MentorType[] = [...mentors, {...newMentor, studentList: createStudentList(students, newMentor)}];
    setMentors(newMentors);
  }


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
    newMentors.sort((a, b) => (
      sortType === "desc" ? 
      Number(a[sortField]) - Number(b[sortField]) :
      Number(b[sortField]) - Number(a[sortField])));
    setMentors(newMentors);
  }

  return { allUsers, students, setStudents, addStudent, sortStudentList, mentors, addMentor, sortMentorList }
}