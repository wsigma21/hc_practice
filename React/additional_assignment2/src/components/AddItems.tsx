import { useTodoList } from "../hooks/useTodoList"



export const AddItems = () => {
  const { todoText, onAddTodo, onChangeTodoText } = useTodoList();
  

  return (
    <div className="w-full mb-5">
      <input type="text" className="w-9/12 py-1.5 px-2 border border-gray-300 rounded-md" value={todoText} onChange={onChangeTodoText}></input>
      <button className="w-3/12 py-1.5 border border-green-500 rounded-md bg-green-500 text-white" onClick={onAddTodo}>追加</button>
    </div>
  )
}