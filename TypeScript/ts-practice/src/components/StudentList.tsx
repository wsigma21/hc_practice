import { FC, useContext } from "react";
import { useUserList } from "../hooks/useUserList";
import { UserAttributeContext } from "../providers/UserAttributeProvider";
import { StudentType } from "../types/student";

export const StudentList: FC = () => {
  const { userAttribute } = useContext(UserAttributeContext);
  const { filterUsers, sortUserList } = useUserList(userAttribute);
  const students = filterUsers as StudentType[];
  const tdStyle = "border border-slate-600 p-1.5"
  const tdNumStyle = "border border-slate-600 text-center"
  return(
    <>
      <table className="table-auto w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className={tdStyle}>名前</th>
            <th className={tdStyle}>ロール</th>
            <th className={tdStyle}>メールアドレス</th>
            <th className={tdStyle}>年齢</th>
            <th className={tdStyle}>郵便番号</th>
            <th className={tdStyle}>電話番号</th>
            <th className={tdStyle}>趣味</th>
            <th className={tdStyle}>URL</th>
            <th className={tdStyle}>勉強時間
              <span onClick={() => sortUserList<StudentType, "studyMinutes">("studyMinutes", "desc")}>↓</span>
              <span onClick={() => sortUserList<StudentType, "studyMinutes">("studyMinutes", "asc")}>↑</span>
            </th>
            <th className={tdStyle}>課題番号</th>
            <th className={tdStyle}>勉強中の言語</th>
            <th className={tdStyle}>ハピネススコア
              <span onClick={() => sortUserList<StudentType, "score">("score", "desc")}>↓</span>
              <span onClick={() => sortUserList<StudentType, "score">("score", "asc")}>↑</span>
            </th>
            <th className={tdStyle}>対応可能なメンター</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td className={tdStyle}>{student.name}</td>
              <td className={tdStyle}>{student.role}</td>
              <td className={tdStyle}>{student.email}</td>
              <td className={tdNumStyle}>{student.age}</td>
              <td className={tdNumStyle}>{student.postCode}</td>
              <td className={tdNumStyle}>{student.phone}</td>
              <td className={tdStyle}>{student.hobbies.join(", ")}</td>
              <td className={tdStyle}>{student.url}</td>
              <td className={tdNumStyle}>{student.studyMinutes}</td>
              <td className={tdNumStyle}>{student.taskCode}</td>
              <td className={tdStyle}>{student.studyLangs?.join(", ")}</td>
              <td className={tdNumStyle}>{student.score}</td>
              <td className={tdStyle}>{student.availableList?.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}