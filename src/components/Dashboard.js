import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [entries, setEntries] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const fetchData = async () => {
    const res = await fetch('http://localhost:5000/api/user/data', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    const data = await res.json();
    setEntries(data);
  };

  const addEntry = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/user/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ title, description }),
    });
    if (res.ok) {
      setTitle('');
      setDescription('');
      fetchData();
    }
  };

  const deleteEntry = async (id) => {
    const res = await fetch(`http://localhost:5000/api/user/data/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (res.ok) fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);


  useEffect(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');
  if (token) {
    localStorage.setItem('token', token);
    window.history.replaceState({}, document.title, '/dashboard');
  }
  fetchData();
}, []);


  return (
   <div className="container">
  <h2>Dashboard</h2>
  <form onSubmit={addEntry}>
    <input
      placeholder="Title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      required
    />
    <input
      placeholder="Description"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      required
    />
    <button type="submit">Add Entry</button>
  </form>

  <ul>
    {entries.map((entry) => (
      <li key={entry.id}>
        <span>
          <strong>{entry.title}</strong>: {entry.description}
        </span>
        <button onClick={() => deleteEntry(entry.id)}>Delete</button>
      </li>
    ))}
  </ul>

  <a href="/profile">View Profile</a>
</div>

  );
};

export default Dashboard;