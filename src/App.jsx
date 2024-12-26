import { useEffect, useState } from "react";
import "./contexts/index";
import { ToDoProvider } from "./contexts/index";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    // setTodos(todo); // All old values will delete and only one new val will be there
    // setTodos((prevArray) => [todo, ...prevArray]); // but a todo has id and values both
    console.log(todo);  
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]); // toto is object of a string and boolean completed
  }; // and we are writing it as array since tods is an array, also you can use curly braces and return syntax

  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
    ); // this prev is the prev state ie we do [todos, setTodos], we get prev todos
  }; // In this we have done for each element if prev.id === id : if true then change todo, if false then let it as it is

  const deleteTodo = (id) => {
    setTodos((prev) => {
      return prev.filter((todo) => todo.id !== id);
    }); // based on this condition, we filter the todos
  }; // jb id match nhi kregi wahi ids filter hokar setTodos mein jayegi

  const toggleComplete = (id) => {
    // console.log(id);
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id == id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    ); // func on each element, spread the object and override the completed proprty as its inverse
  };

  // My thinking as method-2: this is wrong syntax, it expects neither a callback nor a condition
  // const toggleComplete = (id) => {
  //   setTodos((prev) =>
  //     prev.map((prevTodo) =>
  //       prevTodo.id === id
  //         ? (prevTodo) => {prevTodo.completed = !prevTodo.completed; return prevTodo}
  //         : prevTodo
  //     )
  //   ); // func on each element, spread the object and override the completed proprty as its inverse
  // };

  // When the user adds a todo, you might think to add todo (useState wala) in the dependency array of the first useEffect, however it is not the most optimised approach since the whole code will run again (getting the values and setting again)
  
  // So we will create another useEffect
  
  
  
  // useEffect hook: works when page is reloaded
  useEffect(() => {
    // localStorage.getItem("abc"); // will output in string, we have to convert it in JSON
    const todos = JSON.parse(localStorage.getItem("todos")); // json can be array too, to convert from string to array/ object, this method is used
    if (todos && todos.length > 0) {
      // todos when is not their is equal to null/undefined so are treated as falsy values
      setTodos(todos);
    }
  }, []); 

  // ** Most important thing: Get before you set, js runs up to down, when you refresh, iit gets set to empty array again
  // Initialize useState from localStorage before calling setState to ensure correct initial state.
  
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos)); // key must be taken as "todos" only since we used it in prev hook too, you shouldn't add to a different key
  }, [todos]);
/* Why JSON can be array??
since: key: [array] */


  //  Unless there is no server side rendering (use of backend), we can directly access local storage





  // first curly brace for jsx format, second for destructuring, can also do obj
  // then access as obj.todos etc
  return (
    <ToDoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
    >
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">{
          /* Todo form goes here */}
          <TodoForm/>
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {/* <TodoItem/> */}
            {todos.map((todo) => (
              <div key={todo.id} className="w-full">
                <TodoItem todo={todo}/>
              </div> // You can also use indexes ie 0, 1, 2 but it is not optimisied since with item deletion whole of your keys need to be restructured
            ))} {/* With parenthesis, there is auto-return */}
          </div>
        </div>
      </div>
    </ToDoProvider>
  );
}

export default App;
