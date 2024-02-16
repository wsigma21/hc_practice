import { FC } from "react";
import { useUserList } from "../hooks/useUserList";

export const MentorList: FC = () => {
  const { mentors, sortMentorList } = useUserList();
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
          <th>実務経験日数
              <span onClick={() => sortMentorList("experienceDays", "desc")}>↓</span>
              <span onClick={() => sortMentorList("experienceDays", "asc")}>↑</span>
            </th>
          <th>現場で使っている言語</th>
          <th>担当できる課題番号始め</th>
          <th>担当できる課題番号終わり</th>
          <th>対応可能な生徒</th>
        </tr>
      </thead>
      <tbody>
        {mentors.map((mentor) => (
          <tr key={mentor.id}>
            <td>{mentor.name}</td>
            <td>{mentor.role}</td>
            <td>{mentor.email}</td>
            <td>{mentor.age}</td>
            <td>{mentor.postCode}</td>
            <td>{mentor.phone}</td>
            <td>{mentor.hobbies.join(", ")}</td>
            <td>{mentor.url}</td>
            <td>{mentor.experienceDays}</td>
            <td>{mentor.useLangs?.join(", ")}</td>
            <td>{mentor.availableStartCode}</td>
            <td>{mentor.availableEndCode}</td>
            <td>{mentor.studentList?.join(", ")}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </>
  )
}