import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import { useNavigate, useLocation } from "react-router-dom";

function ViewProjects() {

  const [projects, setProjects] = useState([]);
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();
  const loc = useLocation();

  const role = localStorage.getItem("role");
  const email = localStorage.getItem("email");

  // ✅ show success message
  useEffect(() => {
    if (loc.state?.message) {
      setMsg(loc.state.message);
    }
  }, [loc.state]);

  useEffect(() => {
    fetchProjects();
  }, []);

  // auto hide message
  useEffect(() => {
    if (msg) {
      const timer = setTimeout(() => setMsg(""), 2000);
      return () => clearTimeout(timer);
    }
  }, [msg]);

  const fetchProjects = async () => {
    try {
      const res = await API.get("/projects");

      if (role === "CLIENT") {
        const filtered = res.data.filter(
          (p) => p.clientEmail === email
        );
        setProjects(filtered);
      } else {
        setProjects(res.data);
      }

    } catch (err) {
      console.log(err);
    }
  };

  const deleteProject = async (id) => {
    if (!window.confirm("Delete this project?")) return;

    try {
      await API.delete(`/delete/${id}`);
      setProjects(prev => prev.filter(p => p.pid !== id));
      setMsg("Project deleted successfully ✅");

    } catch (err) {
      console.log(err);
      setMsg("Error deleting project ❌");
    }
  };

  // ✅ FIXED: dynamic style function
  const getStatusStyle = (status) => ({
    fontWeight: "bold",
    color:
      status === "COMPLETED"
        ? "green"
        : status === "IN_PROGRESS"
        ? "orange"
        : "blue"
  });

  return (
    <div style={container}>
      <Navbar />

      {msg && <div style={successBox}>{msg}</div>}

      <div style={grid}>

        {projects.length === 0 ? (
          <p>No Projects Found</p>
        ) : (
          projects.map((p) => (
            <div key={p.pid} style={card}>

              <img 
                src="https://source.unsplash.com/300x200/?technology"
                style={img}
                alt="project"
              />

              <h3>{p.pname}</h3>
              <p style={desc}>{p.pdesc}</p>

              <p style={budget}>₹ {p.amount}</p>

              {/* ✅ FIXED */}
              <p style={getStatusStyle(p.status)}>{p.status}</p>

              {/* FREELANCER */}
              {role === "FREELANCER" && p.status === "Open" && (
                <button 
                  style={primaryBtn}
                  onClick={() => navigate(`/bid/${p.pid}`)}
                >
                  Add Bid
                </button>
              )}

              {/* CLIENT */}
              {role === "CLIENT" && (
                <div style={btnGroup}>

                  {p.status === "COMPLETED" ? (
                    <p style={{ color: "green", fontWeight: "bold" }}>
                      Completed ✅
                    </p>
                  ) : (
                    <>
                      <button  style={secBtn} onClick={() => navigate(`/bids/${p.pid}`)}>
                        View Bids
                      </button>

                      <button  style={dangerBtn} onClick={() => deleteProject(p.pid)}>
                        Delete
                      </button>
                    </>
                  )}

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

const successBox = {
  background: "#d4edda",
  color: "#155724",
  padding: "10px",
  borderRadius: "6px",
  margin: "20px auto",
  width: "fit-content",
  fontWeight: "bold"
};

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
  padding: "15px",
  borderRadius: "15px",
  background: "rgba(255,255,255,0.2)",
  backdropFilter: "blur(10px)",
  boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
  textAlign: "center"
};

const secBtn = {
  padding: "8px",
  background: "green",
  color: "white",
  border: "none",
  borderRadius: "6px"
};

const img = {
  width: "100%",
  height: "150px",
  borderRadius: "10px",
  objectFit: "cover",
  marginBottom: "10px"
};

const dangerBtn = {
  padding: "8px",
  background: "#ff4d4d",
  color: "white",
  border: "none",
  borderRadius: "6px"
};


const desc = {
  fontSize: "14px",
  marginBottom: "10px"
};

const budget = {
  fontWeight: "bold",
  marginBottom: "10px"
};

const btnGroup = {
  display: "flex",
  justifyContent: "center",
  gap: "10px"
};

const primaryBtn = {
  padding: "8px",
  background: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "6px"
};

export default ViewProjects;