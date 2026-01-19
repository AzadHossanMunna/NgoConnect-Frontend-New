import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CampaignCard from './CampaignCard'; // create this component for display

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('ACTIVE'); // default filter

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await axios.get(
          `https://ngoconeect-backend.onrender.com/api/projects/campaigns/?status=${statusFilter}`
        );
        setCampaigns(res.data);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, [statusFilter]); // re-fetch if filter changes

  if (loading) return <p>Loading campaigns...</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">Campaigns</h2>

      {/* Status Filter */}
      <div className="mb-4">
        {['ACTIVE', 'PLANNED', 'COMPLETED', 'ON_HOLD'].map(status => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`btn mr-2 ${statusFilter === status ? 'btn-primary' : 'btn-outline'}`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Campaign List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {campaigns.map(c => (
          <CampaignCard key={c.id} campaign={c} />
        ))}
      </div>
    </div>
  );
};

export default Campaigns;
