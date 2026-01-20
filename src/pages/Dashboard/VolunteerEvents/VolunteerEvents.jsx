import { useState, useEffect } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { FaCalendar, FaMapMarkerAlt, FaUsers, FaCheckCircle, FaTimesCircle, FaSignInAlt } from 'react-icons/fa';

const VolunteerEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [campaigns, setCampaigns] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [eventsRes, campaignsRes] = await Promise.all([
                axiosSecure.get('/api/projects/events/'),
                axiosSecure.get('/api/projects/campaigns/')
            ]);
            
            setEvents(Array.isArray(eventsRes.data) ? eventsRes.data : eventsRes.data.results || []);
            setCampaigns(Array.isArray(campaignsRes.data) ? campaignsRes.data : campaignsRes.data.results || []);
        } catch (error) {
            console.error("Error loading events:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSignup = async (eventId) => {
        try {
            await axiosSecure.post(`/api/projects/events/${eventId}/signup/`);
            Swal.fire({
                icon: 'success',
                title: 'Signed Up!',
                text: 'You have successfully volunteered for this event.',
                timer: 2000,
                showConfirmButton: false
            });
            fetchData(); // Refresh list to update counts and registration status
        } catch (error) {
            console.error("Signup error:", error);
            const msg = error.response?.data?.detail || "Failed to sign up for event";
            Swal.fire('Error', msg, 'error');
        }
    };

    const handleCancel = async (eventId) => {
        Swal.fire({
            title: 'Cancel Signup?',
            text: "Are you sure you want to cancel your participation?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, cancel it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosSecure.delete(`/api/projects/events/${eventId}/signup/`);
                    Swal.fire(
                        'Cancelled!',
                        'Your signup has been cancelled.',
                        'success'
                    );
                    fetchData();
                } catch (error) {
                    console.error("Cancel error:", error);
                    Swal.fire('Error', 'Failed to cancel signup', 'error');
                }
            }
        });
    };

    if (loading) return <div className="text-center p-10"><span className="loading loading-spinner loading-lg text-green-600"></span></div>;

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-green-700 mb-6">Upcoming Events</h2>
            
            {events.length === 0 ? (
                <div className="text-center py-10 bg-gray-50 rounded-lg">
                    <p className="text-gray-500 text-lg">No upcoming events found.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {events.map(event => {
                        const campaign = campaigns.find(c => c.id === event.campaign);
                        
                        return (
                            <div key={event.id} className={`card bg-base-100 shadow-xl border ${event.is_registered ? 'border-green-500' : 'border-gray-200'}`}>
                                <div className="card-body">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            {event.is_registered && (
                                                <div className="badge badge-success text-white gap-2 mb-2 p-3">
                                                    <FaCheckCircle /> Registered
                                                </div>
                                            )}
                                            <h3 className="card-title text-xl text-gray-800">{event.title}</h3>
                                            <p className="text-sm text-green-600 font-semibold mb-2">
                                                {campaign?.title || 'General Event'}
                                            </p>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <div className="badge badge-outline p-3 gap-2">
                                                <FaUsers /> {event.participants_count} / {event.capacity}
                                            </div>
                                            {event.is_full && !event.is_registered && (
                                                <div className="badge badge-error text-white mt-1">Full</div>
                                            )}
                                        </div>
                                    </div>
                                    
                                    <p className="text-gray-600 my-2 line-clamp-2">{event.description}</p>
                                    
                                    <div className="divider my-1"></div>
                                    
                                    <div className="space-y-2 text-sm text-gray-600">
                                        <div className="flex items-center gap-2">
                                            <FaCalendar className="text-green-600" />
                                            <span className="font-medium">Start:</span>
                                            {new Date(event.start_datetime).toLocaleString()}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <FaCalendar className="text-red-500" />
                                            <span className="font-medium">End:</span>
                                            {new Date(event.end_datetime).toLocaleString()}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <FaMapMarkerAlt className="text-blue-500" />
                                            <span>{event.location}</span>
                                        </div>
                                    </div>
                                    
                                    <div className="card-actions justify-end mt-4">
                                        {event.is_registered ? (
                                            <button 
                                                className="btn btn-error btn-outline btn-sm gap-2"
                                                onClick={() => handleCancel(event.id)}
                                            >
                                                <FaTimesCircle /> Cancel Signup
                                            </button>
                                        ) : (
                                            <button 
                                                className="btn btn-primary btn-sm bg-green-600 border-none gap-2 hover:bg-green-700"
                                                onClick={() => handleSignup(event.id)}
                                                disabled={event.is_full}
                                            >
                                                <FaSignInAlt /> Join Event
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default VolunteerEvents;
