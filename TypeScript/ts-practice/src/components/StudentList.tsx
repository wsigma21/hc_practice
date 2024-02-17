import { FC } from "react";
import { useUserList } from "../hooks/useUserList";

export const StudentList: FC = () => {
  const { students, sortStudentList } = useUserList();
  const tdStyle = "border border-slate-600"
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
              <span onClick={() => sortStudentList("studyMinutes", "desc")}>↓</span>
              <span onClick={() => sortStudentList("studyMinutes", "asc")}>↑</span>
            </th>
            <th className={tdStyle}>課題番号</th>
            <th className={tdStyle}>勉強中の言語</th>
            <th className={tdStyle}>ハピネススコア
              <span onClick={() => sortStudentList("score", "desc")}>↓</span>
              <span onClick={() => sortStudentList("score", "asc")}>↑</span>
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
              <td className={tdStyle}>{student.mentorList?.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}