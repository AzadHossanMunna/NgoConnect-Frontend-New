import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signIn } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (data) => {
        setIsLoading(true);
        try {
            const result = await signIn(data.email, data.password);
            console.log('Login successful:', result);
            toast.success('Login successful!');
            navigate(location?.state || '/');
        } catch (error) {
            console.error('Login error:', error);
            const data = error.response?.data;
            const errorMessage = data?.non_field_errors?.[0] 
                || data?.detail 
                || data?.error 
                || 'Login failed. Please check your credentials.';
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
            <h3 className="text-3xl text-center text-green-600 font-bold">Welcome back</h3>
            <p className='text-center text-green-500'>Please Login</p>

            <form className="card-body" onSubmit={handleSubmit(handleLogin)}>
                <fieldset className="fieldset" disabled={isLoading}>
                    {/* email field */}
                    <label className="label text-green-700">Email</label>
                    <input
                        type="email"
                        {...register('email', { required: true })}
                        className="input input-bordered"
                        placeholder="Email"
                    />
                    {
                        errors.email?.type === 'required' &&
                        <p className='text-red-500'>Email is required</p>
                    }

                    {/* password field */}
                    <label className="label text-green-700">Password</label>
                    <input
                        type="password"
                        {...register('password', { required: true, minLength: 8 })}
                        className="input input-bordered"
                        placeholder="Password"
                    />
                    {
                        errors.password?.type === 'required' &&
                        <p className='text-red-500'>Password is required</p>
                    }
                    {
                        errors.password?.type === 'minLength' &&
                        <p className='text-red-500'>Password must be 8 characters or longer</p>
                    }

                    <div>
                        <Link to="/forgot-password" className="link link-hover text-green-600">Forgot password?</Link>
                    </div>

                    <button 
                        type="submit"
                        className="btn bg-green-500 text-white hover:bg-green-700 mt-4"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                </fieldset>

                <p className="text-center">
                    New to NGO Connect?{" "}
                    <Link
                        state={location.state}
                        className='text-green-600 underline'
                        to="/register"
                    >
                        Register
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
