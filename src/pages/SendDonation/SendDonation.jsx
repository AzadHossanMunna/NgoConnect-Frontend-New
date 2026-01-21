import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { axiosSecure } from "../../hooks/useAxiosSecure";
import axios from "axios";
import { API_BASE_URL, API_ENDPOINTS } from "../../config/api.config";
import { useSearchParams } from "react-router-dom";
import { FaLock, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

export default function DonateForm() {
  const { user } = useAuth();
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedCampaign, setSelectedCampaign] = useState(""); // Default to "" (General Fund)
  const [campaigns, setCampaigns] = useState([]);
  
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const [searchParams] = useSearchParams();
  const campaignIdFromUrl = searchParams.get("campaign");

  useEffect(() => {
    // Pre-fill user data if logged in
    if (user) {
      setName(user.first_name ? `${user.first_name} ${user.last_name || ''}`.trim() : '');
      setEmail(user.email || '');
    }
  }, [user]);

  useEffect(() => {
    // Fetch Campaigns for Dropdown
    const fetchCampaigns = async () => {
        try {
            // Using public instance as this page might be accessible to guests
            const res = await axios.get(`${API_BASE_URL}/api/projects/campaigns/`);
            if (Array.isArray(res.data)) {
                setCampaigns(res.data);
            } else if (res.data.results) {
                setCampaigns(res.data.results);
            }
        } catch (error) {
            console.error("Failed to load campaigns", error);
        }
    };
    fetchCampaigns();
  }, []);

  useEffect(() => {
    // Set campaign from URL if available
    if (campaignIdFromUrl) {
        setSelectedCampaign(parseInt(campaignIdFromUrl));
    }
  }, [campaignIdFromUrl]);

  const suggestedAmounts = [500, 1000, 2000, 5000];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResponse(null);
    setIsLoading(true);

    const payload = {
      amount: Number(amount),
      guest_name: name,
      guest_email: email,
      ...(selectedCampaign ? { campaign_id: selectedCampaign } : {})
    };

    console.log("SENDING DONATION PAYLOAD 👉", payload);

    try {
      let res;
      // Use secure axios if user is logged in (to potentially link donation to user account)
      // If user is guest, use public axios
      if (user) {
         res = await axiosSecure.post(API_ENDPOINTS.DONATION_INITIATE, payload);
      } else {
         res = await axios.post(`${API_BASE_URL}${API_ENDPOINTS.DONATION_INITIATE}`, payload);
      }

      const data = res.data;
      console.log("PAYMENT RESPONSE 👉", data);

      if (data.payment_url) {
          // Redirect to SSLCommerz or Gateway
          window.location.replace(data.payment_url);
      } else {
          setResponse(data); 
          setAmount("");
      }

    } catch (err) {
      console.error(err);
      const data = err.response?.data;
      const errorMsg = data?.amount?.[0]
          || data?.guest_email?.[0] 
          || data?.non_field_errors?.[0]
          || data?.detail 
          || "Failed to initiate payment";
      setError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="donate-container">
      <style>{`
        .donate-container {
          max-width: 600px;
          margin: 40px auto;
          padding: 40px 30px;
          border-radius: 20px;
          background: linear-gradient(145deg, #ffffff, #f8fafc);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.08);
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          border: 1px solid #e2e8f0;
        }

        .header {
          text-align: center;
          margin-bottom: 30px;
        }

        .header h2 {
          font-size: 28px;
          font-weight: 700;
          background: linear-gradient(135deg, #2d6a4f 0%, #40916c 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 10px;
        }

        .header p {
          color: #64748b;
          font-size: 16px;
          line-height: 1.5;
        }

        .form-group {
          margin-bottom: 24px;
        }

        .form-label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: #1e293b;
          font-size: 14px;
        }

        .amount-buttons {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
          gap: 12px;
          margin: 12px 0 20px;
        }

        .amount-btn {
          padding: 14px 0;
          border: 2px solid #e2e8f0;
          border-radius: 10px;
          background: white;
          color: #1e293b;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .amount-btn:hover {
          border-color: #94a3b8;
          transform: translateY(-2px);
        }

        .amount-btn.active {
          background: linear-gradient(135deg, #2d6a4f 0%, #40916c 100%);
          color: white;
          border-color: #2d6a4f;
          box-shadow: 0 4px 12px rgba(45, 106, 79, 0.2);
        }

        .form-input, .form-select {
          width: 100%;
          padding: 14px 16px;
          border: 2px solid #e2e8f0;
          border-radius: 10px;
          font-size: 16px;
          color: #1e293b;
          transition: all 0.2s ease;
          box-sizing: border-box;
          background-color: white;
        }

        .form-input:focus, .form-select:focus {
          outline: none;
          border-color: #40916c;
          box-shadow: 0 0 0 3px rgba(64, 145, 108, 0.1);
        }

        .form-input::placeholder {
          color: #94a3b8;
        }

        .submit-btn {
          width: 100%;
          padding: 18px;
          background: linear-gradient(135deg, #2d6a4f 0%, #40916c 100%);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 18px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(64, 145, 108, 0.3);
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .spinner {
          width: 20px;
          height: 20px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 1s ease-in-out infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .error-box {
          margin-top: 20px;
          padding: 15px;
          background: #fef2f2;
          border-radius: 10px;
          border: 2px solid #fecaca;
          color: #dc2626;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .secure-badge {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-top: 20px;
          color: #475569;
          font-size: 14px;
        }

        .icon {
          font-size: 20px;
        }

        @media (max-width: 640px) {
          .donate-container {
            margin: 20px;
            padding: 25px 20px;
          }
          
          .amount-buttons {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>

      <div className="header">
        <h2>Make a Difference Today</h2>
        <p>Your donation helps us create meaningful change in communities</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Select Campaign</label>
          <select 
            className="form-select"
            value={selectedCampaign}
            onChange={(e) => setSelectedCampaign(e.target.value)}
          >
            <option value="">General Fund (Most Flexible)</option>
            {campaigns.map(c => (
                <option key={c.id} value={c.id}>{c.title}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Donation Amount (BDT)</label>
          <div className="amount-buttons">
            {suggestedAmounts.map((amt) => (
              <button
                type="button"
                key={amt}
                className={`amount-btn ${amount == amt ? 'active' : ''}`}
                onClick={() => setAmount(amt)}
              >
                {amt.toLocaleString()} BDT
              </button>
            ))}
          </div>
          <input
            type="number"
            className="form-input"
            placeholder="Custom Amount (BDT)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            min="10"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            className="form-input"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input
            type="email"
            className="form-input"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <button 
          type="submit" 
          className="submit-btn"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <div className="spinner"></div>
              Processing...
            </>
          ) : (
             <>
              <span>Donate Now</span>
              {amount && <span>{Number(amount).toLocaleString()} BDT</span>}
            </>
          )}
        </button>

        <div className="secure-badge">
          <FaLock className="text-gray-400" />
          <span>Secure SSL Encryption • Your data is protected</span>
        </div>
      </form>

      {error && (
        <div className="error-box">
          <FaExclamationCircle />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
