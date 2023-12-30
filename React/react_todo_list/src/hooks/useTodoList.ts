import { useState, useContext, useCallback, ChangeEvent  } from "react";
import { TodoContext } from "../components/providers/TodoProvider";

let nextId = 1;

export const useTodoList = () => {
  const { todos, setTodos } = useContext(TodoContext);
  const doneTodos = todos.filter((todo) => todo.done);
  const allTodosNum = todos.length;
  const doneTodoNum = doneTodos.length;
  const unfinishedTodoNum = allTodosNum - doneTodoNum;

  const [ todoText, setTodoText ] = useState<string>("");
  const onChangeTodoText = (event: ChangeEvent<HTMLInputElement>) => {
    setTodoText(event.target.value);
  }

  const onAddTodo = () => {
    if (todoText === "") return;
    const newTodos = [...todos, { id : nextId++, title: todoText, done:false, isEdit:false, editTitle: todoText } ];
    setTodos(newTodos);
    setTodoText("");
  }

  const onDeleteTodo = useCallback((id:number) => {
    const newTodos = todos.filter((t) => t.id !== id);
    setTodos(newTodos);
  },[todos, setTodos]);
  return { todoText, setTodos, onChangeTodoText, onAddTodo, onDeleteTodo, allTodosNum, doneTodoNum, unfinishedTodoNum}
}