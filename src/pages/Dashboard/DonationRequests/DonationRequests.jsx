import { useState, useEffect } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { API_ENDPOINTS } from '../../../config/api.config';
import { FaEye, FaSearch } from 'react-icons/fa';

const DonationRequests = () => {
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState('');
    const [campaigns, setCampaigns] = useState([]);
    const [selectedCampaign, setSelectedCampaign] = useState('');

    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        // Fetch campaigns for filter dropdown
        const fetchCampaigns = async () => {
            try {
                const res = await axiosSecure.get(API_ENDPOINTS.CAMPAIGNS);
                setCampaigns(Array.isArray(res.data) ? res.data : res.data.results || []);
            } catch (error) {
                console.error("Failed to fetch campaigns", error);
            }
        };
        fetchCampaigns();
    }, []);

    useEffect(() => {
        fetchDonations();
    }, [statusFilter, selectedCampaign]);

    const fetchDonations = async () => {
        setLoading(true);
        try {
            let url = `${API_ENDPOINTS.DONATION_ADMIN}?`;
            if (statusFilter) url += `status=${statusFilter}&`;
            if (selectedCampaign) url += `campaign_id=${selectedCampaign}&`;

            const res = await axiosSecure.get(url);
            setDonations(Array.isArray(res.data) ? res.data : res.data.results || []);
        } catch (error) {
            console.error("Failed to fetch donations", error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'SUCCESS': return 'badge-success text-white';
            case 'FAILED': return 'badge-error text-white';
            case 'CANCELLED': return 'badge-warning text-white';
            case 'PENDING': return 'badge-ghost';
            default: return 'badge-outline';
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <h2 className="text-2xl font-bold text-gray-800">Donation Requests</h2>
                
                <div className="flex gap-2">
                    <select 
                        className="select select-bordered select-sm w-full max-w-xs"
                        value={selectedCampaign}
                        onChange={(e) => setSelectedCampaign(e.target.value)}
                    >
                        <option value="">All Campaigns</option>
                        {campaigns.map(c => (
                            <option key={c.id} value={c.id}>{c.title}</option>
                        ))}
                    </select>

                    <select 
                        className="select select-bordered select-sm"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="">All Status</option>
                        <option value="SUCCESS">Success</option>
                        <option value="PENDING">Pending</option>
                        <option value="FAILED">Failed</option>
                    </select>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center p-10">
                    <span className="loading loading-spinner loading-lg text-green-600"></span>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead className="bg-gray-50 text-gray-600">
                            <tr>
                                <th>ID</th>
                                <th>Donor</th>
                                <th>Cause/Campaign</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {donations.length > 0 ? (
                                donations.map((donation) => (
                                    <tr key={donation.id}>
                                        <td className="font-mono text-xs text-gray-500">#{donation.id}</td>
                                        <td>
                                            <div className="font-bold">{donation.guest_name || donation.donor_name || "Anonymous"}</div>
                                            <div className="text-xs text-gray-500">{donation.guest_email || donation.donor_email}</div>
                                        </td>
                                        <td>
                                            {/* Assuming donation object has campaign title or cause */}
                                            {donation.campaign_title || donation.message || "General Fund"}
                                        </td>
                                        <td className="font-semibold text-green-700">
                                            {donation.amount} BDT
                                        </td>
                                        <td>
                                            <span className={`badge ${getStatusBadge(donation.status)}`}>
                                                {donation.status}
                                            </span>
                                        </td>
                                        <td className="text-sm">
                                            {new Date(donation.created_at || donation.transaction_date).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center py-8 text-gray-500">
                                        No donation records found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default DonationRequests;
