// Profile.js
import React, { useEffect, useState } from 'react';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await fetch('http://localhost:5000/api/user/profile', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      const data = await res.json();
      setUser(data);
    };
    fetchProfile();
  }, []);

  return (
    <div className="container">
      <h2>User Profile</h2>
      {user ? (
        <div>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Login Method:</strong> {user.login_method}</p>
          <p><strong>Data Table:</strong> {user.table}</p>
        </div>
      ) : <p>Loading...</p>}
      <a href="/dashboard">Back to Dashboard</a>
    </div>
  );
};

export default Profile;
