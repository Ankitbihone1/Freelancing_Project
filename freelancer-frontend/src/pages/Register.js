import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
    role: "CLIENT"
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await API.post("/users/register", user);

      alert(res.data);

      if (res.data.toLowerCase().includes("success")) {
        navigate("/");
      }

    } catch (err) {
      console.log(err);
      alert("Error registering");
    }
  };

  return (
    <div style={container}>

      <div style={card}>

        <h2 style={title}>Create Account 🚀</h2>
        <p style={subtitle}>Join as Client or Freelancer</p>

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          style={input}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          style={input}
        />

        <select name="role" onChange={handleChange} style={input}>
          <option value="CLIENT">Client</option>
          <option value="FREELANCER">Freelancer</option>
        </select>

        <button onClick={handleSubmit} style={btn}>
          Register
        </button>

        <p style={{ marginTop: "15px", fontSize: "14px" }}>
          Already have an account?{" "}
          <span
            onClick={() => navigate("/")}
            style={link}
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
}

/* 🎨 STYLES */

const container = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #667eea, #764ba2)"
};

const card = {
  width: "340px",
  padding: "30px",
  borderRadius: "15px",
  background: "rgba(255,255,255,0.15)",
  backdropFilter: "blur(12px)",
  boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
  textAlign: "center",
  color: "#fff"
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

const link = {
  color: "#ffd369",
  cursor: "pointer",
  fontWeight: "bold"
};

export default Register;