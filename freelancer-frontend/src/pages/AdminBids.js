import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function AdminBids() {

  const [bids, setBids] = useState([]);
  const [toast, setToast] = useState("");
  const [loadingId, setLoadingId] = useState(null);

  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  // ✅ ADMIN ONLY ACCESS
  useEffect(() => {
    if (role !== "ADMIN") {
      navigate("/dashboard");
    }
  }, [role, navigate]);

  useEffect(() => {
    fetchBids();
  }, []);

  // ✅ Fetch bids
  const fetchBids = async () => {
    try {
      const res = await API.get("/bid/admin/bids");
      setBids(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ Delete bid
  const deleteBid = async (id) => {
    if (!window.confirm("Are you sure you want to delete this bid?")) return;

    try {
      setLoadingId(id);

      await API.delete(`/bid/admin/bids/delete/${id}`);

      // 🔥 instant UI update
      setBids(prev => prev.filter(b => b.id !== id));

      setToast("Bid deleted successfully ✅");

    } catch (err) {
      console.log(err);
      setToast("Error deleting bid ❌");
    } finally {
      setLoadingId(null);
    }
  };

  // ✅ Auto hide toast
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(""), 2000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  return (
    <div style={container}>
      <Navbar />

      <h2 style={title}>💰 Manage Bids</h2>

      {toast && <div style={toastStyle}>{toast}</div>}

      <div style={grid}>

        {bids.length === 0 ? (
          <p>No Bids Found</p>
        ) : (
          bids.map((b) => (
            <div key={b.id} style={card}>

              <img
                src="https://cdn-icons-png.flaticon.com/512/2922/2922510.png"
                alt="bid"
                style={img}
              />

              <h3>₹ {b.amount}</h3>

              <p style={email}>{b.freelancerEmail}</p>

              <p style={proposal}>{b.proposal}</p>

              <p style={{ color: getColor(b.status), fontWeight: "bold" }}>
                {b.status}
              </p>

              <button
                style={deleteBtn}
                onClick={() => deleteBid(b.id)}
                disabled={loadingId === b.id}
              >
                {loadingId === b.id ? "Deleting..." : "Delete"}
              </button>

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
  background: "#fff",
  boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
  textAlign: "center"
};

const img = {
  width: "50px",
  marginBottom: "10px"
};

const email = {
  fontSize: "14px",
  marginBottom: "10px"
};

const proposal = {
  fontSize: "13px",
  color: "#555",
  marginBottom: "10px"
};

const deleteBtn = {
  padding: "8px 12px",
  background: "#ff4d4d",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

const toastStyle = {
  position: "fixed",
  top: "20px",
  right: "20px",
  background: "#333",
  color: "#fff",
  padding: "10px 20px",
  borderRadius: "8px",
  boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
  zIndex: 1000
};

const getColor = (status) => {
  if (status === "Accept") return "green";
  if (status === "Reject") return "red";
  return "orange";
};

export default AdminBids;