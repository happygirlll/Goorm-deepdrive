import React, { useState } from 'react';
import './App.css';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = () => {
    const newTodo = {
      id: Date.now(),
      text: '',
      completed: false,
      editing: false,
    };
    setTodos([...todos, newTodo]);
  };

  const deleteAllTodos = () => {
    setTodos([]); 
  };

  const updateTodo = (id, updatedText) => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, text: updatedText } : todo)));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  const toggleEditing = (id) => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, editing: !todo.editing } : todo)));
  };

  return (
    <div className="container">
      <h1>Todo</h1>
      <AddTodo addTodo={addTodo} />
      <TodoList
        todos={todos}
        setTodos={setTodos}
        updateTodo={updateTodo}
        deleteTodo={deleteTodo}
        toggleComplete={toggleComplete}
        toggleEditing={toggleEditing}
      />
      <button className="delete-all" onClick={deleteAllTodos}>
        전체 삭제
      </button>
    </div>
  );
  
}

export default App;
