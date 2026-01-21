import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const ApplyVolunteer = () => {
    const { user, fetchUserProfile } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (user?.role === 'volunteer') {
             Swal.fire({
                title: 'Info',
                text: 'You are already a registered volunteer.',
                icon: 'info',
                confirmButtonText: 'Go to Dashboard'
             }).then(() => {
                 navigate('/dashboard');
             });
        }
    }, [user, navigate]);

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            await axiosSecure.post('/api/volunteer/apply/', data);
            Swal.fire({
                title: 'Application Submitted!',
                text: 'Application submitted! Our team has been notified. We will email you once your application status is updated.',
                icon: 'success'
            });
            // Optionally refresh profile if the backend changes status immediately (usually it's pending)
            await fetchUserProfile();
            navigate('/dashboard');
        } catch (error) {
            console.error(error);
            const errorMessage = error.response?.data?.detail || 'Failed to submit application';
            Swal.fire('Error', errorMessage, 'error');
        } finally {
            setIsLoading(false);
        }
    };

    if (user?.role === 'volunteer') {
        return null; // Return nothing while redirecting
    }

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md my-10">
            <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">Become a Volunteer</h2>
            <p className="mb-6 text-gray-600 text-center">
                Join our community of changemakers. Tell us about your skills and availability.
            </p>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-semibold">Skills</span>
                    </label>
                    <textarea 
                        className="textarea textarea-bordered h-24" 
                        placeholder="E.g., Teaching, Python, First Aid, Event Management"
                        {...register('skills', { required: 'Please list your skills' })}
                    ></textarea>
                    {errors.skills && <span className="text-red-500 text-sm mt-1">{errors.skills.message}</span>}
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-semibold">Availability</span>
                    </label>
                    <input 
                        type="text" 
                        placeholder="E.g., Weekends 10am - 4pm, Weekdays after 6pm" 
                        className="input input-bordered w-full" 
                        {...register('availability', { required: 'Please specify your availability' })}
                    />
                    {errors.availability && <span className="text-red-500 text-sm mt-1">{errors.availability.message}</span>}
                </div>

                <div className="form-control mt-6">
                    <button 
                        type="submit" 
                        className={`btn bg-green-600 hover:bg-green-700 text-white w-full ${isLoading ? 'loading' : ''}`}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Submitting...' : 'Submit Application'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ApplyVolunteer;
