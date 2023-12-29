import { useState, useContext,  ChangeEvent } from "react";
import { TodoContext } from "../components/providers/TodoProvider";
// import { TodoType } from "../types/todo";

let nextId = 0;

export const AddItems = () => {
  // const { todos, setTodos } = useContext<Array<TodoType>>(TodoContext);
  const { todos, setTodos } = useContext(TodoContext);
  const [ todoText, setTodoText ] = useState<string>("");
  const onChangeTodoText = (event: ChangeEvent<HTMLInputElement>) => {
    setTodoText(event.target.value);
  }

  const onAddTodo = () => {
    if (todoText === "") return;
    const newTodos = [...todos, { id : nextId++, title: todoText} ];
    setTodos(newTodos);
    setTodoText("");
  }

  return (
    <div className="w-full mb-5">
      <input type="text" className="w-9/12 py-1.5 px-2 border border-gray-300 rounded-md" value={todoText} onChange={onChangeTodoText}></input>
      <button className="w-3/12 py-1.5 border border-green-500 rounded-md bg-green-500 text-white" onClick={onAddTodo}>追加</button>
    </div>
  )
}