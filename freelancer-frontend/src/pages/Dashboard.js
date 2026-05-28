import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const navigate = useNavigate();

  // ✅ Load user data safely
  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const storedRole = localStorage.getItem("role");

    if (!storedEmail || !storedRole) {
      navigate("/"); // redirect to login
    } else {
      setEmail(storedEmail);
      setRole(storedRole);
    }
  }, [navigate]);

  return (
    <div style={container}>
      <Navbar />

      <div style={content}>
        <h2 style={title}>Dashboard</h2>
        <p style={subtitle}>Welcome, {email || "User"}</p>

        <div style={grid}>

          {/* CLIENT */}
          {role === "CLIENT" && (
            <>
              <div style={card}>
                <img src="https://cdn-icons-png.flaticon.com/512/906/906334.png" style={img}/>
                <h3>Create Project</h3>
                <button style={primaryBtn} onClick={() => navigate("/create-project")}>
                  Create
                </button>
              </div>

              <div style={card}>
                <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" style={img}/>
                <h3>Explore Projects</h3>
                <button style={secondaryBtn} onClick={() => navigate("/projects")}>
                  Explore
                </button>
              </div>
            </>
          )}

          {/* FREELANCER */}
          {role === "FREELANCER" && (
            <>
              <div style={card}>
                <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" style={img}/>
                <h3>Explore Projects</h3>
                <button style={secondaryBtn} onClick={() => navigate("/projects")}>
                  Explore
                </button>
              </div>

              <div style={card}>
                <img src="https://cdn-icons-png.flaticon.com/512/2922/2922510.png" style={img}/>
                <h3>My Bids</h3>
                <button style={primaryBtn} onClick={() => navigate("/my-bids")}>
                  Open
                </button>
              </div>
            </>
          )}

          {/* ADMIN */}
          {role === "ADMIN" && (
            <>
              <div style={adminCard}>
                <h3>👥 Users</h3>
                <p>Manage all users</p>
                <button style={btn} onClick={() => navigate("/admin/users")}>
                  Manage
                </button>
              </div>

              <div style={adminCard}>
                <h3>📁 Projects</h3>
                <p>All client projects</p>
                <button style={btn} onClick={() => navigate("/admin/projects")}>
                  Manage
                </button>
              </div>

              <div style={adminCard}>
                <h3>💰 Bids</h3>
                <p>All freelancer bids</p>
                <button style={btn} onClick={() => navigate("/admin/bids")}>
                  Manage
                </button>
              </div>
            </>
          )}

        </div>

        {/* fallback */}
        {!role && <p>Loading...</p>}

      </div>
    </div>
  );
}

/* 🎨 STYLES */

const container = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #667eea, #764ba2)"
};

const content = {
  textAlign: "center",
  marginTop: "50px",
  color: "#fff"
};

const title = {
  marginBottom: "5px"
};

const subtitle = {
  opacity: "0.8"
};

const grid = {
  display: "flex",
  justifyContent: "center",
  gap: "30px",
  marginTop: "50px",
  flexWrap: "wrap"
};

const card = {
  width: "240px",
  padding: "25px",
  borderRadius: "15px",
  background: "rgba(255,255,255,0.15)",
  backdropFilter: "blur(12px)",
  boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
  textAlign: "center"
};

const adminCard = {
  width: "260px",
  padding: "25px",
  borderRadius: "15px",
  background: "linear-gradient(135deg, #ff7a18, #ff4b2b)",
  color: "white",
  boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
  textAlign: "center"
};

const img = {
  width: "60px",
  marginBottom: "10px"
};

const primaryBtn = {
  marginTop: "10px",
  padding: "10px",
  width: "100%",
  background: "linear-gradient(to right, #ff7a18, #ff4b2b)",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer"
};

const secondaryBtn = {
  marginTop: "10px",
  padding: "10px",
  width: "100%",
  background: "#28a745",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer"
};

const btn = {
  marginTop: "10px",
  padding: "10px",
  width: "100%",
  background: "#fff",
  color: "#333",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold"
};

export default Dashboard;