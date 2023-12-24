import styled from "styled-components";

export const ButtonMenu = () => {
  return (
    <SButtonContainer>
      <SUserButton>ユーザー一覧</SUserButton>
      <SPostButton>投稿一覧</SPostButton>
    </SButtonContainer>
  )
}

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