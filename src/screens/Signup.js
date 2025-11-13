import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", location: "" })
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.location
      })
    });

    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert("Enter Valid Credentials");
    } else {
      // ✅ Save token and redirect to Home
      localStorage.setItem("authToken", json.authToken);
      console.log("Token:", localStorage.getItem("authToken"));
      navigate("/");
    }
  }

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value })
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" name="name" value={credentials.name} onChange={onChange} required />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" name="email" autoComplete="off" value={credentials.email} onChange={onChange} required />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" name="password" autoComplete="new-password" value={credentials.password} onChange={onChange} required />
        </div>

        <div className="mb-3">
          <label htmlFor="location" className="form-label">Address</label>
          <input type="text" className="form-control" name="location" value={credentials.location} onChange={onChange} required />
        </div>

        <button type="submit" className="m-3 btn btn-success">Submit</button>
      </form>
    </div>
  )
}
