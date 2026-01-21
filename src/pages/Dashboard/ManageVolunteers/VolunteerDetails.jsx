import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaUser, FaEnvelope, FaToolbox, FaClock, FaTasks, FaCheckCircle, FaExclamationCircle, FaArrowLeft } from 'react-icons/fa';

const VolunteerDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const [volunteer, setVolunteer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                // Note: User specified /api/volunteer/admin/<user_id>/
                // Adjust endpoint if backend differs (e.g. /api/volunteer/admin/...)
                const res = await axiosSecure.get(`/api/volunteer/admin/${id}/`);
                setVolunteer(res.data);
            } catch (err) {
                console.error("Failed to fetch volunteer details:", err);
                setError("Failed to load volunteer information.");
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, [id, axiosSecure]);

    if (loading) return (
        <div className="flex justify-center items-center h-screen bg-gray-50">
            <span className="loading loading-spinner loading-lg text-green-600"></span>
        </div>
    );

    if (error || !volunteer) return (
        <div className="flex flex-col items-center justify-center h-screen gap-4">
             <div className="text-red-500 font-bold text-xl">{error || "Volunteer not found"}</div>
             <button onClick={() => navigate(-1)} className="btn btn-outline btn-sm">Go Back</button>
        </div>
    );

    const { 
        first_name, 
        last_name, 
        email, 
        skills, 
        availability, 
        application_status, 
        time_logs = [], 
        assigned_tasks = [] 
    } = volunteer;

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
             <div className="mb-6">
                <button onClick={() => navigate('/dashboard/volunteers')} className="btn btn-ghost gap-2 text-gray-600 hover:text-green-600">
                    <FaArrowLeft /> Back to List
                </button>
             </div>

             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                 {/* Left Column: Profile Card */}
                 <div className="lg:col-span-1">
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-6 text-center border border-gray-100">
                        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                             <span className="text-3xl font-bold">{first_name?.[0]}{last_name?.[0]}</span>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">{first_name} {last_name}</h2>
                        <p className="text-gray-500 mb-2 flex items-center justify-center gap-2">
                             <FaEnvelope /> {email}
                        </p>
                        <div className="mt-4">
                             <span className={`px-4 py-1 rounded-full text-sm font-semibold border ${
                                application_status === 'APPROVED' ? 'bg-green-50 text-green-700 border-green-200' :
                                application_status === 'REJECTED' ? 'bg-red-50 text-red-700 border-red-200' :
                                'bg-yellow-50 text-yellow-700 border-yellow-200'
                             }`}>
                                {application_status}
                             </span>
                        </div>
                        
                        <div className="divider my-6"></div>
                        
                        <div className="text-left space-y-4">
                            <div>
                                <h3 className="text-sm font-bold text-gray-400 uppercase flex items-center gap-2">
                                    <FaToolbox /> Skills
                                </h3>
                                <p className="text-gray-700 mt-1">{skills || "No skills listed"}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-gray-400 uppercase flex items-center gap-2">
                                    <FaClock /> Availability
                                </h3>
                                <p className="text-gray-700 mt-1">{availability || "Not specified"}</p>
                            </div>
                        </div>
                    </div>
                 </div>

                 {/* Right Column: Stats & Logs */}
                 <div className="lg:col-span-2 space-y-8">
                    
                    {/* Assigned Tasks */}
                    <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
                        <div className="bg-green-600 p-4 text-white flex items-center gap-2">
                            <FaTasks />
                            <h3 className="font-bold text-lg">Assigned Tasks</h3>
                        </div>
                        <div className="p-6">
                            {assigned_tasks.length > 0 ? (
                                <div className="space-y-4">
                                     {assigned_tasks.map(task => (
                                         <div key={task.id} className="flex flex-col md:flex-row justify-between items-start md:items-center bg-gray-50 p-4 rounded-xl border border-gray-200 hover:shadow-md transition-all">
                                             <div>
                                                 <h4 className="font-bold text-gray-800">{task.title}</h4>
                                                 <p className="text-sm text-gray-500">
                                                     Campaign: <span className="font-medium">{task.campaign}</span>
                                                 </p>
                                             </div>
                                             <div className="mt-2 md:mt-0 flex flex-col items-end">
                                                  <span className="text-xs text-gray-400 mb-1">Due: {task.due_date}</span>
                                                  {task.is_completed ? (
                                                      <span className="badge badge-success text-white gap-1"><FaCheckCircle /> Completed</span>
                                                  ) : (
                                                      <span className="badge badge-warning text-white gap-1"><FaExclamationCircle /> In Progress</span>
                                                  )}
                                             </div>
                                         </div>
                                     ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 text-center py-4">No tasks assigned currently.</p>
                            )}
                        </div>
                    </div>

                    {/* Time Logs */}
                    <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
                        <div className="bg-gray-800 p-4 text-white flex items-center gap-2">
                            <FaClock />
                            <h3 className="font-bold text-lg">Work History</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="table w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th>Date</th>
                                        <th>Task</th>
                                        <th>Duration</th>
                                        <th>Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {time_logs.length > 0 ? (
                                        time_logs.map(log => {
                                            const startDate = new Date(log.start_time);
                                            const endDate = new Date(log.end_time);
                                            return (
                                                <tr key={log.id} className="hover:bg-gray-50">
                                                    <td>
                                                        <div className="font-bold">{startDate.toLocaleDateString()}</div>
                                                    </td>
                                                    <td>
                                                        <div className="font-medium text-gray-800">{log.task_name}</div>
                                                    </td>
                                                    <td>
                                                        <div className="badge badge-ghost font-mono">
                                                            {Math.floor(log.duration_minutes / 60)}h {log.duration_minutes % 60}m
                                                        </div>
                                                    </td>
                                                    <td className="text-xs text-gray-500">
                                                        {startDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - 
                                                        {endDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="text-center py-6 text-gray-500">No time logs recorded yet.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                 </div>
             </div>
        </div>
    );
};

export default VolunteerDetails;
