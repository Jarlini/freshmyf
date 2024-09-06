import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

axios.defaults.baseURL = 'http://localhost:5000';

function SignInPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/auth/login', { email, password });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('role', response.data.role);

            toast.success('Sign In successful!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                theme: "colored",
            });

            if (response.data.role === 'admin') {
                navigate('/admin-dashboard');
            } else {
                navigate('/home');
            }
        } catch (err) {
            toast.error('Invalid email or password!', {
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
                    <h1>Sign In</h1>
                    <form onSubmit={handleSignIn}>
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
                        <button type="submit">Sign In</button>
                    </form>
                    <p className="toggle-text">
                        Don't have an account? <a href="/auth/signup">Sign Up</a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SignInPage;
