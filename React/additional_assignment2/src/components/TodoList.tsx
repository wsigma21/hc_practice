import { FC } from "react";
import { TodoType } from "../types/todo";

type TodoListProps = {
  todos: TodoType[],
  onDeleteTodo: (id:number) => void
}

export const TodoList: FC<TodoListProps>= ({ todos, onDeleteTodo }) => {
  return (
    <>
      { todos.length > 0 && (
        <div>
          {todos.map((todo) => (
            <div className="group">
              <div key={todo.id} className="group-last:border-b w-full py-1.5 px-2 border-t border-r border-l border-gray-300 rounded-md flex justify-between items-center">
                <span className="w-9/12">{todo.title}</span>
                <button className="w-3/12 py-1.5 border border-red-500 rounded-md bg-red-500 text-white" onClick={() => onDeleteTodo(todo.id)}>削除</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}