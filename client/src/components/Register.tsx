import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api.ts";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/register", { email, password });
      localStorage.setItem("token", res.data.token);
      nav("/");
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <div className="container">
      <div className="box">
        <h2>Register</h2>
        <input className="input" placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
        <input className="input" placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button className="btn" onClick={submit}>Register</button>
        <p className="link-text">
          Already have an account? <Link to="/login" className="link">Login</Link>
        </p>
      </div>
    </div>
  );
}
