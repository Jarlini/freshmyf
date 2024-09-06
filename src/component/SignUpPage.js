import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Authcontainer.css';  // Adjust the path based on your folder structure

axios.defaults.baseURL = 'http://localhost:5000';  // Ensure correct backend URL

function SignUpPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/auth/register', { username, email, password });
            localStorage.setItem('token', response.data.token);

            toast.success('Registration Successful! Please Sign In...', {
                position: "top-right",
                autoClose: 5000,
                theme: "colored",
            });

            // Redirect to Sign In page after successful registration
            navigate('/auth/signin');
        } catch (err) {
            console.error('Error:', err.response?.data || err.message);
            toast.error(err.response?.data?.message || 'Registration failed', {
                position: "top-right",
                autoClose: 5000,
                theme: "colored",
            });
        }
    };

    return (
        <div className="auth-page">
            <div className="form-container">
                <div className="form-box">
                    <h1>Create Account</h1>
                    <form onSubmit={handleSignUp}>
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="submit">Sign Up</button>
                    </form>
                    <p className="toggle-text">
                        Already have an account? <a href="/auth/signin">Sign In</a>
                    </p>
                </div>
                <ToastContainer />
            </div>
        </div>
    );
}

export default SignUpPage;
