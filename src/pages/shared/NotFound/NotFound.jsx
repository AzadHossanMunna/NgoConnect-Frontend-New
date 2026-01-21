import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaExclamationTriangle } from 'react-icons/fa';

const NotFound = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
            <div className="text-center">
                <FaExclamationTriangle className="mx-auto h-24 w-24 text-yellow-500 mb-4" />
                <h1 className="text-9xl font-extrabold text-gray-800 tracking-widest">404</h1>
                <div className="bg-green-500 text-white px-2 text-sm rounded rotate-12 absolute">
                    Page Not Found
                </div>
                <div className="mt-8">
                    <h3 className="text-2xl font-semibold md:text-3xl text-gray-700">
                        Sorry, we couldn't find this page.
                    </h3>
                    <p className="mt-4 text-gray-500 max-w-lg mx-auto">
                        But don't worry, you can find plenty of other things on our homepage.
                    </p>
                    <Link to="/" className="btn btn-primary bg-green-600 hover:bg-green-700 border-none text-white mt-8 gap-2">
                        <FaHome /> Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;