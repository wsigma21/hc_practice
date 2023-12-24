import { useState, ChangeEvent } from 'react';
import styled from "styled-components";
import {USER_LIST} from "./user_list"

type UserType = {
  id: number,
  name: string;
  email: string;
}

function App() {
  const [users, setUsers] = useState<Array<UserType>>(USER_LIST);
  const originalUsers = USER_LIST;
  const onChangeInputWord = (e: ChangeEvent<HTMLInputElement>) => {
    const inputedWord = e.target.value;
    console.log(inputedWord);
    const newUsers = originalUsers.filter((user) => user.name.includes(inputedWord) || user.email.includes(inputedWord));
    setUsers(newUsers);
  }
  
  return (
    <div className="App">
      <Container>
        <SButtonContainer>
          <SUserButton>ユーザー一覧</SUserButton>
          <SPostButton>投稿一覧</SPostButton>
        </SButtonContainer>
        <SInput onChange={onChangeInputWord}></SInput>
        <Stable>
          <thead>
            <tr>
              <Sth>id</Sth>
              <Sth>名前</Sth>
              <Sth>メールアドレス</Sth>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <>
                  <tr key={user.id}>
                    <Std>{user.id}</Std>
                    <Std>{user.name}</Std>
                    <Std>{user.email}</Std>
                  </tr>
                </>
              )
            })}
          </tbody>
        </Stable>
      </Container>
    </div>
  );
}

const Container = styled.div`
  width: 500px;
  margin: 0 auto;
  padding: 30px;
`

const SButtonContainer = styled.div`
  text-align:center;
`

const SButton = styled.button`
  border: none;
  padding: 10px;
  border: 1px solid #027BFF;
  margin-bottom: 20px;
`
const SUserButton = styled(SButton)`
  background-color: #027BFF;
  color: #FFF;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`

const SPostButton = styled(SButton)`
  background-color: #FFF;
  color: #027BFF;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
`

const SInput = styled.input`
  height: 30px;
  width: 100%;
  border: 1px solid #dcdcdc;
  border-radius: 5px;
  margin-bottom: 20px;
`

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

export default App;
