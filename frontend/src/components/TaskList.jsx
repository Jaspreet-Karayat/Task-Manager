import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, updateTaskStatus, deleteTask } from "../redux/taskSlice";
import { format } from "date-fns";

const TaskList = () => {
    const dispatch = useDispatch();
    const { tasks } = useSelector((state) => state.task);

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    // Function to format the date as dd/mm/yy
    const formatDate = (dateString) => {
        if (!dateString) return "Not set";
        const date = new Date(dateString);
        return format(date, "dd/MM/yy");
    };

    return (
        <div className="space-y-6 py-16 px-8 relative">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">All Tasks</h2>

            {/* Add Task Button positioned at the top-right */}
            <div className="absolute top-8 right-8">
                <Link to="/addTask">
                    <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                        Add Task
                    </button>
                </Link>
            </div>

            {tasks.length === 0 ? (
                <p className="text-gray-500 text-lg">No tasks available.</p>
            ) : (
                tasks.map((task) => (
                    <div
                        key={task._id}
                        className="p-6 border border-gray-300 rounded-lg bg-white shadow-lg flex flex-col md:flex-row justify-between items-start space-y-4 md:space-y-0 md:space-x-6"
                    >
                        {/* Task Details */}
                        <div className="flex-1">
                            {/* Task Title */}
                            <div className="font-semibold text-2xl text-gray-800 mb-2">
                                <span
                                    className={
                                        task.status === "Completed"
                                            ? "line-through text-red-600"
                                            : "text-gray-800"
                                    }
                                >
                                    {task.title}
                                </span>
                            </div>

                            {/* Task Description */}
                            <p className="text-gray-600 text-base">
                                <strong>Description: </strong>
                                {task.description || "No description"}
                            </p>

                            {/* Task Priority */}
                            <strong className="text-gray-600 mb-2 text-base">Priority: </strong>
                            <span
                                className={`text-base font-semibold ${task.priority === "High"
                                    ? "text-red-600"
                                    : task.priority === "Medium"
                                        ? "text-yellow-600"
                                        : task.priority === "Low"
                                            ? "text-green-600"
                                            : "text-gray-500"
                                    } mb-2`}
                            >
                                {task.priority || "No priority"}
                            </span>

                            {/* Due Date */}
                            <div className="flex space-x-4 text-base text-gray-500">
                                <p>
                                    <strong>Due Date: </strong>
                                    {formatDate(task.dueDate)}
                                </p>
                            </div>

                            {/* Category */}
                            <div className="flex space-x-4 text-base text-gray-500">
                                <p>
                                    <strong>Category: </strong>
                                    {task.category || "General"}
                                </p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col md:flex-row md:space-x-2 space-y-4 md:space-y-0 items-center">
                            {/* Complete/Undo Button */}
                            <button
                                onClick={() => {
                                    dispatch(
                                        updateTaskStatus({
                                            id: task._id,
                                            status: task.status === "Pending" ? "Completed" : "Pending",
                                        })
                                    ).then(() => window.location.reload());
                                }}
                                className={`px-4 py-2 rounded-md transition duration-200 w-full md:w-auto ${task.status === "Completed"
                                    ? "bg-gray-400 text-gray-700"
                                    : "bg-green-500 text-white hover:bg-green-600"
                                    }`}
                            >
                                {task.status === "Completed" ? "Undo" : "Complete"}
                            </button>

                            {/* Delete Button */}
                            <button
                                onClick={() => dispatch(deleteTask(task._id))}
                                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200 w-full md:w-auto"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default TaskList;
