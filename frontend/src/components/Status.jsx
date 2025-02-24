import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../redux/taskSlice"; // Import fetchTasks

const Status = () => {
    const dispatch = useDispatch();
    const { tasks } = useSelector((state) => state.task);
    const [filter, setFilter] = useState("All");

    useEffect(() => {
        dispatch(fetchTasks()); // Fetch tasks when the page loads
    }, [dispatch]);

    // Filter tasks based on the selected filter (All, Pending, Completed)
    const filteredTasks =
        filter === "All"
            ? tasks
            : tasks.filter((task) => task.status === filter);

    // Function to format the date as dd/mm/yy
    const formatDate = (dateString) => {
        if (!dateString) return "Not set";
        const date = new Date(dateString);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">Task Status</h1>

            {/* Filter Buttons */}
            <div className="mb-6 space-x-4 flex justify-center">
                <button
                    className={`px-6 py-2 rounded-lg text-lg font-medium ${filter === "All" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"}`}
                    onClick={() => setFilter("All")}
                >
                    All
                </button>
                <button
                    className={`px-6 py-2 rounded-lg text-lg font-medium ${filter === "Completed" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"}`}
                    onClick={() => setFilter("Completed")}
                >
                    Completed
                </button>
                <button
                    className={`px-6 py-2 rounded-lg text-lg font-medium ${filter === "Pending" ? "bg-yellow-600 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"}`}
                    onClick={() => setFilter("Pending")}
                >
                    Pending
                </button>
            </div>

            {/* Task List */}
            {filteredTasks.length === 0 ? (
                <p className="text-gray-500 text-lg">No tasks found.</p>
            ) : (
                filteredTasks.map((task) => (
                    <div key={task._id} className="p-4 bg-white border rounded-lg shadow-sm mb-4 flex flex-col md:flex-row justify-between items-start space-y-4 md:space-y-0 md:space-x-6">
                        {/* Task Details */}
                        <div className="flex-1">
                            {/* Task Title */}
                            <div className="font-semibold text-2xl text-gray-800 mb-2">
                                <span className={task.status === "Completed" ? "line-through text-green-600" : "text-gray-800"}>
                                    {task.title}
                                </span>
                            </div>

                            {/* Task Due Date */}
                            <p className="text-gray-600 text-lg mb-1">
                                <strong>Due Date: </strong>
                                {formatDate(task.dueDate)}
                            </p>

                            {/* Task Priority */}
                            <p className={`text-lg font-semibold mb-1 ${task.priority === "High" ? "text-red-600" : task.priority === "Medium" ? "text-yellow-600" : "text-green-600"}`}>
                                <strong>Priority: </strong>{task.priority || "No priority"}
                            </p>

                            {/* Task Status */}
                            <p className={`text-lg font-semibold ${task.status === "Completed" ? "text-green-600" : "text-yellow-600"}`}>
                                <strong>Status: </strong>
                                {task.status}
                            </p>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default Status;
