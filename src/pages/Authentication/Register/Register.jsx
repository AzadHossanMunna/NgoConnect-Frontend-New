import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { Link } from 'react-router-dom';

const Register = () => {
  const { register, handleSubmit, formState:{ errors }} = useForm();
  const{createUser}= useAuth();

  const onSubmit = data => {
    console.log(data);
    // console.log(createUser);
    createUser(data.email,data.password)
    .then(result=>{
      console.log(result.user)
    })
    .catch(error=>{
      console.error(error)
    })
  }

  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <h2 className="text-4xl font-bold">Create An Account</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fieldset">
            <label className="label">Email</label>
            <input
              type="email"
              {...register('email', { required: true })}
              className="input"
              placeholder="Email"
            />
            {errors.email?.type === 'required' && (
              <p className='text-blue-800'>Email is required</p>
            )}

            <label className="label">Password</label>
            <input
              type="password"
              {...register('password', { required: true, minLength: 6 })}
              className="input"
              placeholder="Password"
            />
            {errors.password?.type === 'required' && (
              <p className='text-green-600'>Password is required</p>
            )}
            {errors.password?.type === 'minLength' && (
              <p className='text-green-600'>
                Password must be at least 6 characters
              </p>
            )}

            <div><a className="link link-hover">Forgot password?</a></div>
            <button type="submit" className="btn bg-green-500 text-white mt-4 hover:bg-green-700">
  Register
</button>

          </fieldset>
          <p><small>Already have an account?<Link  class="btn btn-link" to="/login">Login</Link></small></p>
        </form>
      </div>
    </div>
  );
};

export default Register;
