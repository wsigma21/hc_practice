import styled from "styled-components";
import { ButtonMenu } from "./components/ButtonMenu";
import { UserList } from "./components/UserList";
import { useUserList } from "./hooks/useUserList";

function App() {
  const { filterUsers, onChangeInputWord } = useUserList();
  return (
    <div className="App">
      <Container>
        <ButtonMenu />
        <SInput onChange={onChangeInputWord}></SInput>
        <UserList users={filterUsers} />
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
