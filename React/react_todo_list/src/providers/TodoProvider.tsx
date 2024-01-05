import { useState, createContext, Dispatch, ReactNode, SetStateAction } from "react";
import { TodoType } from "../types/todo";

export type TodoContextType = {
  todos: TodoType[];
  setTodos: Dispatch<SetStateAction<TodoType[]>>;
}

export const TodoContext = createContext<TodoContextType>(
  {} as TodoContextType
);

export const TodoProvider = (props: { children: ReactNode }) => {
  const { children } = props;
  const [ todos, setTodos ] = useState<TodoType[]>([]);

  return (
    <TodoContext.Provider value={{ todos, setTodos }} >
      { children }
    </TodoContext.Provider>
  )
}

