import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function AdminProjects() {

  const [projects, setProjects] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const [toast, setToast] = useState("");

  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  // ✅ ADMIN ONLY ACCESS
  useEffect(() => {
    if (role !== "ADMIN") {
      navigate("/dashboard");
    }
  }, [role, navigate]);

  useEffect(() => {
    fetchProjects();
  }, []);

  // ✅ Fetch projects
  const fetchProjects = async () => {
    try {
      const res = await API.get("/admin/projects");
      setProjects(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ Delete project
  const deleteProject = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      setLoadingId(id);

      await API.delete(`/admin/projects/delete/${id}`);

      // 🔥 instant UI update
      setProjects(prev => prev.filter(p => p.pid !== id));

      setToast("Project deleted successfully ✅");

    } catch (err) {
      console.log(err);
      setToast("Error deleting project ❌");
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

      <h2 style={title}>📁 Manage Projects</h2>

      {toast && <div style={toastStyle}>{toast}</div>}

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
              <p style={status}>{p.status}</p>

              <button
                style={deleteBtn}
                onClick={() => deleteProject(p.pid)}
                disabled={loadingId === p.pid}
              >
                {loadingId === p.pid ? "Deleting..." : "Delete"}
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
  padding: "15px",
  borderRadius: "15px",
  background: "#fff",
  boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
  textAlign: "center"
};

const img = {
  width: "100%",
  height: "140px",
  borderRadius: "10px",
  objectFit: "cover",
  marginBottom: "10px"
};

const desc = {
  fontSize: "14px",
  color: "#555",
  marginBottom: "10px"
};

const budget = {
  fontWeight: "bold",
  marginBottom: "5px"
};

const status = {
  color: "#007bff",
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

export default AdminProjects;