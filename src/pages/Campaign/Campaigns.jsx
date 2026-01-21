import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CampaignCard from './CampaignCard';
import { API_BASE_URL, API_ENDPOINTS } from '../../config/api.config';
import { FaFilter } from 'react-icons/fa';

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      setLoading(true);
      setError(null);
      try {
        let url = `${API_BASE_URL}${API_ENDPOINTS.CAMPAIGNS}`;
        if (statusFilter) {
            url += `?status=${statusFilter}`;
        }
        
        const res = await axios.get(url);
        setCampaigns(res.data);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
        setError('Failed to load campaigns. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, [statusFilter]);

  const filterOptions = [
    { label: 'All', value: '' },
    { label: 'Active', value: 'ACTIVE' },
    { label: 'Planned', value: 'PLANNED' },
    { label: 'Completed', value: 'COMPLETED' },
    { label: 'On Hold', value: 'ON_HOLD' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-green-800 mb-4">
            Our Campaigns
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our ongoing initiatives and see how you can contribute to making a difference.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <div className="flex items-center text-gray-500 mr-2">
            <FaFilter className="mr-2" />
            <span className="font-medium">Filter by:</span>
          </div>
          {filterOptions.map(option => (
            <button
              key={option.value}
              onClick={() => setStatusFilter(option.value)}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                statusFilter === option.value
                  ? 'bg-green-600 text-white shadow-md transform scale-105'
                  : 'bg-white text-gray-600 hover:bg-green-50 hover:text-green-700 border border-gray-200'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <span className="loading loading-spinner loading-lg text-green-600"></span>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 bg-red-50 p-4 rounded-lg">
            {error}
          </div>
        ) : campaigns.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <h3 className="text-2xl font-bold text-gray-400">No campaigns found</h3>
            <p className="text-gray-500 mt-2">
                {statusFilter ? `There are currently no ${statusFilter.toLowerCase()} campaigns.` : 'No campaigns available at the moment.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {campaigns.map(c => (
              <CampaignCard key={c.id} campaign={c} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Campaigns;
