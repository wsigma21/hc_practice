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
    // 更新対象のTodoを取得
    const targetTodo = todos.find((todo) => (todo.id === id));

    // todosの更新処理
    let newTodos:TodoType[];
    if (targetTodo?.isEdit) { // 保存 -> 編集　編集を終えて保存する
      newTodos = todos.map((todo) => (todo.id === id ? {...todo, isEdit:!todo.isEdit, title:targetTodo.editTitle} : todo))
    } else { // 編集 -> 保存 編集を始める
      newTodos = todos.map((todo) => (todo.id === id ? {...todo, isEdit:!todo.isEdit} : todo))
    }
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