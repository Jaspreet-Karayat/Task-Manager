import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_BASE_URL;

// Register User
export const register = createAsyncThunk("auth/register", async (userData, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API_URL}/api/auth/register`, userData);
        localStorage.setItem("user", JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.error || "Registration failed");
    }
});

// Login User
export const login = createAsyncThunk("auth/login", async (userData, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API_URL}/api/auth/login`, userData);
        localStorage.setItem("user", JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.error || "Login failed");
    }
});

// Logout User (Thunk Action)
export const logout = () => (dispatch) => {
    localStorage.removeItem("user");
    dispatch(authSlice.actions.logoutUser());
};

// Auth Slice
const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: JSON.parse(localStorage.getItem("user")) || null,
        loading: false,
        error: null,
    },
    reducers: {
        logoutUser: (state) => {
            state.user = null;
            state.error = null;
            state.loading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            // Register Cases
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Login Cases
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default authSlice.reducer;
