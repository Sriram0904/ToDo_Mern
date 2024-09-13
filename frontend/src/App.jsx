// src/App.jsx
import React, { useState } from 'react';
import { CreateTodo } from './components/CreateTodo';
import { TodoList } from './components/Todos';

function App() {
    const [refreshKey, setRefreshKey] = useState(0);

    const handleTodoAdded = () => {
        // Trigger a re-render to refresh todos
        setRefreshKey(prevKey => prevKey + 1);
    };

    return (
        <div>
            <h1>Todo App</h1>
            <CreateTodo onTodoAdded={handleTodoAdded} />
            <TodoList key={refreshKey} /> {/* Add key to force re-render */}
        </div>
    );
}

export default App;
