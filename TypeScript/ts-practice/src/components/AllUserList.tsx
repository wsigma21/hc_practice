import { FC } from "react";
import { useAllUserList } from "../hooks/useAllUserList";

export const AllUserList: FC = () => {
  const { allUsers } = useAllUserList();
  return(
    <>
    <table>
      <thead>
        <tr>
          <th>名前</th>
          <th>ロール</th>
          <th>メールアドレス</th>
          <th>年齢</th>
          <th>郵便番号</th>
          <th>電話番号</th>
          <th>趣味</th>
          <th>URL</th>
          <th>勉強時間</th>
          <th>課題番号</th>
          <th>勉強中の言語</th>
          <th>ハピネススコア</th>
          <th>対応可能なメンター</th>
          <th>実務経験日数</th>
          <th>現場で使っている言語</th>
          <th>担当できる課題番号始め</th>
          <th>担当できる課題番号終わり</th>
          <th>対応可能な生徒</th>
        </tr>
      </thead>
      <tbody>
        {allUsers.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.role}</td>
            <td>{user.email}</td>
            <td>{user.age}</td>
            <td>{user.postCode}</td>
            <td>{user.phone}</td>
            <td>{user.hobbies.join(", ")}</td>
            <td>{user.url}</td>
            <td>{user.studyMinutes}</td>
            <td>{user.taskCode}</td>
            <td>{user.studyLangs?.join(", ")}</td>
            <td>{user.score}</td>
            <td>{user.mentorList?.join(", ")}</td>
            <td>{user.experienceDays}</td>
            <td>{user.useLangs?.join(", ")}</td>
            <td>{user.availableStartCode}</td>
            <td>{user.availableEndCode}</td>
            <td>{user.studentList?.join(", ")}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </>
  )
}