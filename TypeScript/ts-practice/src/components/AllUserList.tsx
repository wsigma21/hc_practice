import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useUserList } from "../hooks/useUserList";
import { MentorType } from "../types/mentor";
import { useCustomModal } from "../hooks/useCustomModal";
import { CustomModal } from "./organisms/CustomModal";
import { StudentType } from "../types/student";
import { UserAttributeType } from "../types/userAttribute";

export const AllUserList: FC = () => {
  const { allUsers, addMentor, addStudent } = useUserList();
  const { modal, openModal, closeModal } = useCustomModal();
  const [ selectedRole, setSelectedRole] = useState<UserAttributeType>("student");
  const [ multiInputTarget, setMultiInputTarget] = useState<string>("勉強中の言語");

  const { register, handleSubmit, formState: { errors } } = useForm<MentorType | StudentType>();
  const onChangeRole = (role: UserAttributeType) => {
    setSelectedRole(role);
    if (role === "student") {
      setMultiInputTarget("勉強中の言語")
    } else {
      setMultiInputTarget("現場で使っている言語")
    }
  }
  const onSubmit: SubmitHandler<MentorType | StudentType> = (data) => {
    console.log("onSubmit押された！")
    console.log("data=",data)
    if (data.role === "mentor") {
      const studyLangs: string[] = [];
      const hobbies: string[] = data.hobbies.toString().split(/[,、・]/);
      const useLangs: string[] = data.useLangs.toString().split(/[,、・]/);
      addMentor({
        ...data, 
        id: allUsers.length + 1,
        studyLangs,
        hobbies,
        useLangs,
      });
    } else {
      const studyLangs: string[] = data.studyLangs.toString().split(/[,、・]/);
      const hobbies: string[] = [];
      const useLangs: string[] = [];
      addStudent({
        ...data, 
        id: allUsers.length + 1,
        hobbies,
        studyLangs,
        useLangs,
      });
    }
    closeModal();
  }
  const validRules = {
    required: "※ 入力してください",
  }
  const postCodeValidRules = {
    ...validRules,
    pattern: { value: /^\d{7}$/, message: '半角数字のみ7桁で入力してください'}
  }
  const phoneValidRules = {
    ...validRules,
    pattern: { value: /^0\d{9,10}$/, message: '0から始まる半角数字のみ10~11桁で入力してください'}
  }
  // CSS
  const tdStyle = "border border-slate-600"
  const tdNumStyle = "border border-slate-600 text-center"
  const buttonStyle = "w-1/12 py-1.5 border border-blue-300 rounded-md bg-blue-500 text-white hover:bg-white hover:text-blue-500"
  const modalItemDivStyle = "grid grid-cols-3 mr-2 mb-2 flex items-center"
  const modalItemLabelStyle = "text-right font-semibold col-span-1 mr-2"
  const modalItemInputStyle = "p-2 border rounded-md col-span-1"
  const modalItemSpanStyle = "col-span-1 ml-2 text-orange-500"
  return(
    <>
      <div className="flex justify-center">
        <button
          className={buttonStyle}
          onClick={() => openModal()}
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
          {allUsers.map((user) => (
            <tr key={user.id}>
              <td className={tdStyle}>{user.name}</td>
              <td className={tdStyle}>{user.role}</td>
              <td className={tdStyle}>{user.email}</td>
              <td className={tdNumStyle}>{user.age}</td>
              <td className={tdNumStyle}>{user.postCode}</td>
              <td className={tdNumStyle}>{user.phone}</td>
              <td className={tdStyle}>{user.hobbies.join(", ")}</td>
              <td className={tdStyle}>{user.url}</td>
              <td className={tdNumStyle}>{user.studyMinutes}</td>
              <td className={tdNumStyle}>{user.taskCode}</td>
              <td className={tdStyle}>{user.studyLangs?.join(", ")}</td>
              <td className={tdNumStyle}>{user.score}</td>
              <td className={tdStyle}>{user.mentorList?.join(", ")}</td>
              <td className={tdNumStyle}>{user.experienceDays}</td>
              <td className={tdStyle}>{user.useLangs?.join(", ")}</td>
              <td className={tdNumStyle}>{user.availableStartCode}</td>
              <td className={tdNumStyle}>{user.availableEndCode}</td>
              <td className={tdStyle}>{user.studentList?.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <CustomModal
        modal={modal}
        title={"新規登録"}
        confirm={handleSubmit(onSubmit)}
        cancel={closeModal}
      >
        <div>
          <p className="mt-2 mb-2 underline text-center">※ 趣味、{multiInputTarget}を複数入力する場合は「,」で区切ってください</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={modalItemDivStyle}>
              <label className={modalItemLabelStyle}>名前</label>
              <input
                type="text"
                id="name"
                {...register("name", validRules)}
                className={modalItemInputStyle}
              />
              <span className={modalItemSpanStyle}>{errors.name && errors.name.message}</span>
            </div>
            <div className={modalItemDivStyle}>
              <label className={modalItemLabelStyle}>ロール</label>
              <select
                id="role"
                {...register("role", validRules)}
                onChange={(event) => onChangeRole(event.target.value as UserAttributeType)}
                className={modalItemInputStyle}
              >
                <option value="student">生徒</option>
                <option value="mentor">メンター</option>
              </select>
            </div>
            <div className={modalItemDivStyle}>
              <label className={modalItemLabelStyle}>メール</label>
              <input
                type="email"
                id="email"
                {...register("email", validRules)}
                className={modalItemInputStyle} 
              />
              <span className={modalItemSpanStyle}>{errors.email && errors.email.message}</span>
            </div>
            <div className={modalItemDivStyle}>
              <label className={modalItemLabelStyle}>年齢</label>
              <input
                type="number"
                id="age"
                {...register("age", validRules)}
                className={modalItemInputStyle} 
              />
              <span className={modalItemSpanStyle}>{errors.age && errors.age.message}</span>
            </div>
            <div className={modalItemDivStyle}>
              <label className={modalItemLabelStyle}>郵便番号</label>
              <input
                type="tel"
                id="postCode"
                {...register("postCode", postCodeValidRules)}
                className={modalItemInputStyle} 
              />
              <span className={modalItemSpanStyle}>{errors.postCode && errors.postCode.message}</span>
            </div>
            <div className={modalItemDivStyle}>
              <label className={modalItemLabelStyle}>電話番号</label>
              <input
                type="tel"
                id="phone"
                {...register("phone", phoneValidRules)}
                className={modalItemInputStyle} 
              />
              <span className={modalItemSpanStyle}>{errors.phone && errors.phone.message}</span>
            </div>
            <div className={modalItemDivStyle}>
              <label className={modalItemLabelStyle}>趣味</label>
              <input
                type="text"
                id="hobbies"
                {...register("hobbies", validRules)}
                className={modalItemInputStyle} 
              />
              <span className={modalItemSpanStyle}>{errors.hobbies && errors.hobbies.message}</span>
            </div>
            <div className={modalItemDivStyle}>
              <label className={modalItemLabelStyle}>URL</label>
              <input
                type="url"
                id="url"
                {...register("url", validRules)}
                className={modalItemInputStyle} 
              />
              <span className={modalItemSpanStyle}>{errors.url && errors.url.message}</span>
            </div>
            {/* 生徒のみ */}
            {selectedRole === "student" && (
            <>
              <div className={modalItemDivStyle}>
                <label className={modalItemLabelStyle}>勉強時間</label>
                <input
                  type="number"
                  id="studyMinutes"
                  {...register("studyMinutes", validRules)}
                  className={modalItemInputStyle} 
                />
                <span className={modalItemSpanStyle}>{errors.studyMinutes && errors.studyMinutes.message}</span>
              </div>
              <div className={modalItemDivStyle}>
                <label className={modalItemLabelStyle}>課題番号</label>
                <input
                  type="number"
                  id="taskCode"
                  {...register("taskCode", validRules)}
                  className={modalItemInputStyle} 
                />
                <span className={modalItemSpanStyle}>{errors.taskCode && errors.taskCode.message}</span>
              </div>
              <div className={modalItemDivStyle}>
                <label className={modalItemLabelStyle}>勉強中の言語</label>
                <input
                  type="text"
                  id="studyLangs"
                  {...register("studyLangs", validRules)}
                  className={modalItemInputStyle} 
                />
                <span className={modalItemSpanStyle}>{errors.studyLangs && errors.studyLangs.message}</span>
              </div>
              <div className={modalItemDivStyle}>
                <label className={modalItemLabelStyle}>ハピネススコア</label>
                <input
                  type="number"
                  id="score"
                  {...register("score", validRules)}
                  className={modalItemInputStyle} 
                />
                <span className={modalItemSpanStyle}>{errors.score && errors.score.message}</span>
              </div>
            </>
            )}
            {/* メンターのみ */}
            {selectedRole === "mentor" && (
            <>
              <div className={modalItemDivStyle}>
                <label className={modalItemLabelStyle}>実務経験日数</label>
                <input
                  type="number"
                  id="experienceDays"
                  {...register("experienceDays", validRules)}
                  className={modalItemInputStyle} 
                />
                <span className={modalItemSpanStyle}>{errors.experienceDays && errors.experienceDays.message}</span>
              </div>
              <div className={modalItemDivStyle}>
                <label className={modalItemLabelStyle}>現場で使っている言語</label>
                <input
                  type="text"
                  id="useLangs"
                  {...register("useLangs", validRules)}
                  className={modalItemInputStyle} 
                />
                <span className={modalItemSpanStyle}>{errors.useLangs && errors.useLangs.message}</span>
              </div>
              <div className={modalItemDivStyle}>
                <label className={modalItemLabelStyle}>担当できる課題番号初め</label>
                <input
                  type="number"
                  id="availableStartCode"
                  {...register("availableStartCode", validRules)}
                  className={modalItemInputStyle} 
                />
                <span className={modalItemSpanStyle}>{errors.availableStartCode && errors.availableStartCode.message}</span>
              </div>
              <div className={modalItemDivStyle}>
                <label className={modalItemLabelStyle}>担当できる課題番号終わり</label>
                <input
                  type="number"
                  id="availableEndCode"
                  {...register("availableEndCode", validRules)}
                  className={modalItemInputStyle} 
                />
                <span className={modalItemSpanStyle}>{errors.availableEndCode && errors.availableEndCode.message}</span>
              </div>
            </>
            )}
          </form>
        </div>
      </CustomModal>
    </>
  )
}