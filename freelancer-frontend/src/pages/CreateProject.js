import { useState, useEffect } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function CreateProject() {

  const navigate = useNavigate();

  const [project, setProject] = useState({
    pname: "",
    pdesc: "",
    amount: ""
  });

  const [msg, setMsg] = useState("");

  // ✅ ONLY CLIENT ALLOWED
  useEffect(() => {
    const role = localStorage.getItem("role");

    if (role !== "CLIENT") {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const email = localStorage.getItem("email");

      await API.post("/create", {
        ...project,
        clientEmail: email
      });

      // ✅ show message + redirect
      navigate("/projects", {
        state: { message: "Project created successfully ✅" }
      });

    } catch (err) {
      console.log(err);
      setMsg("Error creating project ❌");
    }
  };

  return (
    <div style={container}>
      <Navbar />

      {msg && <div style={errorBox}>{msg}</div>}

      <div style={wrapper}>
        <div style={card}>

          <h2 style={title}>🚀 Create New Project</h2>
          <p style={subtitle}>Post your project and hire freelancers</p>

          <input
            name="pname"
            placeholder="Project Title"
            onChange={handleChange}
            style={input}
          />

          <textarea
            name="pdesc"
            placeholder="Project Description"
            onChange={handleChange}
            style={textarea}
          />

          <input
            name="amount"
            placeholder="Budget (₹)"
            onChange={handleChange}
            style={input}
          />

          <button onClick={handleSubmit} style={btn}>
            Create Project
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
  height: "80px",
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

const errorBox = {
  background: "#f8d7da",
  color: "#721c24",
  padding: "10px",
  borderRadius: "6px",
  margin: "20px auto",
  width: "fit-content"
};

export default CreateProject;