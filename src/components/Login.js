
// Login.js
import React, { useState } from 'react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            if (res.ok) {
                localStorage.setItem('token', data.token);
                window.location.href = '/dashboard';
            } else {
                setMessage(data.message || 'Login failed');
            }
        } catch (err) {
            setMessage('Error connecting to server');
        }
    };

    return (
        <div className="container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Login</button>
            </form>
            <p>{message}</p>
            <p>Don't have an account? <a href="/">Signup</a></p>

            <p>
                <a href="http://localhost:5000/api/auth/google" style={{ textDecoration: 'none' }}>
                    <button className="google-btn">
                        <img
                            src="https://i0.wp.com/9to5google.com/wp-content/uploads/sites/4/2025/05/Google-2025-G-logo.webp?ssl=1"
                            alt="Google"
                            className="google-icon"
                        />
                        Login with Google
                    </button>
                </a>
            </p>

        </div>
    );
};

export default Login;
