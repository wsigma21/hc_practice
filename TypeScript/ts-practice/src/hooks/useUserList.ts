import { StudentType } from "../types/student";
import { MentorType } from "../types/mentor";
import { useContext, useEffect, useState } from "react";
import { AllUserContext } from "../providers/AllUserProvider";
import { sortType } from "../types/sort";
import { UserAttributeType } from "../types/userAttribute";

export const useUserList = (userAttribute: UserAttributeType) => {
  const isMentor = (user: MentorType| StudentType): user is MentorType => {
    return user.role === "mentor";
  }

  const isStudent = (user: MentorType| StudentType): user is StudentType => {
    return user.role === "student";
  }

  const filterAvailableUser = (student: StudentType, mentor: MentorType): boolean => mentor.availableStartCode <= student.taskCode && student.taskCode <= mentor.availableEndCode
  const createAvailableUserList = (userList: (MentorType | StudentType)[], user: StudentType | MentorType) => {
    return userList.filter((item) => isMentor(item) ? filterAvailableUser(user as StudentType, item as MentorType) :  filterAvailableUser(item as StudentType, user as MentorType)).map((target) => target.name)
  }

  const doFilterUsers = () => {
    return userAttribute === "allUser" ? 
      allUsers.map((user) => (isMentor(user) 
        ? {  ...user, 
            availableList: createAvailableUserList(studentList, user)
          }:{
            ...user, 
            availableList: createAvailableUserList(mentorList, user)
          }))
        // userAttributeがmentor, studentならフィルターして返す
        : allUsers.map((user) => (isMentor(user) ? {
            ...user, 
            availableList: createAvailableUserList(studentList, user)
          }:{
            ...user, 
            availableList: createAvailableUserList(mentorList, user)
          }))
          .filter((user) => user.role === userAttribute)
  }
  
  const { allUsers, setAllUsers } = useContext(AllUserContext);
  const studentList = allUsers.filter((user): user is StudentType => isStudent(user));
  const mentorList = allUsers.filter((user): user is MentorType => isMentor(user));
  const [filterUsers, setFilterUsers] = useState<(StudentType | MentorType)[]>(doFilterUsers());

  useEffect(() => {
    setFilterUsers(doFilterUsers())
  },[allUsers])

  const addUser = <T extends StudentType | MentorType>(newUser: T) => {
    setAllUsers(isMentor(newUser)
      ? [...filterUsers, {...newUser, availableList: createAvailableUserList(studentList, newUser)}] 
      : [...filterUsers, {...newUser, availableList: createAvailableUserList(mentorList, newUser)}])
  }

  const sortUserList = <T extends MentorType | StudentType, K extends keyof T>(sortField: K, sortType: sortType) => {
    const newUsers = [...filterUsers as T[]];
    newUsers.sort((a, b) => (
      sortType === "desc"
        ? Number(a[sortField]) - Number(b[sortField])
        : Number(b[sortField]) - Number(a[sortField])));
    setFilterUsers(newUsers);
  }

  return {filterUsers, isMentor, isStudent, sortUserList, addUser}
}