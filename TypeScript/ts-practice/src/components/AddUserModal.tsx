import { CustomModal } from "./organisms/CustomModal";
import { UserAttributeType } from '../types/userAttribute';
import { MentorType } from "../types/mentor";
import { StudentType } from "../types/student";
import { FieldErrors, SubmitHandler, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";

type AddUserModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  register: UseFormRegister<MentorType & StudentType>;
  handleSubmit: UseFormHandleSubmit<MentorType & StudentType>;
  errors: FieldErrors<MentorType & StudentType>;
  selectedRole: string;
  multiInputTarget: string;
  onChangeRole: (role: UserAttributeType) => void;
  onSubmit: SubmitHandler<MentorType & StudentType>;
}

export const AddUserModal = ({ 
    isOpen, 
    closeModal,
    register, 
    handleSubmit, 
    errors, 
    selectedRole, 
    multiInputTarget, 
    onChangeRole, 
    onSubmit
  }: AddUserModalProps) => {

  // 新規登録バリデーション
  const validRules = {
    required: "※ 入力してください",
  }
  const postCodeValidRules = {
    ...validRules,
    pattern: {value: /^\d{7}$/, message: '半角数字のみ7桁で入力してください'}
  }
  const phoneValidRules = {
    ...validRules,
    pattern: {value: /^0\d{9,10}$/, message: '0から始まる半角数字のみ10~11桁で入力してください'}
  }
  // CSS
  const modalItemDivStyle = "grid grid-cols-3 mr-2 mb-2 flex items-center"
  const modalItemLabelStyle = "text-right font-semibold col-span-1 mr-2"
  const modalItemInputStyle = "p-2 border rounded-md col-span-1"
  const modalItemSpanStyle = "col-span-1 ml-2 text-orange-500"
  return (
    <CustomModal
      isOpen={isOpen}
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
  )
}