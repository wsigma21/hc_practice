import "./index.css";
import { AddItems } from "./components/AddItems";
import { TodoList } from "./components/TodoList";
import { StatusList } from "./components/StatusList";
import { TodoProvider } from "./components/providers/TodoProvider";

function App() {

  return (
    <div className="App">
      <div className="w-4/12 mx-auto mt-10">
        <TodoProvider>
          <StatusList />
          <AddItems />
          <TodoList />
        </TodoProvider>
      </div>
    </div>
  );
}

export default App;
