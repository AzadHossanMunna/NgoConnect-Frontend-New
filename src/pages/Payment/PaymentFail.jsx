import React from 'react';
import { Link } from 'react-router-dom';
import { FaTimesCircle } from 'react-icons/fa';

const PaymentFail = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="card w-96 bg-white shadow-xl text-center p-8">
                <div className="flex justify-center mb-4">
                    <FaTimesCircle className="text-6xl text-red-500" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Failed</h2>
                <p className="text-gray-600 mb-6">
                    We were unable to process your donation. Please try again or contact support if the issue persists.
                </p>
                <div className="space-y-3">
                    <Link to="/SendDonation" className="btn btn-primary bg-green-600 border-none w-full text-white hover:bg-green-700">
                        Try Again
                    </Link>
                    <Link to="/" className="btn btn-outline w-full hover:bg-gray-100">
                        Return Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PaymentFail;
