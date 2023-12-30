import { useContext, useRef } from "react";
import { ReactModalMethods } from "../interfaces/reactModalMethods";
import { TodoContext } from "../components/providers/TodoProvider";
import { DeleteConfirmModal } from "../components/DeleteConfirmModal";
import { useTodoList } from "../hooks/useTodoList"

export const TodoList = () => {
  const { todos } = useContext(TodoContext);
  const { onEditTodo, onChageEditText, onChangeStatus } = useTodoList();

  // モーダルの処理
  const reactModalRef = useRef<ReactModalMethods | null>(null);
  const callChildMethod = (id: number) => {
    reactModalRef.current?.showDeleteModal(id);
  }

  // 編集・保存ボタンのスタイル
  const editButtonStyle = "w-2/12 py-1.5 mr-1 border border-blue-400 rounded-md bg-blue-400 text-white hover:bg-white hover:text-blue-400"
  const saveButtonStyle = "w-2/12 py-1.5 mr-1 border border-indigo-500 rounded-md bg-indigo-500 text-white hover:bg-white hover:text-indigo-500"

  if (todos.length === 0 ) return <></>
  return (
    <>
      <div className="group">
        {todos.map((todo) => (
          <div key={todo.id} className="group-last:border-b w-full py-1.5 px-2 border-t border-r border-l border-gray-300 rounded-md flex justify-between items-center">
            <input type="checkbox" className="mr-2 border border-red-500" onChange={() => onChangeStatus(todo.id)} />
            <input
              type="text"
              className="w-8/12 p-2 mr-2 border rounded-md disabled:bg-gray-100" 
              value={todo.isEdit ? todo.editTitle : todo.title} 
              disabled={!todo.isEdit} 
              onChange={(event)=>{ onChageEditText(event, todo.id)}}
            />
            <button
              className={ todo.isEdit ? saveButtonStyle : editButtonStyle }
              onClick={()=> onEditTodo(todo.id)}
            >{todo.isEdit ? "保存" : "編集"}</button>
            <button
              className="w-2/12 py-1.5 border border-red-500 rounded-md bg-red-500 text-white hover:bg-white hover:text-red-500"
              // onClick={() => showDeleteModal(todo.id)}
              onClick={() => callChildMethod(todo.id)}
            >削除</button>
          </div>
        ))}
        <DeleteConfirmModal ref={reactModalRef}/>
      </div>
    </>
  )
}