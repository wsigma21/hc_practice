import { FC } from "react";
import { useUserList } from "../hooks/useUserList";

export const MentorList: FC = () => {
  const { mentors, sortMentorList } = useUserList();
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
            <th className={tdStyle}>実務経験日数
                <span onClick={() => sortMentorList("experienceDays", "desc")}>↓</span>
                <span onClick={() => sortMentorList("experienceDays", "asc")}>↑</span>
              </th>
            <th className={tdStyle}>現場で使っている言語</th>
            <th className={tdStyle}>担当できる課題番号始め</th>
            <th className={tdStyle}>担当できる課題番号終わり</th>
            <th className={tdStyle}>対応可能な生徒</th>
          </tr>
        </thead>
        <tbody>
          {mentors.map((mentor) => (
            <tr key={mentor.id}>
              <td className={tdStyle}>{mentor.name}</td>
              <td className={tdStyle}>{mentor.role}</td>
              <td className={tdStyle}>{mentor.email}</td>
              <td className={tdNumStyle}>{mentor.age}</td>
              <td className={tdNumStyle}>{mentor.postCode}</td>
              <td className={tdNumStyle}>{mentor.phone}</td>
              <td className={tdStyle}>{mentor.hobbies.join(", ")}</td>
              <td className={tdStyle}>{mentor.url}</td>
              <td className={tdNumStyle}>{mentor.experienceDays}</td>
              <td className={tdStyle}>{mentor.useLangs?.join(", ")}</td>
              <td className={tdNumStyle}>{mentor.availableStartCode}</td>
              <td className={tdNumStyle}>{mentor.availableEndCode}</td>
              <td className={tdStyle}>{mentor.studentList?.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}