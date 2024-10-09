import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { createTodo, deleteTodo } from '../graphql/mutations';
import { listTodos } from '../graphql/queries';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodoName, setNewTodoName] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    try {
      const todoData = await API.graphql(graphqlOperation(listTodos));
      const todos = todoData.data.listTodos.items;
      setTodos(todos);
    } catch (err) {
      console.log('error fetching todos');
    }
  }

  async function addTodo() {
    try {
      if (!newTodoName) return;
      const todo = { name: newTodoName };
      await API.graphql(graphqlOperation(createTodo, { input: todo }));
      setNewTodoName('');
      fetchTodos();
    } catch (err) {
      console.log('error creating todo:', err);
    }
  }

  async function removeTodo(id) {
    try {
      await API.graphql(graphqlOperation(deleteTodo, { input: { id } }));
      fetchTodos();
    } catch (err) {
      console.log('error deleting todo:', err);
    }
  }

  return (
    <div>
      <h2>Todo List</h2>
      <input
        value={newTodoName}
        onChange={(e) => setNewTodoName(e.target.value)}
        placeholder="New todo name"
      />
      <button onClick={addTodo}>Add Todo</button>
      {todos.map((todo) => (
        <div key={todo.id}>
          <p>{todo.name}</p>
          <button onClick={() => removeTodo(todo.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default TodoList;