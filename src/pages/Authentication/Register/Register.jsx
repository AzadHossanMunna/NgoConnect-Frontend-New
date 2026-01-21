import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Register = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const { createUser } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');

  const password = watch('password');

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const result = await createUser(
        data.email,
        data.firstName,
        data.lastName,
        data.password,
        data.confirmPassword
      );
      console.log('Registration successful:', result);
      toast.success('Registration successful! Please check your email for OTP verification.');
      setRegisteredEmail(data.email);
      setShowOTPModal(true);
    } catch (error) {
      console.error('Registration error:', error);
      const data = error.response?.data;
      
      // Check for specific field errors or non-field errors
      const errorMessage = data?.non_field_errors?.[0]
        || data?.email?.[0]
        || data?.password?.[0]
        || data?.first_name?.[0]
        || data?.detail
        || 'Registration failed. Please try again.';
      
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  const handleOTPVerified = () => {
    setShowOTPModal(false);
    toast.success('Email verified! You can now login.');
    navigate('/login');
  };

  return (
    <>
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <h2 className="text-4xl font-bold text-green-600">Create An Account</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="fieldset" disabled={isLoading}>
              {/* First Name */}
              <label className="label text-green-700">First Name</label>
              <input
                type="text"
                {...register('firstName', { required: true })}
                className="input input-bordered"
                placeholder="First Name"
              />
              {errors.firstName?.type === 'required' && (
                <p className='text-red-500'>First name is required</p>
              )}

              {/* Last Name */}
              <label className="label text-green-700">Last Name</label>
              <input
                type="text"
                {...register('lastName', { required: true })}
                className="input input-bordered"
                placeholder="Last Name"
              />
              {errors.lastName?.type === 'required' && (
                <p className='text-red-500'>Last name is required</p>
              )}

              {/* Email */}
              <label className="label text-green-700">Email</label>
              <input
                type="email"
                {...register('email', { required: true })}
                className="input input-bordered"
                placeholder="Email"
              />
              {errors.email?.type === 'required' && (
                <p className='text-red-500'>Email is required</p>
              )}

              {/* Password */}
              <label className="label text-green-700">Password</label>
              <input
                type="password"
                {...register('password', { 
                  required: true, 
                  minLength: 8,
                  pattern: /(?=.*\d)/ 
                })}
                className="input input-bordered"
                placeholder="Password"
              />
              {errors.password?.type === 'required' && (
                <p className='text-red-500'>Password is required</p>
              )}
              {errors.password?.type === 'minLength' && (
                <p className='text-red-500'>
                  Password must be at least 8 characters
                </p>
              )}
              {errors.password?.type === 'pattern' && (
                <p className='text-red-500'>
                  Password must contain at least one digit
                </p>
              )}

              {/* Confirm Password */}
              <label className="label text-green-700">Confirm Password</label>
              <input
                type="password"
                {...register('confirmPassword', { 
                  required: true,
                  validate: value => value === password || "Passwords do not match"
                })}
                className="input input-bordered"
                placeholder="Confirm Password"
              />
              {errors.confirmPassword?.type === 'required' && (
                <p className='text-red-500'>Please confirm your password</p>
              )}
              {errors.confirmPassword?.message && (
                <p className='text-red-500'>{errors.confirmPassword.message}</p>
              )}

              <button 
                type="submit" 
                className="btn bg-green-500 text-white mt-4 hover:bg-green-700 w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Registering...' : 'Register'}
              </button>
            </fieldset>

            <p className="text-center mt-4">
              <small>
                Already have an account?{' '}
                <Link className="text-green-600 underline" to="/login">
                  Login
                </Link>
              </small>
            </p>
          </form>
        </div>
      </div>

      {/* OTP Verification Modal */}
      {showOTPModal && (
        <OTPVerificationModal 
          email={registeredEmail} 
          onClose={() => setShowOTPModal(false)}
          onVerified={handleOTPVerified}
        />
      )}
    </>
  );
};

// OTP Verification Modal Component
const OTPVerificationModal = ({ email, onClose, onVerified }) => {
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { verifyEmail, resendOTP } = useAuth();

  const handleVerify = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast.error('Please enter a 6-digit OTP');
      return;
    }

    setIsLoading(true);
    try {
      await verifyEmail(email, otp);
      toast.success('Email verified successfully!');
      onVerified();
    } catch (error) {
      console.error('OTP verification error:', error);
      const errorMessage = error.response?.data?.detail 
        || error.response?.data?.error
        || 'Invalid OTP. Please try again.';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setIsLoading(true);
    try {
      await resendOTP(email);
      toast.success('OTP resent to your email!');
    } catch (error) {
      console.error('Resend OTP error:', error);
      toast.error('Failed to resend OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-2xl font-bold text-green-600 mb-4">Verify Your Email</h3>
        <p className="mb-4 text-gray-600">
          We've sent a 6-digit OTP to <strong>{email}</strong>
        </p>

        <form onSubmit={handleVerify}>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
            className="input input-bordered w-full mb-4 text-center text-2xl tracking-widest"
            placeholder="000000"
            maxLength={6}
            disabled={isLoading}
          />

          <div className="flex gap-2">
            <button
              type="submit"
              className="btn bg-green-500 text-white hover:bg-green-700 flex-1"
              disabled={isLoading || otp.length !== 6}
            >
              {isLoading ? 'Verifying...' : 'Verify'}
            </button>
            <button
              type="button"
              onClick={handleResend}
              className="btn btn-outline flex-1"
              disabled={isLoading}
            >
              Resend OTP
            </button>
          </div>
        </form>

        <button
          onClick={onClose}
          className="btn btn-ghost w-full mt-2"
          disabled={isLoading}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Register;
