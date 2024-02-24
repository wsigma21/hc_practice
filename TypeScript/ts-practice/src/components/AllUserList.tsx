import { FC, useContext } from "react";
import { useUserList } from "../hooks/useUserList";
import { AddUserModal } from "./AddUserModal";
import { UserAttributeContext } from "../providers/UserAttributeProvider";
import { useAddUserModal } from "../hooks/useAddUserModal";

export const AllUserList: FC = () => {
  const { userAttribute } = useContext(UserAttributeContext);
  const { filterUsers, isMentor, isStudent, addUser } = useUserList(userAttribute);
  const { isOpen, closeModal, onClickEntry,  register, handleSubmit, errors, selectedRole, multiInputTarget, onChangeRole, onSubmit } 
    = useAddUserModal({filterUsers, isMentor, isStudent, addUser});
  
  // CSS
  const tdStyle = "border border-slate-600 p-1.5"
  const tdNumStyle = "border border-slate-600 text-center"
  const buttonStyle = "w-1/12 py-1.5 border border-blue-300 rounded-md bg-blue-500 text-white hover:bg-white hover:text-blue-500"
  return(
    <>
      <div className="flex justify-center">
        <button
            className={buttonStyle}
            onClick={onClickEntry}
            >
            新規登録
        </button>
      </div>
      <br/>
      <table className="border-collapse border border-slate-500 table-auto w-full">
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
            <th className={tdStyle}>勉強時間</th>
            <th className={tdStyle}>課題番号</th>
            <th className={tdStyle}>勉強中の言語</th>
            <th className={tdStyle}>ハピネススコア</th>
            <th className={tdStyle}>対応可能なメンター</th>
            <th className={tdStyle}>実務経験日数</th>
            <th className={tdStyle}>現場で使っている言語</th>
            <th className={tdStyle}>担当できる課題番号始め</th>
            <th className={tdStyle}>担当できる課題番号終わり</th>
            <th className={tdStyle}>対応可能な生徒</th>
          </tr>
        </thead>
        <tbody>
          {filterUsers.map((user) => (
            <tr key={user.id}>
              <td className={tdStyle}>{user.name}</td>
              <td className={tdStyle}>{user.role}</td>
              <td className={tdStyle}>{user.email}</td>
              <td className={tdNumStyle}>{user.age}</td>
              <td className={tdNumStyle}>{user.postCode}</td>
              <td className={tdNumStyle}>{user.phone}</td>
              <td className={tdStyle}>{user.hobbies.join(", ")}</td>
              <td className={tdStyle}>{user.url}</td>
              {/* 生徒のみの列 */}
              {isStudent(user) && (
                <>
                  <td className={tdNumStyle}>{user.studyMinutes}</td>
                  <td className={tdNumStyle}>{user.taskCode}</td>
                  <td className={tdStyle}>{user.studyLangs?.join(", ")}</td>
                  <td className={tdNumStyle}>{user.score}</td>
                  <td className={tdStyle}>{user.availableList?.join(", ")}</td>
                  <td className={tdStyle}></td>
                  <td className={tdStyle}></td>
                  <td className={tdStyle}></td>
                  <td className={tdStyle}></td>
                </>
              )}
              {/* メンターのみの列 */}
              {isMentor(user) && (
                <>
                  <td className={tdStyle}></td>
                  <td className={tdStyle}></td>
                  <td className={tdStyle}></td>
                  <td className={tdStyle}></td>
                  <td className={tdStyle}></td>
                  <td className={tdNumStyle}>{user.experienceDays}</td>
                  <td className={tdStyle}>{user.useLangs?.join(", ")}</td>
                  <td className={tdNumStyle}>{user.availableStartCode}</td>
                  <td className={tdNumStyle}>{user.availableEndCode}</td>
                  <td className={tdStyle}>{user.availableList?.join(", ")}</td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <AddUserModal
        isOpen={isOpen}
        closeModal={closeModal}
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        selectedRole={selectedRole}
        multiInputTarget={multiInputTarget}
        onChangeRole={onChangeRole}
        onSubmit={onSubmit}
      />
    </>
  )
}