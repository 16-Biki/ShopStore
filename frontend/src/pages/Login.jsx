import { useState } from "react";
import { api } from "../api/api";
import { useNavigate, Link } from "react-router-dom";

export default function Login({ setUser }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "user",
  });

  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const nav = useNavigate();

  const submit = async () => {
    setMsg("");

    if (!form.email || !form.password) {
      setMsg("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/auth/login", form);

      // Save user to localStorage
      localStorage.setItem("user", JSON.stringify(res.data));

      // Update global state
      setUser(res.data);

      // Redirect properly
      if (res.data.role === "admin") {
        nav("/admin");
      } else {
        nav("/");
      }
    } catch (e) {
      setMsg(e.response?.data || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form">
      <h2>Login</h2>

      {msg && <p className="msg">{msg}</p>}

      <select
        value={form.role}
        onChange={(e) => setForm({ ...form, role: e.target.value })}
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>

      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <button onClick={submit} disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>

      <p style={{ marginTop: "15px" }}>
        Don’t have an account? <Link to="/register">Sign up</Link>
      </p>
    </div>
  );
}
