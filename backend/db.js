const mongoose = require('mongoose');
require('dotenv').config();

// Get the MongoDB connection URL from environment variables
const dbUrl = process.env.DB_URL;

// Connect to MongoDB
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB:', err));

// Define the schema for todos
const todoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    completed: { type: Boolean, default: false }
});

// Create the model based on the schema
const Todo = mongoose.model('Todo', todoSchema);

module.exports = {
    Todo
};
