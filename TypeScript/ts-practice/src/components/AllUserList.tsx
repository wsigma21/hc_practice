import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useUserList } from "../hooks/useUserList";
import { MentorType } from "../types/mentor";
import { useCustomModal } from "../hooks/useCustomModal";
import { CustomModal } from "./organisms/CustomModal";
// import { AllUserType } from "../types/allUser";

export const AllUserList: FC = () => {
  const { allUsers, addMentor } = useUserList();
  const { modal, openModal, closeModal } = useCustomModal();
  // TODO: メンター・生徒で入力欄の表示を切り替える

  const { register, handleSubmit, formState: { errors } } = useForm<MentorType>();
  const onSubmit: SubmitHandler<MentorType> = (data) => {
    console.log("onSubmit押された！")
    console.log("data=",data)
    const hobbies: string[] = data.hobbies.toString().split(/[,、・]/);
    const useLangs: string[] = data.useLangs.toString().split(/[,、・]/);
    addMentor({
      ...data, 
      id: allUsers.length + 1,
      hobbies,
      useLangs,
    });
    console.log("allUsers=", allUsers);
    closeModal();
  }
  const validRules = {
    required: "入力してください",
  }
  const postCodeValidRules = {
    ...validRules,
    pattern: { value: /^\d{7}$/, message: '半角数字のみ7桁で入力してください'}
  }
  const phoneValidRules = {
    ...validRules,
    pattern: { value: /^0\d{9,10}$/, message: '0から始まる半角数字のみ10~11桁で入力してください'}
  }
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
      <button 
        className=" border border-blue-500"
        onClick={() => openModal()}
        >
          メンターの新規登録
      </button>
      <CustomModal
        modal={modal}
        title={"新規登録"}
        confirm={handleSubmit(onSubmit)}
        cancel={closeModal}
      >
        <div>
          <p>※ 趣味、現場で使っている言語を複数入力する場合は「,」で区切ってください</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="name" className="w-6/12">名前：</label>
              <input
                type="text"
                id="name"
                {...register("name", validRules)}
                className="w-6/12 p-2 mr-2 border rounded-md"
              />
              {errors.name && errors.name.message}
            </div>
            <div>
              <label className="w-6/12">ロール：</label>
              <select
                id="role"
                {...register("role", validRules)}
                className="w-6/12 p-2 mr-2 border rounded-md"
              >
                <option value="student">生徒</option>
                <option value="mentor">メンター</option>
              </select>
            </div>
            <div>
              <label className="w-6/12">メール：</label>
              <input
                type="email"
                id="email"
                {...register("email", validRules)}
                className="w-6/12 p-2 mr-2 border rounded-md" 
              />
              {errors.email && errors.email.message}
            </div>
            <div>
              <label className="w-6/12">年齢：</label>
              <input
                type="number"
                id="age"
                {...register("age", validRules)}
                className="w-6/12 p-2 mr-2 border rounded-md" 
              />
              {errors.age && errors.age.message}
            </div>
            <div>
              <label className="w-6/12">郵便番号：</label>
              <input
                type="tel"
                id="postCode"
                {...register("postCode", postCodeValidRules)}
                className="w-6/12 p-2 mr-2 border rounded-md" 
              />
              {errors.postCode && errors.postCode.message}
            </div>
            <div>
              <label className="w-6/12">電話番号：</label>
              <input
                type="tel"
                id="phone"
                {...register("phone", phoneValidRules)}
                className="w-6/12 p-2 mr-2 border rounded-md" 
              />
              {errors.phone && errors.phone.message}
            </div>
            <div>
              <label className="w-6/12">趣味：</label>
              <input
                type="text"
                id="hobbies"
                {...register("hobbies", validRules)}
                className="w-6/12 p-2 mr-2 border rounded-md" 
              />
              {errors.hobbies && errors.hobbies.message}
            </div>
            <div>
              <label className="w-6/12">URL：</label>
              <input
                type="url"
                id="url"
                {...register("url", validRules)}
                className="w-6/12 p-2 mr-2 border rounded-md" 
              />
              {errors.url && errors.url.message}
            </div>
            <div>
              <label className="w-6/12">実務経験日数：</label>
              <input
                type="number"
                id="experienceDays"
                {...register("experienceDays", validRules)}
                className="w-6/12 p-2 mr-2 border rounded-md" 
              />
              {errors.experienceDays && errors.experienceDays.message}
            </div>
            <div>
              <label className="w-6/12">現場で使っている言語：</label>
              <input
                type="text"
                id="useLangs"
                {...register("useLangs", validRules)}
                className="w-6/12 p-2 mr-2 border rounded-md" 
              />
              {errors.useLangs && errors.useLangs.message}
            </div>
            <div>
              <label className="w-6/12">担当できる課題番号初め：</label>
              <input
                type="number"
                id="availableStartCode"
                {...register("availableStartCode", validRules)}
                className="w-6/12 p-2 mr-2 border rounded-md" 
              />
              {errors.availableStartCode && errors.availableStartCode.message}
            </div>
            <div>
              <label className="w-6/12">担当できる課題番号終わり：</label>
              <input
                type="number"
                id="availableEndCode"
                {...register("availableEndCode", validRules)}
                className="w-6/12 p-2 mr-2 border rounded-md" 
              />
              {errors.availableEndCode && errors.availableEndCode.message}
            </div>
          </form>
        </div>
      </CustomModal>
    </>
  )
}