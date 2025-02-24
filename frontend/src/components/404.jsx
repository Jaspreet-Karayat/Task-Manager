import React from "react";

const NotFoundPage = () => {
    return (
        <>
            <div className="flex items-center justify-center h-screen bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white">
                <div className="text-center px-6 md:px-12">
                    {/* Large 404 Text */}
                    <h1 className="text-8xl md:text-9xl font-extrabold mb-4 tracking-tight">
                        404
                    </h1>
                    {/* Error Message */}
                    <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                        Page Not Found
                    </h2>
                    <p className="text-md md:text-lg mb-8">
                        Sorry, the page you're looking for doesn't exist or may have been
                        moved.
                    </p>
                </div>
            </div>
        </>
    );
};

export default NotFoundPage;
