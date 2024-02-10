import { USER_LIST } from "../user_list";
import { UserAttributeType } from "../types/userAttribute"

export const useUserList = (selectedUserAttribute: UserAttributeType) => {
  console.log("useUserListページ");
  console.log("selectedUserAttribute=", selectedUserAttribute);
  const filterUsers = 
    selectedUserAttribute === "common" ? 
      USER_LIST : 
      USER_LIST.filter((user) => user.role === selectedUserAttribute)
  return { filterUsers }
}