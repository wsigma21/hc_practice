import { USER_LIST } from "../user_list";
import { UserAttributeType } from "../types/userAttribute"
import { StudentType } from "../types/student";
import { MentorType } from "../types/mentor";
import { AllUserType } from "../types/allUser";

export const useUserList = (selectedUserAttribute: UserAttributeType) => {
  console.log("useUserListページ");
  console.log("selectedUserAttribute=", selectedUserAttribute);
  const fetchUsers: AllUserType[] = USER_LIST;
  const fetchStudents: StudentType[]  = fetchUsers.filter((user): user is StudentType  => user.role === "student")
  const fetchMentors: MentorType[] = fetchUsers.filter((user): user is MentorType => user.role === "mentor")
  // 対応可能なメンターのリストを作成
  const students: StudentType[] = fetchStudents.map((student) => (
    { ...student, 
      mentorList: fetchMentors.filter((mentor) => 
      mentor.availableStartCode <= student.taskCode && student.taskCode <= mentor.availableEndCode)
    }
  ));
  // 対応可能な生徒のリストを作成
  const mentors: MentorType[] = fetchMentors.map((mentor) => (
    { ...mentor, 
      studentList: fetchStudents.filter((student) => 
      mentor.availableStartCode <= student.taskCode && student.taskCode <= mentor.availableEndCode)
    }
  ));
  // studentsとmentorsのリストを結合し、id順にソート
  const allUsers = [...students, ...mentors].sort((a,b) => a.id - b.id);

  return { allUsers, students, mentors }
}