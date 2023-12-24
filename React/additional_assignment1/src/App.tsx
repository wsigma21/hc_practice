import { useState, ChangeEvent } from 'react';
import styled from "styled-components";
import { USER_LIST } from "./user_list";
import { UserType } from "./types/user";
import { ButtonMenu } from "./components/ButtonMenu";
import { UserList } from "./components/UserList";

function App() {
  const [users, setUsers] = useState<Array<UserType>>(USER_LIST);
  const originalUsers = USER_LIST;
  const onChangeInputWord = (e: ChangeEvent<HTMLInputElement>) => {
    const inputedWord = e.target.value;
    const newUsers = originalUsers.filter((user) => user.name.includes(inputedWord) || user.email.includes(inputedWord));
    setUsers(newUsers);
  }
  
  return (
    <div className="App">
      <Container>
        <ButtonMenu />
        <SInput onChange={onChangeInputWord}></SInput>
        <UserList users={users} />
      </Container>
    </div>
  );
}

const Container = styled.div`
  width: 500px;
  margin: 0 auto;
  padding: 30px;
`

const SInput = styled.input`
  height: 30px;
  width: 100%;
  border: 1px solid #dcdcdc;
  border-radius: 5px;
  margin-bottom: 20px;
`

export default App;
