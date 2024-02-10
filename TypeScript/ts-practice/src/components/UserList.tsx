import { FC, useContext } from "react";
import { useUserList } from '../hooks/useUserList';
import { UserAttributeContext } from "../providers/UserAttributeProvider";

export const UserList: FC = () => {
  const { userAttribute } = useContext(UserAttributeContext);
  const { filterUsers } = useUserList(userAttribute);
  console.log("UserListページ")
  console.log("userAttribute=", userAttribute);
  return(
    <>
    <table>
      {filterUsers.map((user) => (
        <tr key={user.id}>
          <td>{user.name}</td>
          <td>{user.role}</td>
          <td>{user.email}</td>
          <td>{user.age}</td>
          <td>{user.postCode}</td>
          <td>{user.phone}</td>
          <td>{user.hobbies.join(", ")}</td>
          <td>{user.url}</td>
        </tr>
      ))}
    </table>
    </>
  )
}