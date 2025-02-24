import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const user = localStorage.getItem("user");

    const handleLogout = () => {
        localStorage.removeItem("user");
        window.location.reload()
        navigate("/");
    };

    return (

        <nav className="bg-gray-800 p-5">
            <div className="container mx-auto flex justify-between">
                <Link to="/" className="text-white text-2xl">Task Manager</Link>
                <div>
                    {user && (
                        <>
                            <Link to="/home" className="mr-4 text-white">Home</Link>
                            <Link to="/status" className="text-white">Status</Link>
                        </>
                    )}
                </div>
                <div>
                    {!user ? (
                        <>
                            <Link to="/" className="mr-4 text-white">Login</Link>
                            <Link to="/register" className="text-white">Register</Link>
                        </>
                    ) : (
                        <button className="text-white" onClick={handleLogout}>Logout</button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
