import { FC, useContext } from "react";
import { UserAttributeContext } from "../providers/UserAttributeProvider";
import { AllUserList } from "./AllUserList";
import { StudentList } from "./StudentList";
import { MentorList } from "./MentorList";

export const UserList: FC = () => {
  const { userAttribute } = useContext(UserAttributeContext);
  console.log("AllUserListページ")
  console.log("userAttribute=", userAttribute);
  return (
    <>
      {userAttribute === "allUser" && <AllUserList />}
      {userAttribute === "student" && <StudentList />}
      {userAttribute === "mentor" && <MentorList />}
    </>
  )
}