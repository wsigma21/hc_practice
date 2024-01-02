import { useTodoList } from "../hooks/useTodoList"

export const StatusList = () => {
  const { allTodosNum, doneTodoNum, unfinishedTodoNum } = useTodoList();
  return (
    <div className="w-full p-4 mb-4 border border-gray-300 rounded-md bg-white">
      <h2 className="font-bold">達成状況</h2>
      <li>全てのタスク：{allTodosNum}</li>
      <li>完了済み：{doneTodoNum}</li>
      <li>未完了：{unfinishedTodoNum}</li>
    </div>
  )
}