import "../App.css";
import { useState, useEffect } from "react";
import { TodoForm } from "../components/TodoForm/TodoForm";
import { TodoList } from "../components/TodoList/TodoList";
import { Header } from "../components/Header/Header";
import { Link } from "react-router-dom";
import axios from "axios";
import { Cookies } from 'react-cookie';

function Todo() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("All");
  const cookies = new Cookies();

  useEffect(() => {
    async function fetchTodos() {
        try {
            const userId = cookies.get('user_id'); // Get the user_id from cookies
            const response = await axios.get(`http://localhost:8000/user/${userId}/todos`);
            setTodos(response.data); // Set the todos in state
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    }

    const intervalId = setInterval(fetchTodos, 1000); // Fetch todos every 5 seconds

    return () => clearInterval(intervalId); // Cleanup function to clear the interval
  }, []);

  function addTodo(user_id, newItem) {
    // Make the HTTP POST request to create a todo
    axios.post(`http://localhost:8000/users/${user_id}/todos/`, {
      title: newItem,
      completed: false,
    });
  }

  function toggleTodo(user_id, id, newTitle, checked) {
    axios.put(`http://localhost:8000/users/${user_id}/todos/${id}`, {
        title: newTitle, // Send the updated todo title
        completed: checked, // Send the completed status if needed
    });
  }

  function deleteTodo(user_id, id) {
    axios.delete(`http://localhost:8000/users/${user_id}/todos/${id}`);
  }

  function editTodo(user_id, id, newTitle, checked) {
    axios.put(`http://localhost:8000/users/${user_id}/todos/${id}`, {
        title: newTitle, // Send the updated todo title
        completed: checked, // Send the completed status if needed
    });
  }

  function filterTodo() {
    switch(filter) {
      case "Ongoing":
        return todos.filter((todo) => !todo.completed);
      case "Completed":
        return todos.filter((todo) => todo.completed);
      default:
        return todos
    }
  }

  return (
    <main>  
      <Header />
      <TodoForm addTodo={addTodo} />
      <TodoList
        todos = {filterTodo()}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
        editTodo={editTodo}
        setFilter = {setFilter}
      />

      <div className="flex justify-center mt-8 mb-3">
          <Link to="/" className="px-5 bg-red-600 py-2.5 rounded-lg shadow-xl hover:bg-red-700 w-36 text-center text-white">Back</Link>
      </div>
      
    </main>
  );
}

export default Todo;