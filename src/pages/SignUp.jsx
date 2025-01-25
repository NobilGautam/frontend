import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const createAccount = async () => {
        const user = {
            username: username,
            password: password,
        };
        try {
            const response = await axios.post('http://localhost:8080/public/create-user', user);
            console.log('Account created successfully:', response.data);
            navigate('/login'); // Redirect to Login component
        } catch (error) {
            console.error('Error creating account:', error);
        }
    };

    return (
        <div className='flex items-center justify-center h-screen'>
            <div className='border-black border-[1px] px-20 p-4 w-fit flex flex-col gap-4'>
                <div>
                    <h1>Sign Up</h1>
                    <p>We are happy to have you on board with us!</p>
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
                    onClick={createAccount}
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    CREATE ACCOUNT
                </button>
            </div>
        </div>
    );
};

export default SignUp;
    