import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { API_ENDPOINTS } from '../../../config/api.config';
import toast from 'react-hot-toast';
import { FaArrowLeft } from 'react-icons/fa';

const CampaignForm = () => {
    const { slug } = useParams();
    const isEditMode = !!slug;
    const { register, handleSubmit, reset, setError, formState: { errors } } = useForm();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(isEditMode);

    useEffect(() => {
        if (isEditMode) {
            const fetchCampaign = async () => {
                try {
                    const res = await axiosSecure.get(`${API_ENDPOINTS.CAMPAIGNS}${slug}/`);
                    // Format dates for input type="date"
                    const data = res.data;
                    if(data.start_date) data.start_date = data.start_date.split('T')[0];
                    if(data.end_date) data.end_date = data.end_date.split('T')[0];
                    
                    reset(data);
                } catch (error) {
                    toast.error('Failed to fetch campaign details');
                    navigate('/dashboard/campaigns');
                } finally {
                    setFetching(false);
                }
            };
            fetchCampaign();
        }
    }, [slug, isEditMode, axiosSecure, navigate, reset]);

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            if (isEditMode) {
                await axiosSecure.put(`${API_ENDPOINTS.CAMPAIGNS}${slug}/`, data);
                toast.success('Campaign updated successfully');
            } else {
                await axiosSecure.post(API_ENDPOINTS.CAMPAIGNS, data);
                toast.success('Campaign created successfully');
            }
            navigate('/dashboard/campaigns');
        } catch (error) {
            console.error(error);
            const data = error.response?.data;
            let hasFieldErrors = false;

            // Handle date errors (end_date)
            if (data?.end_date) {
                setError('end_date', { type: 'server', message: data.end_date[0] });
                hasFieldErrors = true;
            }
            // Handle title errors
            if (data?.title) {
                 setError('title', { type: 'server', message: data.title[0] });
                 hasFieldErrors = true;
            }
            // Handle description errors
             if (data?.description) {
                 setError('description', { type: 'server', message: data.description[0] });
                 hasFieldErrors = true;
            }
             // Handle goal errors
             if (data?.goal_amount) {
                 setError('goal_amount', { type: 'server', message: data.goal_amount[0] });
                 hasFieldErrors = true;
            }

            const msg = data?.detail || data?.non_field_errors?.[0] || 'Something went wrong';
            if (!hasFieldErrors || msg !== 'Something went wrong') {
                 toast.error(msg);
            }
        } finally {
            setLoading(false);
        }
    };

    if (fetching) return <div className="text-center p-10">Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm">
            <div className="flex items-center gap-4 mb-6">
                <button onClick={() => navigate('/dashboard/campaigns')} className="btn btn-sm btn-ghost">
                    <FaArrowLeft />
                </button>
                <h2 className="text-2xl font-bold text-gray-800">
                    {isEditMode ? 'Edit Campaign' : 'Create New Campaign'}
                </h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Title */}
                    <div className="col-span-2">
                        <label className="label font-medium">Title</label>
                        <input
                            type="text"
                            {...register('title', { required: 'Title is required' })}
                            className="input input-bordered w-full focus:input-success"
                            placeholder="Campaign Title"
                        />
                        {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}
                    </div>

                    {/* Description */}
                    <div className="col-span-2">
                        <label className="label font-medium">Description</label>
                        <textarea
                            {...register('description', { required: 'Description is required' })}
                            className="textarea textarea-bordered w-full h-32 focus:textarea-success"
                            placeholder="Detailed description of the campaign"
                        ></textarea>
                        {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
                    </div>

                    {/* Goal Amount */}
                    <div>
                        <label className="label font-medium">Goal Amount (৳)</label>
                        <input
                            type="number"
                            {...register('goal_amount', { required: 'Goal amount is required', min: 1 })}
                            className="input input-bordered w-full focus:input-success"
                        />
                        {errors.goal_amount && <span className="text-red-500 text-sm">{errors.goal_amount.message}</span>}
                    </div>

                    {/* Allocated Budget */}
                    <div>
                        <label className="label font-medium">Allocated Budget (৳)</label>
                        <input
                            type="number"
                            {...register('budget_allocated', { required: 'Budget is required', min: 0 })}
                            className="input input-bordered w-full focus:input-success"
                        />
                        {errors.budget_allocated && <span className="text-red-500 text-sm">{errors.budget_allocated.message}</span>}
                    </div>

                    {/* Start Date */}
                    <div>
                        <label className="label font-medium">Start Date</label>
                        <input
                            type="date"
                            {...register('start_date', { required: 'Start date is required' })}
                            className="input input-bordered w-full focus:input-success"
                        />
                        {errors.start_date && <span className="text-red-500 text-sm">{errors.start_date.message}</span>}
                    </div>

                    {/* End Date */}
                    <div>
                        <label className="label font-medium">End Date</label>
                        <input
                            type="date"
                            {...register('end_date', { required: 'End date is required' })}
                            className="input input-bordered w-full focus:input-success"
                        />
                        {errors.end_date && <span className="text-red-500 text-sm">{errors.end_date.message}</span>}
                    </div>

                    {/* Status */}
                    <div className="col-span-2 md:col-span-1">
                        <label className="label font-medium">Status</label>
                        <select
                            {...register('status')}
                            className="select select-bordered w-full focus:select-success"
                        >
                            <option value="PLANNED">Planned</option>
                            <option value="ACTIVE">Active</option>
                            <option value="ON_HOLD">On Hold</option>
                            <option value="COMPLETED">Completed</option>
                        </select>
                    </div>
                </div>

                <div className="flex justify-end gap-3 pt-6 border-t mt-6">
                    <button
                        type="button"
                        onClick={() => navigate('/dashboard/campaigns')}
                        className="btn btn-ghost"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="btn bg-green-600 hover:bg-green-700 text-white min-w-[120px]"
                        disabled={loading}
                    >
                        {loading ? <span className="loading loading-spinner"></span> : (isEditMode ? 'Update Campaign' : 'Create Campaign')}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CampaignForm;
