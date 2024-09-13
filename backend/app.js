const express = require('express');
const app = express();
const { createTodo, updateTodo } = require('./types.js');
const { Todo } = require('./db.js'); // Ensure correct model import
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

app.use(express.json());
app.use(cors());

console.log("Server starting...");

// Create a new todo
app.post("/todos", async (req, res) => {
    const createPayload = req.body;
    const parsePayload = createTodo.safeParse(createPayload);

    if (!parsePayload.success) {
        res.status(400).json({
            msg: "Invalid input data"
        });
        return;
    }

    try {
        await Todo.create({
            title: createPayload.title,
            description: createPayload.description,
            completed: false
        });
        res.json({
            msg: "Todo created successfully"
        });
        console.log("Todo created");
    } catch (error) {
        console.error("Error creating todo:", error);
        res.status(500).json({
            msg: "Failed to create todo"
        });
    }
});

// Fetch all todos
app.get("/todos", async (req, res) => {
    try {
        const todos = await Todo.find({});
        res.json({ todos }); // Wrap todos in an object with key `todos`
        console.log("Todos fetched");
    } catch (error) {
        console.error("Error fetching todos:", error);
        res.status(500).json({
            msg: "Failed to fetch todos"
        });
    }
});

// Mark a todo as completed
app.post("/todos/completed", async (req, res) => {
    const updatePayload = req.body;
    const parsePayload = updateTodo.safeParse(updatePayload);

    if (!parsePayload.success) {
        res.status(400).json({
            msg: "Invalid input data"
        });
        return;
    }

    try {
        const result = await Todo.updateOne(
            { _id: updatePayload.id },
            { $set: { completed: true } }
        );
        if (result.matchedCount === 0) {
            return res.status(404).json({
                msg: "Todo not found"
            });
        }
        res.json({
            msg: "Todo marked as completed"
        });
        console.log("Todo completed");
    } catch (error) {
        console.error("Error updating todo:", error);
        res.status(500).json({
            msg: "Failed to update todo"
        });
    }
});

// Delete a todo
app.delete("/todos/:id", async (req, res) => {
    const { id } = req.params;

    try {
        // Validate ID format (optional but recommended)
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                msg: "Invalid todo ID format"
            });
        }

        const result = await Todo.deleteOne({ _id: id });

        if (result.deletedCount === 0) {
            return res.status(404).json({
                msg: "Todo not found"
            });
        }

        res.json({
            msg: "Todo deleted successfully"
        });
        console.log("Todo deleted");
    } catch (error) {
        console.error("Error deleting todo:", error);
        res.status(500).json({
            msg: "Failed to delete todo"
        });
    }
});

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
console.log("hello");