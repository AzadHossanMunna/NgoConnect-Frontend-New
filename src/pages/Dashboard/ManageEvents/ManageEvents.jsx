import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { FaPlus, FaMapMarkerAlt, FaUsers, FaEdit, FaTrash } from 'react-icons/fa';

const ManageEvents = () => {
    const [events, setEvents] = useState([]);
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState(null);
    
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, reset, setValue, getValues, formState: { errors } } = useForm();

    useEffect(() => {
        fetchInitialData();
    }, []);

    const fetchInitialData = async () => {
        setLoading(true);
        try {
            const [eventsRes, campaignsRes] = await Promise.all([
                axiosSecure.get('/api/projects/events/'),
                axiosSecure.get('/api/projects/campaigns/')
            ]);
            
            setEvents(Array.isArray(eventsRes.data) ? eventsRes.data : eventsRes.data.results || []);
            setCampaigns(Array.isArray(campaignsRes.data) ? campaignsRes.data : campaignsRes.data.results || []);
        } catch (error) {
            console.error("Error loading data:", error);
            Swal.fire('Error', 'Failed to load events data', 'error');
        } finally {
            setLoading(false);
        }
    };

    const fetchEvents = async () => {
        try {
            const res = await axiosSecure.get('/api/projects/events/');
            setEvents(Array.isArray(res.data) ? res.data : res.data.results || []);
        } catch (error) {
            console.error("Error fetching events:", error);
        }
    };

    const openModal = (event = null) => {
        setEditingEvent(event);
        if (event) {
            setValue('title', event.title);
            setValue('campaign', event.campaign);
            setValue('description', event.description);
            // Format datetime for input type="datetime-local" (YYYY-MM-DDTHH:mm)
            setValue('start_datetime', event.start_datetime ? new Date(event.start_datetime).toISOString().slice(0, 16) : '');
            setValue('end_datetime', event.end_datetime ? new Date(event.end_datetime).toISOString().slice(0, 16) : '');
            setValue('location', event.location);
            setValue('capacity', event.capacity);
        } else {
            reset();
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingEvent(null);
        reset();
    };

    const onSubmit = async (data) => {
        try {
            const payload = {
                ...data,
                campaign: parseInt(data.campaign),
                capacity: parseInt(data.capacity)
            };

            if (editingEvent) {
                // PATCH for partial update
                await axiosSecure.patch(`/api/projects/events/${editingEvent.id}/`, payload);
                Swal.fire('Success', 'Event updated successfully', 'success');
            } else {
                // POST for create
                await axiosSecure.post('/api/projects/events/', payload);
                Swal.fire('Success', 'Event created successfully', 'success');
            }
            
            fetchEvents();
            closeModal();
        } catch (error) {
            console.error("Error saving event:", error);
            const errorMsg = error.response?.data?.detail || 'Failed to save event';
            Swal.fire('Error', errorMsg, 'error');
        }
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosSecure.delete(`/api/projects/events/${id}/`);
                    Swal.fire('Deleted!', 'Event has been deleted.', 'success');
                    fetchEvents();
                } catch (error) {
                    Swal.fire('Error', 'Failed to delete event', 'error');
                }
            }
        });
    };

    if (loading) return <div className="text-center p-10"><span className="loading loading-spinner loading-lg text-green-600"></span></div>;

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-green-700">Manage Events</h2>
                <button className="btn bg-green-600 text-white" onClick={() => openModal()}>
                    <FaPlus /> Create Event
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th>Title</th>
                            <th>Campaign</th>
                            <th>Date & Time</th>
                            <th>Location</th>
                            <th>Capacity</th>
                            <th>Participants</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.length > 0 ? (
                            events.map((event) => (
                                <tr key={event.id}>
                                    <td className="font-semibold">{event.title}</td>
                                    <td>
                                        {campaigns.find(c => c.id === event.campaign)?.title || event.campaign}
                                    </td>
                                    <td>
                                        <div className="text-sm">
                                            <div className="font-medium text-gray-700">Start: {new Date(event.start_datetime).toLocaleString()}</div>
                                            <div className="text-gray-500">End: {new Date(event.end_datetime).toLocaleString()}</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-2">
                                            <FaMapMarkerAlt className="text-gray-400"/>
                                            {event.location}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-2">
                                            <FaUsers className="text-gray-400"/>
                                            {event.capacity}
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`badge ${event.is_full ? 'badge-error' : 'badge-success'} text-white`}>
                                            {event.participants_count || 0} / {event.capacity}
                                        </span>
                                    </td>
                                    <td className="flex gap-2">
                                        <button className="btn btn-sm btn-ghost text-blue-600" onClick={() => openModal(event)}>
                                            <FaEdit />
                                        </button>
                                        <button className="btn btn-sm btn-ghost text-red-600" onClick={() => handleDelete(event.id)}>
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center text-gray-500 py-6">No events found. Create one to get started.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="modal modal-open">
                    <div className="modal-box w-11/12 max-w-2xl">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={closeModal}>✕</button>
                        <h3 className="font-bold text-lg mb-4">{editingEvent ? 'Edit Event' : 'Create New Event'}</h3>
                        
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="form-control md:col-span-2">
                                    <label className="label">Title</label>
                                    <input 
                                        type="text" 
                                        className={`input input-bordered w-full ${errors.title ? 'input-error' : ''}`}
                                        {...register('title', { required: 'Title is required' })} 
                                    />
                                    {errors.title && <span className="text-red-500 text-sm mt-1">{errors.title.message}</span>}
                                </div>

                                <div className="form-control md:col-span-2">
                                    <label className="label">Campaign</label>
                                    <select 
                                        className={`select select-bordered w-full ${errors.campaign ? 'select-error' : ''}`}
                                        {...register('campaign', { required: 'Please select a campaign' })}
                                    >
                                        <option value="">Select Campaign</option>
                                        {campaigns.map(c => (
                                            <option key={c.id} value={c.id}>{c.title}</option>
                                        ))}
                                    </select>
                                    {errors.campaign && <span className="text-red-500 text-sm mt-1">{errors.campaign.message}</span>}
                                </div>

                                <div className="form-control md:col-span-2">
                                    <label className="label">Description</label>
                                    <textarea 
                                        className="textarea textarea-bordered w-full"
                                        {...register('description')}
                                    ></textarea>
                                </div>

                                <div className="form-control">{editingEvent ? 'Update Event' : 'Create Event'}
                                    <label className="label">Start Date & Time</label>
                                    <input 
                                        type="datetime-local" 
                                        className={`input input-bordered w-full ${errors.start_datetime ? 'input-error' : ''}`}
                                        {...register('start_datetime', { required: 'Start time is required' })} 
                                    />
                                    {errors.start_datetime && <span className="text-red-500 text-sm mt-1">{errors.start_datetime.message}</span>}
                                </div>

                                <div className="form-control">
                                    <label className="label">End Date & Time</label>
                                    <input 
                                        type="datetime-local" 
                                        className={`input input-bordered w-full ${errors.end_datetime ? 'input-error' : ''}`}
                                        {...register('end_datetime', { 
                                            required: 'End time is required',
                                            validate: (value) => {
                                                const start = getValues('start_datetime');
                                                return !start || new Date(value) >= new Date(start) || 'End time cannot be before start time';
                                            }
                                        })} 
                                    />
                                    {errors.end_datetime && <span className="text-red-500 text-sm mt-1">{errors.end_datetime.message}</span>}
                                </div>

                                <div className="form-control">
                                    <label className="label">Location</label>
                                    <input 
                                        type="text" 
                                        className={`input input-bordered w-full ${errors.location ? 'input-error' : ''}`}
                                        {...register('location', { required: 'Location is required' })} 
                                    />
                                    {errors.location && <span className="text-red-500 text-sm mt-1">{errors.location.message}</span>}
                                </div>

                                <div className="form-control">
                                    <label className="label">Capacity</label>
                                    <input 
                                        type="number" 
                                        className={`input input-bordered w-full ${errors.capacity ? 'input-error' : ''}`}
                                        {...register('capacity', { required: 'Capacity is required', min: 1 })} 
                                    />
                                    {errors.capacity && <span className="text-red-500 text-sm mt-1">{errors.capacity.message}</span>}
                                </div>
                            </div>
                            
                            <div className="modal-action">
                                <button type="button" className="btn" onClick={closeModal}>Cancel</button>
                                <button type="submit" className="btn bg-green-600 text-white">Create Event</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageEvents;
