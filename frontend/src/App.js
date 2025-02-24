import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./redux/authSlice"; // Ensure login is imported
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Status from "./components/Status";
import TaskForm from "./components/TaskForm";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PNF from "./components/404";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  // Auto-login user if token exists in localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && !user) {
      dispatch(login(JSON.parse(storedUser))); // Rehydrate user state
    }
  }, [dispatch, user]);

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Redirect to Home if logged in, otherwise show Login */}
        <Route path="/" element={user ? <Navigate to="/home" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/home" /> : <Register />} />

        {/* Private Routes */}
        <Route path="/home" element={<PrivateRoute Component={Home} />} />
        <Route path="/status" element={<PrivateRoute Component={Status} />} />
        <Route path="/addTask" element={<PrivateRoute Component={TaskForm} />} />

        {/* Not Found Page */}
        <Route path="*" element={<PNF />} />
      </Routes>
    </Router>
  );
};

export default App;
