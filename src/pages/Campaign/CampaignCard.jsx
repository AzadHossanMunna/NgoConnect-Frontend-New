import React from 'react';
import { Link } from 'react-router-dom';

const CampaignCard = ({ campaign }) => {
  return (
    <div className="card bg-base-100 shadow-md p-4">
      <h3 className="text-xl font-bold">{campaign.title}</h3>
      <p className="text-gray-600 mt-2">{campaign.description}</p>
      <p className="mt-2">Goal: {campaign.goal_amount}</p>
      <p>Status: {campaign.status}</p>
      <Link to={`/campaigns/${campaign.id}`} className="btn btn-sm mt-3 bg-green-500 hover:bg-green-600">
        View Details
      </Link>
    </div>
  );
};

export default CampaignCard;
