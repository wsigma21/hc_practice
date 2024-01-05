import { useContext} from "react";
import { TodoContext } from "../providers/TodoProvider";
import { CustomModal } from "./organisms/CustomModal";
import { useTodoList } from "../hooks/useTodoList"
import { useDeleteModal } from "../hooks/useDeleteModal"

export const TodoList = () => {
  const { todos } = useContext(TodoContext);
  const { onEditTodo, onDeleteTodo, onChageEditText, onChangeStatus } = useTodoList();
  
  // モーダルの処理
  const { onClickDeleteTodo, showDeleteModal, modal, closeModal } = useDeleteModal({ onDeleteTodo });

  // 編集・保存ボタンのスタイル
  const normalButtonStyle = "w-2/12 py-1.5 mr-1 border rounded-md text-white hover:bg-white"
  const editButtonStyle = `${normalButtonStyle} border-blue-500 bg-blue-500 hover:text-blue-500`
  const saveButtonStyle = `${normalButtonStyle} border-violet-500 bg-violet-500 hover:text-violet-500`
  const deleteButtonStyle = `${normalButtonStyle} border-rose-500 bg-rose-500 hover:text-rose-500`

  if (todos.length === 0 ) return <></>
  return (
    <div className="group">
      {todos.map((todo) => (
        <div key={todo.id}>
          <div className="
            group-last:border-b 
            w-full py-1.5 px-2 
            border-t border-r border-l border-gray-300 rounded-md 
            bg-white
            flex justify-between items-center
          ">
            <input
              type="checkbox"
              className="mr-2 border border-red-500"
              onChange={() => onChangeStatus(todo.id)} />
            <input
              type="text"
              className="w-8/12 p-2 mr-2 border rounded-md disabled:bg-gray-100" 
              value={todo.isEdit ? todo.editTitle : todo.title} 
              disabled={!todo.isEdit} 
              onChange={(event)=>onChageEditText(event, todo.id)}
            />
            <button
              className={todo.isEdit ? saveButtonStyle : editButtonStyle}
              onClick={()=> onEditTodo(todo.id)}
            >{todo.isEdit ? "保 存" : "編 集"}</button>
            <button
              className={deleteButtonStyle}
              onClick={() => showDeleteModal(todo.id)}
            >削 除</button>
          </div>
          <CustomModal
            modal={modal}
            confirmText={"本当に削除してもよろしいですか？"}
            confirm={onClickDeleteTodo}
            cancel={closeModal}
          />
        </div>
      ))}
    </div>
  )
}