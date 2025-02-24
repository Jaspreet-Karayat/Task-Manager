const express = require("express");
const Task = require("../models/Task");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Get all tasks
router.get("/", authMiddleware, async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: "Server error while fetching tasks" });
    }
});

// Create a new task
router.post("/", authMiddleware, async (req, res) => {
    try {
        const { title, description, dueDate, priority, category } = req.body;

        if (!title || !description || !dueDate || !priority || !category) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const task = await Task.create({
            user: req.user.id,
            title,
            description,
            dueDate,
            priority,
            category,
            status: "Pending" // Default status is "Pending"
        });

        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ error: "Server error while creating task" });
    }
});

// Update task status or other fields
router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const { status, title, description, dueDate, priority, category } = req.body;

        const updatedTaskData = {};
        if (status) updatedTaskData.status = status;
        if (title) updatedTaskData.title = title;
        if (description) updatedTaskData.description = description;
        if (dueDate) updatedTaskData.dueDate = dueDate;
        if (priority) updatedTaskData.priority = priority;
        if (category) updatedTaskData.category = category;

        const task = await Task.findByIdAndUpdate(
            req.params.id,
            updatedTaskData,
            { new: true } // To return the updated task
        );

        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }

        res.json(task);
    } catch (error) {
        res.status(500).json({ error: "Server error while updating task" });
    }
});

// Delete a task
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }

        await task.deleteOne();
        res.json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Server error while deleting task" });
    }
});

module.exports = router;
