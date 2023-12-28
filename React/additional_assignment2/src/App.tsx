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
      {/* <div className="flex items-center justify-center pt-20 w-screen h-full"> */}
      {/* <div className="grid grid-cols-1 grid-rows-2 justify-items-center mt-10"> */}
      <div style={containerStyle}>
        {/* <div className="grid-item"> */}
        <div style={inputAreaStyle}>
          {/* <input type="text" className="h-100 border border-black-600 rounded-md" value={todoText} onChange={onChangeTodoText}></input> */}
          <input type="text" style={inputStyle} value={todoText} onChange={onChangeTodoText}></input>
          {/* <button className="bg-green-400 p-2 rounded-md text-white" onClick={onAddTodo}>追加</button> */}
          <button style={addButtonStyle} onClick={onAddTodo}>追加</button>
        </div>
        
        {/* <div className="grid-item"> */}
        <div>
          { todos.length > 0 && (
            <>
              {todos.map((todo, index) => (
                // <div key={todo.id} className="border w-border-red-500 rounded-md flex justify-between">
                <div style={listAreaStyle} key={todo.id}>
                  <span className="">{todo.title}</span>
                  {/* <button className="bg-red-400 p-2 rounded-md text-white" onClick={() => onDeleteTodo(todo.id)}>削除</button> */}
                  <button style={DeleteButtonStyle} onClick={() => onDeleteTodo(todo.id)}>削除</button>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const containerStyle = {
  width: "300px",
  marginTop: "30px",
  marginRight: "auto",
  marginLeft: "auto",
}

const inputAreaStyle = {
  width: "100%",
  marginBottom: "20px",
}

const inputStyle = {
  width: "80%",
  border: "1px solid #c0c0c0",
  borderRadius: "5px",
  padding: "5px",
}

const addButtonStyle = {
  width: "20%",
  border: "1px solid green",
  borderRadius: "5px",
  backgroundColor: "green",
  color: "white",
  padding: "5px",
}

const listAreaStyle = {
  border: "1px solid #c0c0c0",
  borderRadius: "5px",
  padding: "5px 10px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}

const DeleteButtonStyle = {
  width: "20%",
  border: "1px solid red",
  borderRadius: "5px",
  backgroundColor: "red",
  color: "white",
  padding: "5px",
}

export default App;
