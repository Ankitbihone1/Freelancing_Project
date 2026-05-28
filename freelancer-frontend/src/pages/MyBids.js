import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function MyBids() {

  const [bids, setBids] = useState([]);
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");

  // ✅ Only freelancer allowed
  useEffect(() => {
    if (role !== "FREELANCER") {
      navigate("/dashboard");
    }
  }, [role, navigate]);

  useEffect(() => {
    fetchMyBids();
  }, []);

  const fetchMyBids = async () => {
    try {
      const res = await API.get(`/bid/my/${email}`);
      setBids(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteBid = async (id) => {
    if (!window.confirm("Delete this bid?")) return;

    try {
      await API.delete(`/bid/delete/${id}`);

      // ✅ instant UI update
      setBids(prev => prev.filter(b => b.id !== id));

      setMsg("Bid deleted successfully ✅");

    } catch (err) {
      console.log(err);
      setMsg("Error deleting bid ❌");
    }
  };

  const completeProject = async (pid) => {
  try {
    const res = await API.put(`/complete/${pid}`);
    alert(res.data);
    fetchMyBids();
  } catch (err) {
    console.log(err);
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

      <h2 style={title}>💰 My Bids</h2>

      {msg && <div style={toast}>{msg}</div>}

      <div style={grid}>

        {bids.length === 0 ? (
          <p>No bids found</p>
        ) : (
          bids.map((b) => (
            <div key={b.id} style={card}>

              <h3>₹ {b.amount}</h3>

              <p><b>Project ID:</b> {b.project?.pid}</p>

              <p style={proposal}>{b.proposal}</p>

              <p style={{ color: getColor(b.status), fontWeight: "bold" }}>
                {b.status}
              </p>

              <button 
                style={dangerBtn}
                onClick={() => deleteBid(b.id)}
              >
                Delete
              </button>

              {b.project?.status === "COMPLETED" ? (
  <p style={{ color: "green", fontWeight: "bold" }}>
    Project Completed ✅
  </p>
) : b.status === "Accept" ? (
  <button style={secBtn}onClick={() => completeProject(b.project?.pid)}>
    Mark Complete
  </button>
) : null}

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
  background: "linear-gradient(135deg, #eef2f3, #8e9eab)",
  paddingTop: "20px"
};

const secBtn = {
  padding: "8px",
  background: "green",
  color: "white",
  border: "none",
  borderRadius: "6px"
};

const completeBtn = {
  padding: "8px",
  background: "#28a745",
  color: "white",
  border: "none",
  borderRadius: "6px",
  marginTop: "10px"
};

const title = {
  textAlign: "center",
  marginTop: "20px"
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

const proposal = {
  fontSize: "13px",
  marginBottom: "10px"
};

const dangerBtn = {
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

export default MyBids;