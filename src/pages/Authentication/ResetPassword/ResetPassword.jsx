import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from '../../../config/api.config';
import { FaLock, FaExclamationCircle, FaCheckCircle, FaArrowLeft } from 'react-icons/fa';

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    
    // URL Params
    const token = searchParams.get('token');
    const email = searchParams.get('email');

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!token || !email) {
            setError('Invalid password reset link. Please check your email and try again, or request a new link.');
        }
    }, [token, email]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (newPassword.length < 8) {
            setError('Password must be at least 8 characters long.');
            return;
        }

        if (!/\d/.test(newPassword)) {
            setError('Password must contain at least one digit.');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        setIsLoading(true);
        setError(null);
        setMessage(null);

        try {
            const response = await axios.post(`${API_BASE_URL}${API_ENDPOINTS.RESET_PASSWORD}`, { 
                email, 
                token, 
                new_password: newPassword, 
                confirm_password: confirmPassword 
            });
            setMessage(response.data.message || 'Password has been reset successfully. You can now login with your new password.');
            
            // Optional: Redirect to login after a few seconds
            setTimeout(() => {
                navigate('/login');
            }, 3000);

        } catch (err) {
            console.error(err);
            const data = err.response?.data;
            // Check for 'error' key (custom), 'non_field_errors', password validation errors, or generic detail
            const errorMsg = data?.error 
                || data?.non_field_errors?.[0]
                || data?.new_password?.[0]
                || data?.detail 
                || 'Failed to reset password. The link might be expired or invalid.';
            setError(errorMsg);
        } finally {
            setIsLoading(false);
        }
    };

    if (!token || !email) {
        return (
             <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                     <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-100 text-center">
                        <FaExclamationCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900">Invalid Link</h3>
                        <p className="mt-2 text-sm text-gray-500">
                             The password reset link is invalid or missing required information.
                        </p>
                         <div className="mt-6">
                            <Link to="/forgot-password" className="text-green-600 hover:text-green-500 font-medium">
                                Request a new link
                            </Link>
                        </div>
                     </div>
                </div>
             </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Set New Password
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Please enter your new password below.
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-100">
                    {!message ? (
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
                                    New Password
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaLock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="new-password"
                                        name="new-password"
                                        type="password"
                                        required
                                        className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 p-2 border"
                                        placeholder="Min 6 characters"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                                    Confirm Password
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaLock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="confirm-password"
                                        name="confirm-password"
                                        type="password"
                                        required
                                        className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 p-2 border"
                                        placeholder="Re-enter password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            {error && (
                                <div className="rounded-md bg-red-50 p-4">
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <FaExclamationCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
                                        </div>
                                        <div className="ml-3">
                                            <h3 className="text-sm font-medium text-red-800">Error</h3>
                                            <div className="mt-2 text-sm text-red-700">
                                                <p>{error}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                                        ${isLoading ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'}`}
                                >
                                    {isLoading ? 'Resetting...' : 'Reset Password'}
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="rounded-md bg-green-50 p-4">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <FaCheckCircle className="h-5 w-5 text-green-400" aria-hidden="true" />
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-green-800">Success!</h3>
                                    <div className="mt-2 text-sm text-green-700">
                                        <p>{message}</p>
                                        <p className="mt-2">Redirecting to login...</p>
                                    </div>
                                    <div className="mt-4">
                                        <Link to="/login" className="text-sm font-medium text-green-600 hover:text-green-500">
                                            Login now &rarr;
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
