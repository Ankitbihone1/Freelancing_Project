import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";

function ViewBids() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [bids, setBids] = useState([]);
  const [msg, setMsg] = useState("");

  const role = localStorage.getItem("role");

  // ✅ ONLY CLIENT ALLOWED
  useEffect(() => {
    if (role !== "CLIENT") {
      navigate("/dashboard");
    }
  }, [role, navigate]);

  useEffect(() => {
    fetchBids();
  }, []);

  const fetchBids = async () => {
    try {
      const res = await API.get(`/bid/allbid/${id}`);
      setBids(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const acceptBid = async (bidId) => {
    try {
      await API.put(`/bid/accept/${bidId}`);
      setMsg("Bid accepted ✅");
      fetchBids();
    } catch (err) {
      console.log(err);
      setMsg("Error accepting bid ❌");
    }
  };

  const rejectBid = async (bidId) => {
    try {
      await API.put(`/bid/reject/${bidId}`);
      setMsg("Bid rejected ❌");
      fetchBids();
    } catch (err) {
      console.log(err);
      setMsg("Error rejecting bid ❌");
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

      <div style={grid}>

        {bids.length === 0 ? (
          <p>No bids found</p>
        ) : (
          bids.map((b) => (
            <div key={b.id} style={card}>

              <img 
                src="https://cdn-icons-png.flaticon.com/512/2922/2922510.png"
                style={img}
                alt="bid"
              />

              <h2>₹ {b.amount}</h2>

              <p><b>{b.freelancerEmail}</b></p>

              <p style={proposal}>{b.proposal}</p>

              <p style={{ color: getColor(b.status), fontWeight: "bold" }}>
                {b.status}
              </p>

              {b.status === "PENDING" && (
                <div style={btnGroup}>
                  <button 
                    style={acceptBtn}
                    onClick={() => acceptBid(b.id)} // ✅ FIXED
                  >
                    Accept
                  </button>

                  <button 
                    style={rejectBtn}
                    onClick={() => rejectBid(b.id)} // ✅ FIXED
                  >
                    Reject
                  </button>
                </div>
              )}

            </div>
          ))
        )}

      </div>
    </div>
  );
}

/* 🎨 STYLES */

const container = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #eef2f3, #8e9eab)"
};

const grid = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: "25px",
  padding: "30px"
};

const card = {
  width: "260px",
  padding: "20px",
  borderRadius: "15px",
  background: "rgba(255,255,255,0.2)",
  backdropFilter: "blur(10px)",
  boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
  textAlign: "center"
};

const img = {
  width: "50px",
  marginBottom: "10px"
};

const proposal = {
  fontSize: "13px",
  marginBottom: "10px"
};

const btnGroup = {
  display: "flex",
  justifyContent: "center",
  gap: "10px"
};

const acceptBtn = {
  padding: "8px",
  background: "#28a745",
  color: "white",
  border: "none",
  borderRadius: "6px"
};

const rejectBtn = {
  padding: "8px",
  background: "#ff4d4d",
  color: "white",
  border: "none",
  borderRadius: "6px"
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

const getColor = (status) => {
  if (status === "Accept") return "green";
  if (status === "Reject") return "red";
  return "orange";
};

export default ViewBids;