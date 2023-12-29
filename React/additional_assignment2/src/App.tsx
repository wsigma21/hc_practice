import "./index.css";
import { AddItems } from "./components/AddItems";
import { TodoList } from "./components/TodoList";
import { TodoProvider } from "./components/providers/TodoProvider";

function App() {

  return (
    <div className="App">
      <div className="w-3/12 mx-auto mt-10">
        <TodoProvider>
          {/* <AddItems todos={todos} setTodos={setTodos} /> */}
          <AddItems />
          <TodoList />
          {/* <TodoList todos={todos} onDeleteTodo={onDeleteTodo}/> */}
        </TodoProvider>
      </div>
    </div>
  );
}

export default App;
