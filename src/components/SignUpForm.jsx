/* eslint-disable no-unreachable */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Authenticate from './Authenticate';
import '../App.css'; 


export default function SignUpForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch('https://fsa-jwt-practice.herokuapp.com/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();
      const token = result.token;
      setToken(token);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="container">
      <h2>Sign Up</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      {token && <Authenticate token={token} />}
    </div>
  );
}

