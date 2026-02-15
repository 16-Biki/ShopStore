import { useState } from "react";
import { api } from "../api/api";
import { Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ role: "user" });
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setMsg("");

    // basic validation
    if (!form.username || !form.email || !form.password) {
      setMsg("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      await api.post("/auth/register", form);

      setMsg("🎉 Registration successful! Please login.");
    } catch (err) {
      // email already exists (from backend)
      if (err.response?.data === "User already exists") {
        setMsg("User already has an account. Please login.");
      } else {
        setMsg("Registration failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form">
      <h2>Create Account</h2>

      {msg && <p className="msg">{msg}</p>}

      <select onChange={(e) => setForm({ ...form, role: e.target.value })}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>

      <input
        placeholder="Username"
        onChange={(e) => setForm({ ...form, username: e.target.value })}
      />

      <input
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <button onClick={submit} disabled={loading}>
        {loading ? "Creating..." : "Sign Up"}
      </button>

      {/* LOGIN LINK */}

      <p style={{ marginTop: "15px", fontSize: "14px" }}>
        Already have an account?{" "}
        <Link to="/login" style={{ color: "#2563eb", fontWeight: "600" }}>
          Login
        </Link>
      </p>
    </div>
  );
}
