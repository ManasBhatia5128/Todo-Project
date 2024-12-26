import { createContext, useContext } from "react";
export const ToDoContext = createContext({
    todos: [
        {
            id: 1,
            todo: "todo message",
            completed: false
        }
    ],
    addTodo: (todo) => {}, // functionality gets defined in App.jsx
    updateTodo: (id, todo) => {},
    deleteTodo: (id) => {},
    toggleComplete: (id) => {}
})

export const useToDo = () => {
    return useContext(ToDoContext);
}

export const ToDoProvider = ToDoContext.Provider;