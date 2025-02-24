import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { logout } from "./authSlice";

const API_URL = process.env.REACT_APP_API_BASE_URL;

// Function to get the token from Redux state or local storage
const getToken = (getState) => getState().auth.user?.token || localStorage.getItem("token");

// Fetch Tasks
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async (_, { getState, dispatch }) => {
    const token = getToken(getState);
    if (!token) throw new Error("No token found");

    try {
        const response = await axios.get(`${API_URL}/api/tasks`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        if (error.response?.status === 401) {
            dispatch(logout());
        }
        throw error;
    }
});

// Add Task
export const addTask = createAsyncThunk("tasks/addTask", async (taskData, { getState, dispatch }) => {
    const token = getToken(getState);
    try {
        const response = await axios.post(`${API_URL}/api/tasks`, taskData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        if (error.response?.status === 401) {
            dispatch(logout());
        }
        throw error;
    }
});

// Update Task Status
export const updateTaskStatus = createAsyncThunk("tasks/updateTaskStatus", async ({ id, status }, { getState, dispatch }) => {
    const token = getToken(getState);
    try {
        const response = await axios.put(`${API_URL}/api/tasks/${id}`, { status }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        if (error.response?.status === 401) {
            dispatch(logout());
        }
        throw error;
    }
});

// Delete Task
export const deleteTask = createAsyncThunk("tasks/deleteTask", async (taskId, { getState, dispatch }) => {
    const token = getToken(getState);
    try {
        await axios.delete(`${API_URL}/api/tasks/${taskId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return taskId;
    } catch (error) {
        if (error.response?.status === 401) {
            dispatch(logout());
        }
        throw error;
    }
});

const taskSlice = createSlice({
    name: "task",
    initialState: { tasks: [], loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = action.payload;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addTask.fulfilled, (state, action) => {
                state.tasks.push(action.payload); // Add new task to the state
            })
            .addCase(updateTaskStatus.fulfilled, (state, action) => {
                const index = state.tasks.findIndex((task) => task._id === action.payload._id);
                if (index !== -1) state.tasks[index] = action.payload; // Update task status
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.tasks = state.tasks.filter((task) => task._id !== action.payload); // Remove deleted task
            });
    },
});

export default taskSlice.reducer;
