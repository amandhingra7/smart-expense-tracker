import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api.ts";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      nav("/");
    } catch {
      alert("Login failed");
    }
  };

  return (
    <div className="container">
      <div className="box">
        <h2>Login</h2>
        <input className="input" placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
        <input className="input" placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button className="btn" onClick={submit}>Login</button>
        <p className="link-text">
          Don't have an account? <Link to="/register" className="link">Register</Link>
        </p>
      </div>
    </div>
  );
}
