import { useTodoList } from "../hooks/useTodoList"
import { CustomModal } from "./organisms/CustomModal"
import { useCustomModal } from "../hooks/useCustomModal"

export const AddItems = () => {
  const { todoText, onAddTodo, onChangeTodoText } = useTodoList();

  const { modal, setModal, closeModal } = useCustomModal();

  const onClickAddTodo = () => {
    if (todoText === "") {
      setModal({isOpen: true})
      return
    }
    onAddTodo();
  }
  
  return (
    <>
      <div className="w-full mb-5">
        <input
          type="text"
          className="w-9/12 py-1.5 px-2 border border-gray-300 rounded-md"
          value={todoText}
          onChange={onChangeTodoText}>
        </input>
        <button
          className="w-3/12 py-1.5 border border-green-500 rounded-md bg-green-500 text-white hover:bg-white hover:text-green-500" 
          onClick={onClickAddTodo}
        >追加</button>
      </div>
      <CustomModal
        modal={modal}
        confirmText={"タスクを入力してください"}
        confirm={closeModal}
      />
    </>
  )
}