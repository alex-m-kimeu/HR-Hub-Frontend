import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import logo from "../../assets/logo.png";

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:5500/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                }),
            });

            if (!response.ok) {
                throw new Error('Error: ' + response.statusText);
            }

            const data = await response.json();
            localStorage.setItem('token', data.access_token);
            localStorage.setItem('refreshToken', data.refresh_token);
            const decodedToken = jwtDecode(data.access_token);
            localStorage.setItem('role', decodedToken.sub.role);

            if (decodedToken.sub.role === 'admin') {
                navigate('/admin/dashboard');
            } else if (decodedToken.sub.role === 'employee') {
                navigate('/employee/dashboard');
            } else {
                throw new Error('Invalid role');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Function to refresh token
    const refreshToken = async () => {
        const refreshToken = localStorage.getItem('refreshToken');

        try {
            const response = await fetch('http://127.0.0.1:5500/refresh-token', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${refreshToken}`
                }
            });

            if (!response.ok) {
                throw new Error('Error: ' + response.statusText);
            }

            const data = await response.json();
            localStorage.setItem('token', data.access_token);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Call refreshToken function when access token is expired
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp < Date.now() / 1000) {
        refreshToken();
    }

    return (
        <div className='flex items-center justify-center min-h-screen bg-primary-light'>
            <div className='flex flex-col p-6 h-auto w-[350px] md:w-[400px] md:h-auto bg-primary-light rounded-lg shadow-md'>
                <img className='self-center mb-4 w-24 md:w-32' src={logo} alt="Logo" />
                <h1 className='text-center mb-4 font-body text-xl font-bold text-Heading'>Welcome Back!</h1>
                <p className='text-center text-base text-Heading mb-4'>{'Let\'s Keep the Momentum Going'}</p>
                <form className='flex flex-col space-y-6' onSubmit={handleSubmit}>
                    <input
                        className='border p-2 rounded-[8px] outline-none text-Heading'
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input
                        className='border p-2 rounded-[8px] outline-none text-Heading'
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center space-x-2 font-body text-sm font-normal text-Heading'>
                            <input type='checkbox' />
                            <label>Remember me</label>
                        </div>
                        <p className='text-secondary hover:cursor-pointer font-body text-sm font-normal'>Forgot password?</p>
                    </div>
                    <button
                        className='bg-black text-primary-light p-2 rounded-[8px] mt-4'
                        type="submit"
                    >
                        Sign in
                    </button>
                </form>
            </div>
        </div>
    );
}