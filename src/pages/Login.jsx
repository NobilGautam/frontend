import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const loginUser = async () => {
        const user = {
            username: username,
            password: password,
        };
        try {
            const response = await axios.post('http://localhost:8080/public/login', user);
            console.log('Login successful:', response.data);
            localStorage.setItem("AUTH_KEY", btoa(`${user.username}:${user.password}`));
            navigate('/crud');
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (
        <div className='flex items-center justify-center h-screen'>
            <div className='border-black border-[1px] px-20 p-4 w-fit flex flex-col gap-4'>
                <div>
                    <h1>Login</h1>
                    <p>Welcome back! Please log in to continue.</p>
                </div>
                <div className='flex flex-col gap-2'>
                    <h1 className='ml-2'>Enter Username</h1>
                    <input 
                        type="text" 
                        placeholder='TerrificUser'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} 
                        className="border px-2 py-1 rounded"
                    />
                </div>
                <div className='flex flex-col gap-2'>
                    <h1 className='ml-2'>Enter Password</h1>
                    <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border px-2 py-1 rounded"
                    />
                </div>
                <button
                    onClick={loginUser}
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    LOGIN
                </button>
            </div>
        </div>
    );
};

export default Login;
