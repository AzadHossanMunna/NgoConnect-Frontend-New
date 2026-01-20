import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from '../../config/api.config';
import { FaCalendarAlt, FaHandHoldingHeart, FaBullseye, FaArrowLeft, FaCheckCircle } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';

const CampaignDetails = () => {
  const { slug } = useParams();
  const { user } = useAuth();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}${API_ENDPOINTS.CAMPAIGNS}${slug}/`);
        setCampaign(res.data);
      } catch (err) {
        console.error('Error fetching campaign details:', err);
        setError('Failed to load campaign details.');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg text-green-600"></span>
      </div>
    );
  }

  if (error || !campaign) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-red-500 mb-4">Error</h2>
        <p className="text-gray-600 mb-6">{error || 'Campaign not found'}</p>
        <Link to="/campaign" className="btn btn-outline">Back to Campaigns</Link>
      </div>
    );
  }

  const { 
    id,
    title, 
    description, 
    goal_amount, 
    budget_allocated, 
    start_date, 
    end_date, 
    status 
  } = campaign;

  // Calculate percentage if we had raised amount, but API doesn't show it yet.
  // Assuming strict adherence to provided API spec which only has goal_amount.
  
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <Link to="/campaign" className="inline-flex items-center text-gray-500 hover:text-green-600 mb-6 transition-colors">
          <FaArrowLeft className="mr-2" /> Back to Campaigns
        </Link>
        
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-green-600 text-white p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white opacity-10 rounded-full"></div>
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-white opacity-10 rounded-full"></div>
            
            <div className="relative z-10">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium border border-white/30">
                  {status}
                </span>
                <span className="flex items-center text-green-50 text-sm">
                  <FaCalendarAlt className="mr-2" />
                  {new Date(start_date).toLocaleDateString()} - {new Date(end_date).toLocaleDateString()}
                </span>
              </div>
              
              <h1 className="text-3xl md:text-5xl font-bold mb-4">{title}</h1>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-0">
            {/* Main Content */}
            <div className="md:col-span-2 p-8 md:p-12 border-b md:border-b-0 md:border-r border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">About this Campaign</h2>
              <div className="prose prose-green max-w-none text-gray-600 leading-relaxed whitespace-pre-line">
                {description}
              </div>

              <div className="mt-12 bg-green-50 rounded-xl p-6">
                 <h3 className="flex items-center text-lg font-bold text-green-800 mb-4">
                    <FaCheckCircle className="mr-2" /> What We Need
                 </h3>
                 <p className="text-gray-700">
                   This campaign aims to raise a total of <span className="font-bold text-green-700">৳{Number(goal_amount).toLocaleString()}</span> to support our cause. 
                   Every donation helps us reach this goal and make a tangible impact.
                 </p>
              </div>
            </div>

            {/* Sidebar / Stats */}
            <div className="md:col-span-1 p-8 bg-gray-50/50">
              <div className="sticky top-8 space-y-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="text-center mb-6">
                    <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">Goal Amount</p>
                    <p className="text-4xl font-extrabold text-green-600 mt-2">
                      ৳{Number(goal_amount).toLocaleString()}
                    </p>
                  </div>
                  
                  {user?.role === 'admin' || user?.role === 'manager' ? (
                     <div className="text-center border-t pt-4 mt-4">
                        <p className="text-gray-500 text-xs uppercase">Internal Budget</p>
                        <p className="text-xl font-bold text-gray-700">৳{Number(budget_allocated).toLocaleString()}</p>
                     </div>
                  ) : null}

                  <Link 
                    to={user ? `/SendDonation?campaign=${id}` : "/login"} 
                    state={{ from: `/campaign/${slug}` }}
                    className="btn btn-lg bg-green-600 hover:bg-green-700 text-white w-full shadow-lg hover:shadow-green-200 mt-6 border-none"
                  >
                   <FaHandHoldingHeart className="mr-2" /> Donate Now
                  </Link>
                  <p className="text-xs text-center text-gray-400 mt-3">
                    Secure donation via NGO Connect
                  </p>
                </div>

                <div className="bg-green-100 p-6 rounded-xl text-green-800">
                  <h4 className="font-bold mb-2">Share this campaign</h4>
                  <p className="text-sm opacity-80 mb-4">Help us reach more people by sharing this campaign with your network.</p>
                  <div className="flex gap-2">
                    {/* Placeholder for share buttons */}
                    <button className="btn btn-sm btn-circle btn-ghost bg-white/50 text-green-800">FB</button>
                    <button className="btn btn-sm btn-circle btn-ghost bg-white/50 text-green-800">TW</button>
                    <button className="btn btn-sm btn-circle btn-ghost bg-white/50 text-green-800">IN</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;
