import { useState, useCallback, ChangeEvent } from "react";
import "./index.css";
import { TodoType } from "./types/todo";
import { AddItems } from "./components/AddItems";
import { TodoList } from "./components/TodoList";


function App() {
  const [ todos, setTodos ] = useState<TodoType[]>([]);

  const onDeleteTodo = useCallback((id:number) => {
    const newTodos = todos.filter((t) => t.id !== id);
    setTodos(newTodos);
  },[todos]);

  return (
    <div className="App">
      <div className="w-3/12 mx-auto mt-10">
        <AddItems todos={todos} setTodos={setTodos} />
        <TodoList todos={todos} onDeleteTodo={onDeleteTodo}/>
      </div>
    </div>
  );
}

export default App;
