import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from '../../../config/api.config';
import { FaHeart, FaUserCircle } from 'react-icons/fa';

const RecentDonations = () => {
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDonations = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}${API_ENDPOINTS.DONATION_PUBLIC}`);
                console.log("Recent Donations Data:", res.data);
                // Assuming response is a list or { results: [] }
                setDonations(Array.isArray(res.data) ? res.data : res.data.results || []);
            } catch (error) {
                console.error("Failed to fetch public donations", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDonations();
    }, []);

    if (loading || donations.length === 0) return null;

    const getDonorName = (donation) => {
        return donation.donor_name_display || 
               donation.guest_name || 
               donation.donor_name || 
               donation.name || 
               (donation.user?.first_name ? `${donation.user.first_name} ${donation.user.last_name || ''}` : null) ||
               (donation.user_name) ||
               "Anonymous";
    };

    return (
        <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-gray-800">Recent Donors <span className="text-green-600">❤</span></h2>
                    <p className="text-gray-600 mt-2">Thank you to our latest supporters for making a difference.</p>
                </div>

                {/* Marquee effect or Grid - Using Grid for simplicity and better mobile view */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {donations.slice(0, 8).map((donation, index) => (
                        <div key={index} className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-4 border border-gray-100 transform hover:-translate-y-1 transition duration-300">
                            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xl overflow-hidden">
                                {donation.avatar ? <img src={donation.avatar} alt="avatar" /> : <FaUserCircle />}
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-800">{getDonorName(donation)}</h4>
                                <p className="text-sm text-gray-500">Donated <span className="text-green-600 font-semibold">{donation.amount} BDT</span></p>
                                {donation.timestamp && (
                                    <p className="text-xs text-gray-400">{new Date(donation.timestamp).toLocaleDateString()}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RecentDonations;
