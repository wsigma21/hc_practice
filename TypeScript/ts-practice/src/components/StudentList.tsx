import { FC } from "react";
import { useUserList } from "../hooks/useUserList";

export const StudentList: FC = () => {
  const { students, addStudent, sortStudentList } = useUserList();
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
            <th>勉強時間
              <span onClick={() => sortStudentList("studyMinutes", "desc")}>↓</span>
              <span onClick={() => sortStudentList("studyMinutes", "asc")}>↑</span>
            </th>
            <th>課題番号</th>
            <th>勉強中の言語</th>
            <th>ハピネススコア
              <span onClick={() => sortStudentList("score", "desc")}>↓</span>
              <span onClick={() => sortStudentList("score", "asc")}>↑</span>
            </th>
            <th>対応可能なメンター</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.role}</td>
              <td>{student.email}</td>
              <td>{student.age}</td>
              <td>{student.postCode}</td>
              <td>{student.phone}</td>
              <td>{student.hobbies.join(", ")}</td>
              <td>{student.url}</td>
              <td>{student.studyMinutes}</td>
              <td>{student.taskCode}</td>
              <td>{student.studyLangs?.join(", ")}</td>
              <td>{student.score}</td>
              <td>{student.mentorList?.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button 
        className=" border border-blue-500"
        onClick={() => addStudent()}
      >
        生徒の新規登録
      </button>
    </>
  )
}