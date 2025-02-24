import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_BASE_URL;

// Register User
export const register = createAsyncThunk("auth/register", async (userData, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API_URL}/api/auth/register`, userData);
        localStorage.setItem("user", JSON.stringify(response.data));
        // localStorage.setItem("token", response.data.token);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Registration failed");
    }
});

// Login User
export const login = createAsyncThunk("auth/login", async (userData, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API_URL}/api/auth/login`, userData);
        localStorage.setItem("user", JSON.stringify(response.data));
        // localStorage.setItem("token", response.data.token);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Login failed");
    }
});

// Logout User (Thunk Action)
export const logout = () => (dispatch) => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    dispatch(authSlice.actions.logoutUser());
};

// Auth Slice
const authSlice = createSlice({
    name: "auth",
    initialState: { user: JSON.parse(localStorage.getItem("user")) || null, error: null },
    reducers: {
        logoutUser: (state) => {
            state.user = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.fulfilled, (state, action) => {
                state.user = action.payload;
                state.error = null;
            })
            .addCase(register.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export default authSlice.reducer;
