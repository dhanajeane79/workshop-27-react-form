/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import '../App.css'; 

export default function Authenticate({ token }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    async function authenticateToken() {
      try {
        const response = await fetch(
          "https://fsa-jwt-practice.herokuapp.com/signup",
           {
             method: "GET",
             headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${token}`,
             }   
            }
         );

        if (response.ok) {
          const data = await response.json();
          setAuthenticated(true);
          setUsername(data.username);
        } else {
          setAuthenticated(false);
        }
      } catch (error) {
        console.error(error);
        setAuthenticated(false);
      }
    }

    if (token) {
      authenticateToken();
    }
  }, [token]);

  return (
    <div className="container">
      {authenticated ? (
        <>
          <p>Token is authenticated.</p>
          <p>Welcome, {username}!</p>
        </>
      ) : (
        <p className="error"></p>
      )}
    </div>
  );
}