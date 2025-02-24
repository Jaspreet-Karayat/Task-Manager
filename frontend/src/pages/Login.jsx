import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import Sweet from 'sweetalert2';
import Loader from '../components/Loader';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const ToastBad = Sweet.mixin({
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

    const validateForm = () => {
        const newErrors = {};
        if (!email) {
            newErrors.email = "Email address is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Email address is invalid";
        }

        if (!password) {
            newErrors.password = "Password is required";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters long";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true); // Set loading state to true
        try {
            const result = await dispatch(login({ email, password }));

            if (result.payload?.token) {
                navigate("/home");
            } else {
                ToastBad.fire({
                    icon: 'error',
                    title: 'Login failed! Please check your credentials.',
                });
            }
        } catch (error) {
            console.error("Login error:", error);
            ToastBad.fire({
                icon: 'error',
                title: 'An error occurred. Please try again later.',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white text-gray-900 py-28 flex items-center justify-center ">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white p-8 rounded-lg shadow-xl space-y-6 border border-gray-200"
            >

                <div className="form-group">
                    <label htmlFor="email" className="block text-lg font-medium mb-2 text-gray-900">
                        Email <span>*</span>
                    </label>
                    <input
                        type="email"
                        className="w-full px-4 py-3 rounded-md bg-gray-50 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 border border-gray-300"
                        id="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
                </div>

                <div className="form-group">
                    <label htmlFor="password" className="block text-lg font-medium mb-2 text-gray-900">
                        Password <span>*</span>
                    </label>
                    <input
                        type="password"
                        className="w-full px-4 py-3 rounded-md bg-gray-50 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 border border-gray-300"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password}</div>}
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    disabled={loading}
                >
                    {loading ? <Loader /> : "Login"}
                </button>
            </form>
        </div>

    );
};

export default Login;
