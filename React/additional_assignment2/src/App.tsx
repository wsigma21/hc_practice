import { useState, ChangeEvent } from "react";
import "./index.css";

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
      <div className="w-3/12 mx-auto mt-10">
        <div className="w-full mb-5">
          <input type="text" className="w-9/12 py-1.5 px-2 border border-gray-300 rounded-md" value={todoText} onChange={onChangeTodoText}></input>
          <button className="w-3/12 py-1.5 border border-green-500 rounded-md bg-green-500 text-white" onClick={onAddTodo}>追加</button>
        </div>
        
        <div>
          { todos.length > 0 && (
            <div>
              {todos.map((todo, index) => (
                <div className="group">
                  <div key={todo.id} className="group-last:border-b w-full py-1.5 px-2 border-t border-r border-l border-gray-300 rounded-md flex justify-between items-center">
                    <span className="w-9/12">{todo.title}</span>
                    <button className="w-3/12 py-1.5 border border-red-500 rounded-md bg-red-500 text-white" onClick={() => onDeleteTodo(todo.id)}>削除</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
