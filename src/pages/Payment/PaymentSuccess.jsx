import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';

const PaymentSuccess = () => {
    const { fetchUserProfile } = useAuth();

    useEffect(() => {
        // Refresh profile data to update role (General User -> Donor)
        fetchUserProfile();
    }, [fetchUserProfile]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="card w-96 bg-white shadow-xl text-center p-8">
                <div className="flex justify-center mb-4">
                    <FaCheckCircle className="text-6xl text-green-500" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Donation Successful!</h2>
                <p className="text-gray-600 mb-6">
                    Thank you for your generous support. Your contribution makes a real difference.
                </p>
                <div className="space-y-3">
                    <Link to="/dashboard/myDonations" className="btn btn-primary bg-green-600 border-none w-full text-white hover:bg-green-700">
                        View Donation History
                    </Link>
                    <Link to="/" className="btn btn-outline w-full hover:bg-gray-100">
                        Return Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;
