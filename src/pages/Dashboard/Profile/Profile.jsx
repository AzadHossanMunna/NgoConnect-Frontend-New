import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const Profile = () => {
  const { getUserProfile, updateProfile, changePassword, user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [profile, setProfile] = useState(null);
  const [volunteerProfile, setVolunteerProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Profile Update Form
  const { 
    register: registerProfile, 
    handleSubmit: handleSubmitProfile, 
    setValue,
    formState: { errors: profileErrors } 
  } = useForm();

  // Change Password Form
  const { 
    register: registerPassword, 
    handleSubmit: handleSubmitPassword, 
    reset: resetPasswordForm,
    watch,
    formState: { errors: passwordErrors } 
  } = useForm();

  // Volunteer Profile Form
  const {
      register: registerVolunteer,
      handleSubmit: handleSubmitVolunteer,
      setValue: setVolunteerValue,
      formState: { errors: volunteerErrors }
  } = useForm();

  const loadProfile = async () => {
    try {
      const data = await getUserProfile();
      setProfile(data);
      // Set initial values for form
      setValue('first_name', data.first_name);
      setValue('last_name', data.last_name);
      
      // If volunteer, get volunteer details
      if (data.role === 'volunteer') {
         try {
             const vRes = await axiosSecure.get('/api/volunteer/profile/');
             const vData = vRes.data;
             setVolunteerProfile(vData);
             setVolunteerValue('skills', vData.skills);
             setVolunteerValue('availability', vData.availability);
         } catch (vErr) {
             console.error("Failed to load volunteer profile", vErr);
         }
      }

      setIsLoading(false);
    } catch (error) {
      console.error('Failed to load profile:', error);
      toast.error('Failed to load profile data');
      setIsLoading(false);
    }
  };

  const onUpdateVolunteerProfile = async (data) => {
      try {
          const res = await axiosSecure.patch('/api/volunteer/profile/', data);
          setVolunteerProfile(res.data);
          toast.success('Volunteer profile updated');
      } catch (error) {
          console.error("Failed to update volunteer profile", error);
          toast.error('Failed to update volunteer info');
      }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const onUpdateProfile = async (data) => {
    try {
      const updatedProfile = await updateProfile(data);
      setProfile(prev => ({ ...prev, ...updatedProfile }));
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Update profile error:', error);
      const errorMessage = error.response?.data?.error || 
                           error.response?.data?.detail || 
                           'Failed to update profile';
      toast.error(errorMessage);
    }
  };

  const onChangePassword = async (data) => {
    try {
      await changePassword(data.old_password, data.new_password, data.confirm_password);
      toast.success('Password changed successfully');
      resetPasswordForm();
    } catch (error) {
      console.error('Change password error:', error);
      const errorMessage = error.response?.data?.detail || 
                         error.response?.data?.old_password?.[0] ||
                         error.response?.data?.new_password?.[0] ||
                         'Failed to change password';
      toast.error(errorMessage);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <span className="loading loading-spinner loading-lg text-green-600"></span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Profile Header */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-4">
          <div className="avatar placeholder">
            <div className="bg-green-100 text-green-700 w-16 rounded-full">
              <span className="text-2xl font-bold">
                {profile?.first_name?.[0]}{profile?.last_name?.[0]}
              </span>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {profile?.first_name} {profile?.last_name}
            </h2>
            <p className="text-gray-500">{profile?.email}</p>
            <span className="badge badge-success badge-outline mt-2 capitalize">
              {profile?.role?.replace('_', ' ')}
            </span>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Volunteer Profile Section - Only if volunteer */}
        {profile?.role === 'volunteer' && (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 md:col-span-2 border-l-4 border-l-green-500">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">Volunteer Information</h3>
                <form onSubmit={handleSubmitVolunteer(onUpdateVolunteerProfile)} className="space-y-4">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Skills</span>
                        </label>
                        <textarea 
                            className="textarea textarea-bordered" 
                            {...registerVolunteer('skills', { required: 'Skills are required' })}
                        ></textarea>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Availability</span>
                        </label>
                        <input 
                            type="text" 
                            className="input input-bordered" 
                            {...registerVolunteer('availability', { required: 'Availability is required' })}
                        />
                    </div>
                     <button className="btn bg-green-600 text-white w-full">Update Volunteer Info</button>
                </form>
            </div>
        )}

        {/* Update Profile Form */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">
            Edit Profile
          </h3>
          <form onSubmit={handleSubmitProfile(onUpdateProfile)} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">First Name</span>
              </label>
              <input
                type="text"
                {...registerProfile('first_name')}
                className="input input-bordered focus:input-success"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Last Name</span>
              </label>
              <input
                type="text"
                {...registerProfile('last_name')}
                className="input input-bordered focus:input-success"
              />
            </div>

            <button className="btn bg-green-600 hover:bg-green-700 text-white w-full">
              Update Profile
            </button>
          </form>
        </div>

        {/* Change Password Form */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">
            Change Password
          </h3>
          <form onSubmit={handleSubmitPassword(onChangePassword)} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Current Password</span>
              </label>
              <input
                type="password"
                {...registerPassword('old_password', { required: 'Current password is required' })}
                className="input input-bordered focus:input-success"
              />
              {passwordErrors.old_password && (
                <span className="text-red-500 text-sm mt-1">{passwordErrors.old_password.message}</span>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">New Password</span>
              </label>
              <input
                type="password"
                {...registerPassword('new_password', { 
                  required: 'New password is required',
                  minLength: { value: 8, message: 'Password must be at least 8 characters' },
                  pattern: { value: /(?=.*\d)/, message: 'Password must contain at least one digit' }
                })}
                className="input input-bordered focus:input-success"
              />
              {passwordErrors.new_password && (
                <span className="text-red-500 text-sm mt-1">{passwordErrors.new_password.message}</span>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm New Password</span>
              </label>
              <input
                type="password"
                {...registerPassword('confirm_password', { 
                  required: 'Please confirm your new password',
                  validate: (val) => {
                    if (watch('new_password') != val) {
                      return "Your passwords do not match";
                    }
                  }
                })}
                className="input input-bordered focus:input-success"
              />
              {passwordErrors.confirm_password && (
                <span className="text-red-500 text-sm mt-1">{passwordErrors.confirm_password.message}</span>
              )}
            </div>

            <button className="btn btn-outline btn-success w-full">
              Change Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
