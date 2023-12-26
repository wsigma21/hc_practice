import { useState, ChangeEvent } from "react";

type TodoType = {
  id: number,
  title: string
}

let nextId = 0;

function App() {
  const [ todoText, setTodoText ] = useState<string>("");
  const [ todos, setTodos ] = useState<TodoType[]>([]);

  const onChangeTodoText = (event: ChangeEvent<HTMLInputElement>) => {
    setTodoText(event.target.value);
  }

  const onAddTodo = () => {
    if (todoText === "") return;
    const newTodos = [...todos, { id : nextId++, title: todoText} ];
    setTodos(newTodos);
    setTodoText("");
  }

  const onDeleteTodo = (id:number) => {
    const newTodos = todos.filter((t) => t.id !== id);
    setTodos(newTodos);
  }

  return (
    <div className="App">
      <input type="text" width="20px" value={todoText} onChange={onChangeTodoText}></input>
      <button onClick={onAddTodo}>追加</button>
      { todos.length > 0 && (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              {todo.title}
              <button onClick={() => onDeleteTodo(todo.id)}>削除</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
