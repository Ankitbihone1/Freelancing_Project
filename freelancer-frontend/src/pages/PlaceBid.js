import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";

function PlaceBid() {

  const { id } = useParams();
  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  const [data, setData] = useState({
    amount: "",
    proposal: ""
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  // ✅ ONLY FREELANCER ALLOWED
  useEffect(() => {
    if (role !== "FREELANCER") {
      navigate("/dashboard");
    }
  }, [role, navigate]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {

    if (!data.amount || !data.proposal) {
      setMsg("Please fill all fields ❌");
      return;
    }

    try {
      setLoading(true);

      const email = localStorage.getItem("email");

      await API.post(`/bid/place/${id}`, {
        amount: data.amount,
        proposal: data.proposal,
        freelancerEmail: email
      });

      navigate("/projects", {
        state: { message: "Bid submitted successfully ✅" }
      });

    } catch (err) {
      console.log(err);
      setMsg("Error placing bid ❌");
    } finally {
      setLoading(false);
    }
  };

  // auto hide message
  useEffect(() => {
    if (msg) {
      const timer = setTimeout(() => setMsg(""), 2000);
      return () => clearTimeout(timer);
    }
  }, [msg]);

  return (
    <div style={container}>
      <Navbar />

      {msg && <div style={toast}>{msg}</div>}

      <div style={wrapper}>
        <div style={card}>

          <h2 style={title}>💼 Place Your Bid</h2>
          <p style={subtitle}>Submit your proposal to win this project</p>

          <input
            name="amount"
            placeholder="Enter Bid Amount (₹)"
            onChange={handleChange}
            style={input}
          />

          <textarea
            name="proposal"
            placeholder="Write your proposal..."
            onChange={handleChange}
            style={textarea}
          />

          <button 
            onClick={handleSubmit} 
            style={btn}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Bid"}
          </button>

        </div>
      </div>
    </div>
  );
}

/* 🎨 STYLES */

const container = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #667eea, #764ba2)"
};

const wrapper = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "80px"
};

const card = {
  width: "380px",
  padding: "30px",
  borderRadius: "15px",
  background: "rgba(255,255,255,0.15)",
  backdropFilter: "blur(12px)",
  boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
  color: "#fff",
  textAlign: "center"
};

const title = {
  marginBottom: "5px"
};

const subtitle = {
  marginBottom: "20px",
  fontSize: "14px",
  opacity: "0.8"
};

const input = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "none",
  outline: "none",
  background: "rgba(255,255,255,0.2)",
  color: "#fff"
};

const textarea = {
  ...input,
  height: "90px",
  resize: "none"
};

const btn = {
  width: "100%",
  padding: "12px",
  background: "linear-gradient(to right, #ff7a18, #ff4b2b)",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold"
};

const toast = {
  position: "fixed",
  top: "20px",
  right: "20px",
  background: "#333",
  color: "#fff",
  padding: "10px",
  borderRadius: "8px"
};

export default PlaceBid;