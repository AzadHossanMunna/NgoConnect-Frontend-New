import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { FaPlus, FaEdit, FaTrash, FaCheckCircle, FaUser, FaCalendar } from 'react-icons/fa';

const ManageTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [campaigns, setCampaigns] = useState([]);
    const [volunteers, setVolunteers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

    useEffect(() => {
        fetchInitialData();
    }, []);

    const fetchInitialData = async () => {
        setLoading(true);
        try {
            const [tasksRes, campaignsRes, volunteersRes] = await Promise.all([
                axiosSecure.get('/api/projects/tasks/'),
                axiosSecure.get('/api/projects/campaigns/'),
                axiosSecure.get('/api/volunteer/admin/list/?status=APPROVED')
            ]);
            
            setTasks(Array.isArray(tasksRes.data) ? tasksRes.data : tasksRes.data.results || []);
            setCampaigns(Array.isArray(campaignsRes.data) ? campaignsRes.data : campaignsRes.data.results || []);
            setVolunteers(Array.isArray(volunteersRes.data) ? volunteersRes.data : volunteersRes.data.results || []); // Assuming the admin list endpoint returns { user_id, first_name ... }
        } catch (error) {
            console.error("Error loading data:", error);
            Swal.fire('Error', 'Failed to load tasks data', 'error');
        } finally {
            setLoading(false);
        }
    };

    const fetchTasks = async () => {
        const res = await axiosSecure.get('/api/projects/tasks/');
        setTasks(Array.isArray(res.data) ? res.data : res.data.results || []);
    };

    const openModal = (task = null) => {
        setEditingTask(task);
        if (task) {
            setValue('title', task.title);
            setValue('description', task.description);
            setValue('campaign', task.campaign); // Assuming task object has campaign id
            setValue('assigned_to', task.assigned_to); // Assuming task object has assigned_to id
            setValue('due_date', task.due_date);
        } else {
            reset();
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingTask(null);
        reset();
    };

    const onSubmit = async (data) => {
        try {
            // Clean up empty assigned_to if selecting "None" or empty
            const payload = {
                ...data,
                assigned_to: data.assigned_to ? parseInt(data.assigned_to) : null,
                campaign: parseInt(data.campaign)
            };

            if (editingTask) {
                await axiosSecure.put(`/api/projects/tasks/${editingTask.id}/`, payload); // using PUT for update as requested
                Swal.fire('Success', 'Task updated successfully', 'success');
            } else {
                await axiosSecure.post('/api/projects/tasks/', payload);
                Swal.fire('Success', 'Task created successfully', 'success');
            }
            fetchTasks();
            closeModal();
        } catch (error) {
            console.error("Error saving task:", error);
            Swal.fire('Error', 'Failed to save task', 'error');
        }
    };

    const handleDelete = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosSecure.delete(`/api/projects/tasks/${id}/`);
                    Swal.fire('Deleted!', 'Task has been deleted.', 'success');
                    fetchTasks();
                } catch (error) {
                    Swal.fire('Error', 'Failed to delete task', 'error');
                }
            }
        });
    };

    if (loading) return <div className="text-center p-10"><span className="loading loading-spinner loading-lg text-green-600"></span></div>;

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-green-700">Task Management</h2>
                <button className="btn bg-green-600 text-white" onClick={() => openModal()}>
                    <FaPlus /> Create Task
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th>Title</th>
                            <th>Campaign</th>
                            <th>Assigned To</th>
                            <th>Due Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.length > 0 ? (
                            tasks.map((task) => (
                                <tr key={task.id}>
                                    <td className="font-semibold">{task.title}</td>
                                    <td>
                                        {/* Find campaign name by ID or assume backend sends expanded object. 
                                            If backend sends ID only: */}
                                        {campaigns.find(c => c.id === task.campaign)?.title || task.campaign}
                                    </td>
                                    <td>
                                        {task.assigned_to ? (
                                            <div className="flex items-center gap-2">
                                                <FaUser className="text-gray-400"/>
                                                {/* Find volunteer name if we have list, or use name from task if expanded */}
                                                {volunteers.find(v => v.user_id === task.assigned_to)?.first_name || 
                                                 volunteers.find(v => v.user_id === task.assigned_to)?.email || 
                                                 task.assigned_to_name || // fallback if backend sends name
                                                 'User ID: ' + task.assigned_to}
                                            </div>
                                        ) : (
                                            <span className="text-gray-400 italic">Unassigned</span>
                                        )}
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-2">
                                            <FaCalendar className="text-gray-400"/>
                                            {task.due_date}
                                        </div>
                                    </td>
                                    <td>
                                        {task.is_completed ? (
                                            <span className="badge badge-success text-white gap-1"><FaCheckCircle/> Completed</span>
                                        ) : (
                                            <span className="badge badge-warning text-white">Pending</span>
                                        )}
                                    </td>
                                    <td className="flex gap-2">
                                        <button className="btn btn-sm btn-ghost text-blue-600" onClick={() => openModal(task)}>
                                            <FaEdit />
                                        </button>
                                        <button className="btn btn-sm btn-ghost text-red-600" onClick={() => handleDelete(task.id)}>
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center text-gray-500 py-6">No tasks found. Create one to get started.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={closeModal}>✕</button>
                        <h3 className="font-bold text-lg mb-4">{editingTask ? 'Edit Task' : 'Create New Task'}</h3>
                        
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div className="form-control">
                                <label className="label">Title</label>
                                <input type="text" className="input input-bordered" {...register('title', { required: true })} />
                                {errors.title && <span className="text-red-500 text-xs">Title is required</span>}
                            </div>

                            <div className="form-control">
                                <label className="label">Description</label>
                                <textarea className="textarea textarea-bordered" {...register('description', { required: true })}></textarea>
                            </div>

                            <div className="form-control">
                                <label className="label">Campaign</label>
                                <select className="select select-bordered" {...register('campaign', { required: true })}>
                                    <option value="">Select Campaign</option>
                                    {campaigns.map(c => (
                                        <option key={c.id} value={c.id}>{c.title}</option>
                                    ))}
                                </select>
                                {errors.campaign && <span className="text-red-500 text-xs">Campaign is required</span>}
                            </div>

                            <div className="form-control">
                                <label className="label">Assign To (Optional)</label>
                                <select className="select select-bordered" {...register('assigned_to')}>
                                    <option value="">Unassigned</option>
                                    {volunteers.map(v => (
                                        <option key={v.user_id} value={v.user_id}>
                                            {v.first_name} {v.last_name || ''} ({v.email})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-control">
                                <label className="label">Due Date</label>
                                <input type="date" className="input input-bordered" {...register('due_date', { required: true })} />
                            </div>

                            <div className="modal-action">
                                <button type="submit" className="btn bg-green-600 text-white">
                                    {editingTask ? 'Update Task' : 'Create Task'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageTasks;
