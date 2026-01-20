import { useState, useEffect } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const MyTimeLogs = () => {
    const [logs, setLogs] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, reset, getValues, formState: { errors } } = useForm();
    
    useEffect(() => {
        fetchInitialData();
    }, []);

    const fetchInitialData = async () => {
        setLoading(true);
        try {
            const [logsRes, tasksRes] = await Promise.all([
                axiosSecure.get('/api/volunteer/time-logs/'),
                axiosSecure.get('/api/projects/tasks/?mine=true')
            ]);

            if (Array.isArray(logsRes.data)) {
                setLogs(logsRes.data);
            } else if (logsRes.data.results) {
                setLogs(logsRes.data.results);
            }

            if (Array.isArray(tasksRes.data)) {
                setTasks(tasksRes.data);
            } else if (tasksRes.data.results) {
                setTasks(tasksRes.data.results);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchTimeLogs = async () => {
        try {
            const res = await axiosSecure.get('/api/volunteer/time-logs/');
            if (Array.isArray(res.data)) {
                setLogs(res.data);
            } else if (res.data.results) {
                setLogs(res.data.results);
            }
        } catch (error) {
            console.error("Error fetching time logs:", error);
        }
    };

    const onSubmit = async (data) => {
        try {
            // Ensure dates are in ISO format
            const payload = {
                task: data.task,
                start_time: new Date(data.start_time).toISOString(),
                end_time: new Date(data.end_time).toISOString()
            };

            await axiosSecure.post('/api/volunteer/time-logs/', payload);
            Swal.fire('Success', 'Time log added successfully', 'success');
            reset();
            fetchTimeLogs();
        } catch (error) {
            console.error("Error adding time log:", error);
            const msg = error.response?.data?.detail || 'Failed to add time log';
            Swal.fire('Error', msg, 'error');
        }
    };

    const formatDuration = (start, end) => {
        const s = new Date(start);
        const e = new Date(end);
        const diffMs = e - s;
        const diffHrs = diffMs / (1000 * 60 * 60);
        return `${diffHrs.toFixed(2)} hrs`;
    };

    return (
        <div className="space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-green-700 mb-4">Log Working Hours</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-3 gap-4 custom-form">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Select Task</span>
                        </label>
                        <select 
                            className="select select-bordered w-full" 
                            {...register('task', { required: 'Please select a task' })}
                        >
                            <option value="">-- Choose Task --</option>
                            {tasks.map(task => (
                                <option key={task.id} value={task.id}>
                                    {task.title}
                                </option>
                            ))}
                        </select>
                        {errors.task && <span className="text-red-500 text-sm">{errors.task.message}</span>}
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Start Time</span>
                        </label>
                        <input 
                            type="datetime-local" 
                            className="input input-bordered" 
                            {...register('start_time', { required: 'Start time is required' })}
                        />
                         {errors.start_time && <span className="text-red-500 text-sm">{errors.start_time.message}</span>}
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">End Time</span>
                        </label>
                        <input 
                            type="datetime-local" 
                            className="input input-bordered" 
                            {...register('end_time', { 
                                required: 'End time is required',
                                validate: {
                                    afterStart: (value) => {
                                        const start = getValues('start_time');
                                        return !start || new Date(value) >= new Date(start) || 'End time cannot be before start time';
                                    },
                                    notFuture: (value) => new Date(value) <= new Date() || 'End time cannot be in the future'
                                }
                            })}
                        />
                         {errors.end_time && <span className="text-red-500 text-sm">{errors.end_time.message}</span>}
                    </div>

                    <div className="md:col-span-3">
                         <button type="submit" className="btn bg-green-600 text-white w-full md:w-auto">Add Time Log</button>
                    </div>
                </form>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-green-700 mb-4">My Time Logs</h2>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th>Task ID</th>
                                <th>Start Time</th>
                                <th>End Time</th>
                                <th>Duration</th>
                            </tr>
                        </thead>
                        <tbody>
                            {logs.length > 0 ? (
                                logs.map((log, idx) => (
                                    <tr key={log.id || idx}>
                                        <td>{log.task}</td>
                                        <td>{new Date(log.start_time).toLocaleString()}</td>
                                        <td>{new Date(log.end_time).toLocaleString()}</td>
                                        <td>{formatDuration(log.start_time, log.end_time)}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center text-gray-500">No time logs found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyTimeLogs;
