// src/components/CreateTodo.jsx
import React, { useState } from 'react';

export function CreateTodo({ onTodoAdded }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleAddTodo = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/todos`, { // Use Vite environment variable
                method: "POST",
                body: JSON.stringify({
                    title: title,
                    description: description
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const result = await response.json();
            console.log(result);
            setTitle('');
            setDescription('');
            alert("Todo added successfully");

            // Call the callback to refresh todos (if provided)
            if (onTodoAdded) {
                onTodoAdded();
            }
        } catch (error) {
            console.error('Error adding todo:', error);
            alert("Failed to add todo. Please try again.");
        }
    };

    return (
        <div>
            <input
                style={{
                    border: '2px solid black',
                    padding: 5,
                    marginBottom: 5,
                }}
                type="text"
                placeholder="Title"
                value={title}
                onChange={handleTitleChange}
            />
            <br />
            <input
                style={{
                    border: '2px solid black',
                    padding: 5,
                    marginBottom: 5,
                }}
                type="text"
                placeholder="Description"
                value={description}
                onChange={handleDescriptionChange}
            />
            <br />
            <button
                style={{
                    border: '2px solid black',
                    padding: 5,
                    marginBottom: 5,
                }}
                onClick={handleAddTodo}
            >
                Add Todo
            </button>
        </div>
    );
}
