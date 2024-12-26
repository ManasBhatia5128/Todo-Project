import React, { useState } from 'react'
import { useToDo } from '../contexts';

function TodoForm() {
    const [todo, setTodo] = useState(""); // default is empty string
    const {addTodo} = useToDo(); // afterall useTodo hi todoContext return kr rha hai

    const add = (e) => {
        e.preventDefault();// prevent default behavior, like going to links with <a> tag

        if(!todo) return; // agar todo hai hi nhi then obv return 

        // addTodo({id: Date.now(), todo: todo, completed: false})// id is not required since it is handled in the defined method, also when key and value are same, you can write key only

        // tf, we didn't destructure here
        addTodo({todo, completed: false}); // todo ko hum apne defined method mein as a object treat kr rhe hain and obv obj hi spread hota hai, also id we don't have to give two times, we have given date.now() in addTodo method, we can add in one of the methods either here or in addTodo method
        setTodo(""); // setting the todo or the field again back to empty string
    }


    return (
        <form  className="flex"  onSubmit={add}>
            <input
                type="text"
                placeholder="Write Todo..."
                className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
                value={todo}
                onChange={(e) => setTodo(e.target.value)} // basically value change hone pr setTodo mein value (ie todo) pass kr denge
            />
            <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">
                Add
            </button>
        </form>
    );
}

export default TodoForm