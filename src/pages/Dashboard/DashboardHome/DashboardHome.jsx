import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { API_ENDPOINTS } from '../../../config/api.config';
import { FaUser, FaMoneyBillWave, FaBullhorn, FaHandHoldingHeart, FaClipboardList, FaCalendarCheck, FaClock, FaCheckCircle, FaExclamationCircle, FaMedal, FaTrophy, FaAward } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const getBadgeIcon = (level) => {
    switch (level) {
        case 'Bronze Donor': return <FaMedal className="text-3xl text-amber-600" />;
        case 'Silver Donor': return <FaMedal className="text-3xl text-gray-400" />;
        case 'Gold Champion': return <FaTrophy className="text-3xl text-yellow-500" />;
        default: return <FaAward className="text-3xl text-blue-400" />;
    }
};

const DashboardHome = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axiosSecure.get(API_ENDPOINTS.DASHBOARD_SUMMARY);
                setStats(res.data);
            } catch (error) {
                console.error("Failed to fetch dashboard summary", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <span className="loading loading-spinner loading-lg text-green-600"></span>
            </div>
        );
    }

    if (!stats) return null;

    // Use role from stats or fallback
    const role = stats.role?.toLowerCase() || 'donor';

    return (
        <div className="p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">
                    Welcome back, <span className="text-green-600">{stats.user_name}</span>!
                </h1>
                <p className="text-gray-500 mt-2">Here is your activity overview.</p>
            </div>

            {/* --- ADMIN VIEW --- */}
            {role === 'admin' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="stat bg-white shadow-md rounded-xl border-l-4 border-blue-500">
                        <div className="stat-figure text-blue-500">
                            <FaUser className="text-3xl" />
                        </div>
                        <div className="stat-title">Total Users</div>
                        <div className="stat-value text-blue-500">{stats.total_users}</div>
                        <div className="stat-desc">Registered users</div>
                    </div>
                    
                    <div className="stat bg-white shadow-md rounded-xl border-l-4 border-green-500">
                        <div className="stat-figure text-green-500">
                            <FaMoneyBillWave className="text-3xl" />
                        </div>
                        <div className="stat-title">Total Donations</div>
                        <div className="stat-value text-green-500">{stats.total_donations?.toLocaleString()} BDT</div>
                        <div className="stat-desc">Funds raised so far</div>
                    </div>

                    <div className="stat bg-white shadow-md rounded-xl border-l-4 border-orange-500">
                        <div className="stat-figure text-orange-500">
                            <FaBullhorn className="text-3xl" />
                        </div>
                        <div className="stat-title">Active Campaigns</div>
                        <div className="stat-value text-orange-500">{stats.active_campaigns}</div>
                        <div className="stat-desc">Ongoing projects</div>
                    </div>

                    <div className="stat bg-white shadow-md rounded-xl border-l-4 border-purple-500">
                        <div className="stat-figure text-purple-500">
                            <FaHandHoldingHeart className="text-3xl" />
                        </div>
                        <div className="stat-title">Pending Volunteers</div>
                        <div className="stat-value text-purple-500">{stats.pending_volunteers}</div>
                        <div className="stat-desc">
                             <Link to="/dashboard/volunteers" className="link link-hover text-xs">Review Applications</Link>
                        </div>
                    </div>
                </div>
            )}

            {/* --- VOLUNTEER VIEW --- */}
            {role === 'volunteer' && (
                <div>
                     {/* Application Status Alert */}
                    {stats.application_status !== 'APPROVED' && (
                        <div className="alert alert-warning shadow-lg mb-6">
                            <FaExclamationCircle />
                            <div>
                                <h3 className="font-bold">Application Status: {stats.application_status}</h3>
                                <div className="text-xs">Your volunteer application is currently {stats.application_status.toLowerCase()}.</div>
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="stat bg-white shadow-md rounded-xl border-l-4 border-indigo-500">
                            <div className="stat-figure text-indigo-500">
                                <FaClock className="text-3xl" />
                            </div>
                            <div className="stat-title">Hours Logged</div>
                            <div className="stat-value text-indigo-500">{(stats.hours_logged_minutes / 60).toFixed(1)}</div>
                            <div className="stat-desc">Total volunteer hours</div>
                        </div>

                        <div className="stat bg-white shadow-md rounded-xl border-l-4 border-red-500">
                            <div className="stat-figure text-red-500">
                                <FaClipboardList className="text-3xl" />
                            </div>
                            <div className="stat-title">Pending Tasks</div>
                            <div className="stat-value text-red-500">{stats.assigned_tasks_pending}</div>
                            <div className="stat-desc">
                                <Link to="/dashboard/volunteer/checklist" className="btn btn-xs btn-outline btn-error mt-2">View Tasks</Link>
                            </div>
                        </div>

                        <div className="stat bg-white shadow-md rounded-xl border-l-4 border-teal-500">
                            <div className="stat-figure text-teal-500">
                                <FaCalendarCheck className="text-3xl" />
                            </div>
                            <div className="stat-title">Upcoming Events</div>
                            <div className="stat-value text-teal-500">{stats.upcoming_events_count}</div>
                            <div className="stat-desc">Events you joined</div>
                        </div>
                    </div>
                </div>
            )}

            {/* --- DONOR / GENERAL VIEW --- */}
            {(role === 'donor' || role === 'general_user') && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Impact Badge Card - Show if stats exist */}
                    {stats.donor_stats && stats.donor_stats.impact_badge !== 'None' && (
                        <div className="stat bg-white shadow-md rounded-xl border-l-4 border-yellow-400">
                            <div className="stat-figure text-yellow-500">
                                {getBadgeIcon(stats.donor_stats.impact_badge)}
                            </div>
                            <div className="stat-title">Impact Badge</div>
                            <div className="stat-value text-xl">{stats.donor_stats.impact_badge}</div>
                            <div className="stat-desc text-yellow-600 font-medium">Thank you for being a hero!</div>
                        </div>
                    )}

                    <div className="stat bg-white shadow-md rounded-xl border-l-4 border-green-500">
                        <div className="stat-figure text-green-500">
                            <FaHandHoldingHeart className="text-3xl" />
                        </div>
                        <div className="stat-title">My Donations</div>
                        <div className="stat-value text-green-500 text-3xl">
                            {stats.my_total_donations?.toLocaleString()} BDT
                        </div>
                        <div className="stat-desc text-gray-500">Thank you for your generosity!</div>
                        <div className="mt-4">
                             <Link to="/SendDonation" className="btn btn-sm bg-green-600 text-white border-none w-full">Donate Again</Link>
                        </div>
                    </div>

                    <div className="stat bg-white shadow-md rounded-xl border-l-4 border-blue-500">
                        <div className="stat-figure text-blue-500">
                            <FaClipboardList className="text-3xl" />
                        </div>
                        <div className="stat-title">Active Campaigns</div>
                        <div className="stat-value text-blue-500">{stats.active_campaigns_count || 0}</div>
                        <div className="stat-desc">Projects needing support</div>
                        <div className="mt-4">
                             <Link to="/campaign" className="btn btn-sm btn-outline btn-info w-full">Browse Campaigns</Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardHome;
