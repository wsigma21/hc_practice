import { FC } from "react";
import styled from "styled-components";
import { UserType } from "../types/user"

type UserListProps = {
  users: UserType[];
}

export const UserList: FC<UserListProps>  = ({ users }) => {
  return (
    <Stable>
      <thead>
        <tr>
          <Sth>id</Sth>
          <Sth>名前</Sth>
          <Sth>メールアドレス</Sth>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
            <>
              <tr key={user.id}>
                <Std>{user.id}</Std>
                <Std>{user.name}</Std>
                <Std>{user.email}</Std>
              </tr>
            </>
          )
        )}
      </tbody>
    </Stable>
  )
}

const Stable = styled.table`
  width: 100%;
  border-collapse: collapse;
`

const Sth = styled.th`
  padding: 3px;
  text-align: center;
`

const Std = styled.td`
  padding: 3px;
  border-bottom: 1px solid #dcdcdc;
  text-align: center;
`