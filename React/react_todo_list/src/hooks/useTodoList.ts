import { useState, useContext, useCallback, ChangeEvent  } from "react";
import { TodoType } from "../types/todo";
import { TodoContext } from "../components/providers/TodoProvider";

let nextId = 1;

export const useTodoList = () => {
  const { todos, setTodos } = useContext(TodoContext);
  const doneTodos = todos.filter((todo) => todo.done);
  const allTodosNum = todos.length;
  const doneTodoNum = doneTodos.length;
  const unfinishedTodoNum = allTodosNum - doneTodoNum;

  // Todo入力
  const [ todoText, setTodoText ] = useState<string>("");
  const onChangeTodoText = (event: ChangeEvent<HTMLInputElement>) => {
    setTodoText(event.target.value);
  }

  // 追加
  const onAddTodo = useCallback(() => {
    if (todoText === "") return;
    const newTodos = [...todos, { id : nextId++, title: todoText, done: false, isEdit: false, editTitle: todoText } ];
    setTodos(newTodos);
    setTodoText("");
  },[todos, todoText, setTodos, setTodoText]);

  // 削除
  const onDeleteTodo = useCallback((id: number) => {
    const newTodos = todos.filter((t) => t.id !== id);
    setTodos(newTodos);
  },[todos, setTodos]);

  // 編集
  const onEditTodo = useCallback((id: number) => {
    // 更新対象のTodoのindexを取得
    const index = todos.findIndex((todo) => (todo.id === id));
    if (index === -1) return;
    
    // todosの更新処理
    const newTodos = [...todos];
    const title = newTodos[index]?.isEdit ? newTodos[index].editTitle : newTodos[index].title;
    newTodos[index] = {...newTodos[index], isEdit:!newTodos[index].isEdit, title};

    setTodos(newTodos);
  }, [todos, setTodos]);

  // 編集入力
  const onChageEditText = useCallback((event: ChangeEvent<HTMLInputElement>, id: number) => {
    const newTodos = todos.map((todo) => (todo.id === id ? {...todo, editTitle:event.target.value} : todo));
    setTodos(newTodos);
  }, [todos,setTodos]);

  // 達成ステータスの更新
  const onChangeStatus = useCallback((id: number) => {
    const newTodos = todos.map((todo) => (todo.id === id ? {...todo, done:!todo.done} : todo))
    setTodos(newTodos)
  },[todos, setTodos]);

  return { todoText, setTodos, onChangeTodoText, onAddTodo, onDeleteTodo, onEditTodo, onChageEditText, onChangeStatus, allTodosNum, doneTodoNum, unfinishedTodoNum}
}