import { useState, useEffect } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { FaCalendar, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

const MyTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        fetchMyTasks();
    }, []);

    const fetchMyTasks = async () => {
        setLoading(true);
        try {
            const res = await axiosSecure.get('/api/projects/tasks/?mine=true');
            setTasks(Array.isArray(res.data) ? res.data : res.data.results || []);
        } catch (error) {
            console.error("Error fetching my tasks:", error);
            // Don't alert if it's just empty, but here likely error
        } finally {
            setLoading(false);
        }
    };

    const handleComplete = async (taskId) => {
        try {
            const result = await Swal.fire({
                title: 'Complete Task?',
                text: "Are you sure you have finished this task?",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, mark complete!'
            });

            if (result.isConfirmed) {
                await axiosSecure.patch(`/api/projects/tasks/${taskId}/complete/`);
                Swal.fire('Great job!', 'Task marked as completed.', 'success');
                fetchMyTasks(); // Refresh list to update status
            }
        } catch (error) {
            console.error("Error completing task:", error);
            Swal.fire('Error', 'Failed to update task status', 'error');
        }
    };

    if (loading) return <div className="text-center p-10"><span className="loading loading-spinner loading-lg text-green-600"></span></div>;

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-green-700 mb-6">My Assigned Tasks</h2>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {tasks.length > 0 ? (
                    tasks.map(task => (
                        <div key={task.id} className={`card shadow-lg border ${task.is_completed ? 'bg-green-50 border-green-200' : 'bg-base-100 border-gray-200'}`}>
                            <div className="card-body">
                                <div className="flex justify-between items-start">
                                    <h3 className="card-title text-gray-800">{task.title}</h3>
                                    {task.is_completed ? (
                                        <div className="badge badge-success text-white gap-1"><FaCheckCircle /> Done</div>
                                    ) : (
                                        <div className="badge badge-warning text-white gap-1"><FaExclamationCircle /> Pending</div>
                                    )}
                                </div>
                                
                                <p className="text-gray-600 text-sm mt-2">{task.description}</p>
                                
                                <div className="flex items-center gap-2 mt-4 text-sm text-gray-500">
                                    <FaCalendar />
                                    <span>Due: {task.due_date}</span>
                                </div>

                                {/* Show campaign info if available (assuming expanded or simple ID) */}
                                <div className="text-xs text-gray-400 mt-1">
                                    Campaign ID: {task.campaign_title || task.campaign}
                                </div>

                                <div className="card-actions justify-end mt-4">
                                    {!task.is_completed && (
                                        <button 
                                            className="btn btn-sm bg-green-600 text-white hover:bg-green-700"
                                            onClick={() => handleComplete(task.id)}
                                        >
                                            Mark Complete
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center py-10 text-gray-500">
                        <p className="text-lg">No tasks assigned to you yet.</p>
                        <p className="text-sm">Enjoy your free time!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyTasks;
