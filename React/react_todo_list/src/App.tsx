import "./index.css";
import { AddItems } from "./components/AddItems";
import { TodoList } from "./components/TodoList";
import { StatusList } from "./components/StatusList";
import { TodoProvider } from "./providers/TodoProvider";

function App() {

  return (
    <div className="App">
      <div className="w-5/12 mx-auto mt-10">
        <h2 className="text-2xl text-emerald-500 font-semibold">ToDo List</h2>
      </div>
      <div className="w-4/12 mx-auto mt-8">
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
