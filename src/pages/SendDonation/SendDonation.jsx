import { useState } from "react";

export default function DonateForm() {
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [selectedCause, setSelectedCause] = useState("Food");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const suggestedAmounts = [500, 1000, 2000, 5000];
  const causes = ["Food", "Education", "Medical Aid", "Emergency Relief", "General Fund"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResponse(null);
    setIsLoading(true);

    const payload = {
      amount: Number(amount),
      guest_name: name,
      guest_email: email,
      message: `${selectedCause}: ${message}`,
    };

    console.log("SENDING PAYLOAD 👉", payload);

    try {
      const res = await fetch(
        "https://ngoconeect-backend.onrender.com/api/donations/initiate/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();
      console.log("BACKEND RESPONSE 👉", data);

      if (!res.ok) {
        throw new Error(data?.detail || data?.error || "Something went wrong");
      }

      setResponse(data);
      // Reset form
      setAmount("");
      setName("");
      setEmail("");
      setMessage("");
      setSelectedCause("Food");
    } catch (err) {
      setError(err.message);
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

        .progress-section {
          background: #f1f5f9;
          padding: 20px;
          border-radius: 12px;
          margin-bottom: 25px;
        }

        .progress-text {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
          font-size: 14px;
          color: #475569;
        }

        .progress-bar {
          width: 100%;
          height: 10px;
          background: #e2e8f0;
          border-radius: 5px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #10b981, #34d399);
          border-radius: 5px;
          transition: width 0.3s ease;
          width: 46%;
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

        .cause-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 8px;
        }

        .cause-btn {
          padding: 10px 18px;
          border: 2px solid #e2e8f0;
          border-radius: 10px;
          background: white;
          color: #475569;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          flex: 1;
          min-width: 100px;
          text-align: center;
        }

        .cause-btn:hover {
          border-color: #94a3b8;
        }

        .cause-btn.active {
          background: linear-gradient(135deg, #2d6a4f 0%, #40916c 100%);
          color: white;
          border-color: #2d6a4f;
          box-shadow: 0 4px 12px rgba(45, 106, 79, 0.2);
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

        .form-input {
          width: 100%;
          padding: 14px 16px;
          border: 2px solid #e2e8f0;
          border-radius: 10px;
          font-size: 16px;
          color: #1e293b;
          transition: all 0.2s ease;
          box-sizing: border-box;
        }

        .form-input:focus {
          outline: none;
          border-color: #40916c;
          box-shadow: 0 0 0 3px rgba(64, 145, 108, 0.1);
        }

        .form-input::placeholder {
          color: #94a3b8;
        }

        textarea.form-input {
          resize: vertical;
          min-height: 100px;
          font-family: 'Inter', sans-serif;
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

        .stories-section {
          margin-top: 40px;
          padding: 25px;
          background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
          border-radius: 15px;
          border-left: 4px solid #0ea5e9;
        }

        .stories-section h3 {
          color: #0369a1;
          margin-bottom: 15px;
          font-size: 20px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .story {
          padding: 12px;
          background: white;
          border-radius: 8px;
          margin-bottom: 12px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          border-left: 3px solid #10b981;
        }

        .story:last-child {
          margin-bottom: 0;
        }

        .response-box {
          margin-top: 30px;
          padding: 20px;
          background: #f0fdf4;
          border-radius: 12px;
          border: 2px solid #bbf7d0;
        }

        .response-title {
          color: #166534;
          font-weight: 600;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .payment-url {
          margin-top: 15px;
          padding: 12px;
          background: #dcfce7;
          border-radius: 8px;
          word-break: break-all;
          font-size: 14px;
        }

        .payment-url a {
          color: #166534;
          font-weight: 600;
          text-decoration: none;
        }

        .payment-url a:hover {
          text-decoration: underline;
        }

        .error-box {
          margin-top: 20px;
          padding: 15px;
          background: #fef2f2;
          border-radius: 10px;
          border: 2px solid #fecaca;
          color: #dc2626;
          font-weight: 500;
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
          
          .cause-buttons {
            flex-direction: column;
          }
        }
      `}</style>

      <div className="header">
        <h2>Make a Difference Today</h2>
        <p>Your donation helps us create meaningful change in communities</p>
      </div>

      <div className="progress-section">
        <div className="progress-text">
          <span>Goal: ₹50,000</span>
          <span>Raised: ₹23,000</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill"></div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Select Cause</label>
          <div className="cause-buttons">
            {causes.map((cause) => (
              <button
                type="button"
                key={cause}
                className={`cause-btn ${selectedCause === cause ? 'active' : ''}`}
                onClick={() => setSelectedCause(cause)}
              >
                {cause}
              </button>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Donation Amount (₹)</label>
          <div className="amount-buttons">
            {suggestedAmounts.map((amt) => (
              <button
                type="button"
                key={amt}
                className={`amount-btn ${amount == amt ? 'active' : ''}`}
                onClick={() => setAmount(amt)}
              >
                ₹{amt.toLocaleString()}
              </button>
            ))}
          </div>
          <input
            type="number"
            className="form-input"
            placeholder="Custom Amount (₹)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            min="1"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Your Name</label>
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

        <div className="form-group">
          <label className="form-label">Message (Optional)</label>
          <textarea
            className="form-input"
            placeholder="Share why you're donating or any specific instructions..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
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
              Processing Donation...
            </>
          ) : (
            <>
              <span>Donate Now</span>
              {amount && <span>₹{Number(amount).toLocaleString()}</span>}
            </>
          )}
        </button>

        <div className="secure-badge">
          <span className="icon">🔒</span>
          <span>Secure SSL Encryption • Your data is protected</span>
        </div>
      </form>

      {error && (
        <div className="error-box">
          <strong>Error:</strong> {error}
        </div>
      )}

      {response && (
        <div className="response-box">
          <div className="response-title">
            <span className="icon">✅</span>
            Donation Initiated Successfully!
          </div>
          <p>Your payment has been initialized. You will be redirected to the payment gateway.</p>
          {response.payment_url && (
            <div className="payment-url">
              <strong>Payment URL:</strong><br />
              <a href={response.payment_url} target="_blank" rel="noopener noreferrer">
                {response.payment_url}
              </a>
              <p style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
                Click the link above to complete your payment. This page will automatically redirect in 5 seconds...
              </p>
            </div>
          )}
        </div>
      )}

      <div className="stories-section">
        <h3>
          <span className="icon">✨</span>
          Stories of Impact
        </h3>
        <div className="story">
          "Thanks to generous donors, 20 children received school supplies and uniforms last month!"
        </div>
        <div className="story">
          "Your support helped provide clean drinking water to 50 families in rural areas."
        </div>
        <div className="story">
          "Emergency medical aid was provided to 15 patients through your donations."
        </div>
      </div>
    </div>
  );
}