import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/taskSlice"; // Assuming addTask is your Redux action
import Sweet from 'sweetalert2';
import Loader from '../components/Loader';

const TaskForm = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [priority, setPriority] = useState("Low");
    const [category, setCategory] = useState("Work");

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false); // Loading state to manage form submission
    const dispatch = useDispatch();

    const Toast = Sweet.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Sweet.stopTimer;
            toast.onmouseleave = Sweet.resumeTimer;
        }
    });

    // Validation Function
    const validateForm = () => {
        const newErrors = {};

        if (!title.trim()) {
            newErrors.title = "Task title is required";
        }

        if (!description.trim()) {
            newErrors.description = "Task description is required";
        }

        if (!dueDate) {
            newErrors.dueDate = "Due date is required";
        }

        if (!priority) {
            newErrors.priority = "Priority is required";
        }

        if (!category) {
            newErrors.category = "Category is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return; // Prevent form submission if there are errors
        }

        try {
            setLoading(true); // Start loading spinner

            // Dispatch the task to the Redux store with all the input fields
            const result = await dispatch(addTask({
                title,
                description,
                dueDate,
                priority,
                category,
                status: "Pending", // Default status is "Pending"
            }));

            // Check if the result indicates success (based on action type or response)
            if (result.type === "tasks/addTask/fulfilled") {
                // Reset form fields after successful submission
                setTitle("");
                setDescription("");
                setDueDate("");
                setPriority("Low");
                setCategory("Work");

                // Show success toast
                Toast.fire({
                    icon: 'success',
                    title: 'Task added successfully!',
                });
            } else {
                // Show error toast for failed task addition
                Toast.fire({
                    icon: 'error',
                    title: 'Failed to add task, please try again!',
                });
            }

        } catch (error) {
            console.error("Error adding task:", error);

            // Show error toast if something goes wrong
            Toast.fire({
                icon: 'error',
                title: 'An error occurred. Please try again later.',
            });
        } finally {
            setLoading(false); // Stop loading spinner
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen py-12">
            <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md space-y-6">
                <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">Create a New Task</h2>

                {/* Task Title Section */}
                <div className="space-y-1">
                    <label htmlFor="title" className="text-lg font-medium text-gray-700">Task Title</label>
                    <input
                        id="title"
                        className={`border p-2 w-full rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400 ${errors.title ? "border-red-500" : "border-gray-300"}`}
                        type="text"
                        placeholder="Enter task title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                </div>

                {/* Task Description Section */}
                <div className="space-y-1">
                    <label htmlFor="description" className="text-lg font-medium text-gray-700">Task Description</label>
                    <textarea
                        id="description"
                        className={`border p-2 w-full rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400 ${errors.description ? "border-red-500" : "border-gray-300"}`}
                        placeholder="Enter task description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                </div>

                {/* Due Date Section */}
                <div className="space-y-1">
                    <label htmlFor="dueDate" className="text-lg font-medium text-gray-700">Due Date</label>
                    <input
                        id="dueDate"
                        className={`border p-2 w-full rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400 ${errors.dueDate ? "border-red-500" : "border-gray-300"}`}
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                    />
                    {errors.dueDate && <p className="text-red-500 text-sm">{errors.dueDate}</p>}
                </div>

                {/* Task Priority Section */}
                <div className="space-y-1">
                    <label htmlFor="priority" className="text-lg font-medium text-gray-700">Priority</label>
                    <select
                        id="priority"
                        className={`border p-2 w-full rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400 ${errors.priority ? "border-red-500" : "border-gray-300"}`}
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                    >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                    {errors.priority && <p className="text-red-500 text-sm">{errors.priority}</p>}
                </div>

                {/* Task Category Section */}
                <div className="space-y-1">
                    <label htmlFor="category" className="text-lg font-medium text-gray-700">Category</label>
                    <select
                        id="category"
                        className={`border p-2 w-full rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400 ${errors.category ? "border-red-500" : "border-gray-300"}`}
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="Work">Work</option>
                        <option value="Personal">Personal</option>
                        <option value="Other">Other</option>
                    </select>
                    {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-200  disabled:bg-gray-300 disabled:cursor-not-allowed"
                    disabled={loading}
                >
                    {loading ? <Loader /> : "Add Task"}
                </button>
            </form>
        </div>
    );
};

export default TaskForm;
