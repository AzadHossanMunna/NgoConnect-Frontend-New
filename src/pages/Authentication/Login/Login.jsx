import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signIn } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogin = (data) => {
        console.log('form data', data);
        signIn(data.email, data.password)
            .then(result => {
                console.log(result.user)
                navigate(location?.state || '/')
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
            <h3 className="text-3xl text-center text-green-600 font-bold">Welcome back</h3>
            <p className='text-center text-green-500'>Please Login</p>

            <form className="card-body" onSubmit={handleSubmit(handleLogin)}>
                <fieldset className="fieldset">
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
                        {...register('password', { required: true, minLength: 6 })}
                        className="input input-bordered"
                        placeholder="Password"
                    />
                    {
                        errors.password?.type === 'minLength' &&
                        <p className='text-red-500'>Password must be 6 characters or longer</p>
                    }

                    <div>
                        <a className="link link-hover text-green-600">Forgot password?</a>
                    </div>

                    <button className="btn bg-green-500 text-white hover:bg-green-700 mt-4">
                        Login
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

            <SocialLogin />
        </div>
    );
};

export default Login;
