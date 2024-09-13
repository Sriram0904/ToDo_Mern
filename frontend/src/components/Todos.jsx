// src/components/TodoList.jsx
import React, { useState, useEffect } from 'react';

export function TodoList() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_URL; // Use Vite environment variable
                const response = await fetch(`${apiUrl}/todos`);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                console.log('Fetched todos:', data); // Debugging: Check the data here
                setTodos(data.todos || []); // Handle wrapped data
            } catch (error) {
                console.error("Error fetching todos:", error);
                setTodos([]); // Fallback to empty array on error
            }
        };

        fetchTodos();
    }, []);

    const markAsCompleted = async (id) => {
        try {
            await fetch(`${import.meta.env.VITE_API_URL}/todos/completed`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id })
            });
            // Refresh todos list
            const response = await fetch(`${import.meta.env.VITE_API_URL}/todos`);
            const data = await response.json();
            setTodos(data.todos || []);
        } catch (error) {
            console.error("Error marking todo as completed:", error);
        }
    };

    const deleteTodo = async (id) => {
        try {
            await fetch(`${import.meta.env.VITE_API_URL}/todos/${id}`, {
                method: "DELETE"
            });
            // Refresh todos list
            const response = await fetch(`${import.meta.env.VITE_API_URL}/todos`);
            const data = await response.json();
            setTodos(data.todos || []);
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
    };

    const clearCompletedTodos = async () => {
        try {
            // Delete all completed todos
            await Promise.all(
                todos.filter(todo => todo.completed).map(todo =>
                    fetch(`${import.meta.env.VITE_API_URL}/todos/${todo._id}`, {
                        method: "DELETE"
                    })
                )
            );
            // Refresh todos list
            const response = await fetch(`${import.meta.env.VITE_API_URL}/todos`);
            const data = await response.json();
            setTodos(data.todos || []);
        } catch (error) {
            console.error("Error clearing completed todos:", error);
        }
    };

    return (
        <div>
            <h2>Existing Todos</h2>
            {todos.length === 0 ? (
                <p>No todos available</p>
            ) : (
                <ul>
                    {todos.map(todo => (
                        <li key={todo._id}>
                            <h3>{todo.title}</h3>
                            <p>{todo.description}</p>
                            <p>Status: {todo.completed ? "Completed" : "Incomplete"}</p>
                            <button onClick={() => markAsCompleted(todo._id)} disabled={todo.completed}>
                                {todo.completed ? "Completed" : "Mark as Complete"}
                            </button>
                            <button onClick={() => deleteTodo(todo._id)}>
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            )}
            <button onClick={clearCompletedTodos}>
                Clear Completed Todos
            </button>
        </div>
    );
}
