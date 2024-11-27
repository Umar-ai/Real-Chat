import { useState } from 'react';
import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { login } from '../ReduxToolkit/authSlice';
import { useNavigate } from 'react-router-dom';

function Register() {
    const { register, handleSubmit } = useForm();
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onRegister = async (data) => {
        try {
            const response = await axios.post('http://localhost:8000/api/v1/users/register', data, { withCredentials: true });
            if (!response) {
                console.log("Response not found; something went wrong in the registration request");
            }
            dispatch(login(response.data.data));
            console.log(response.data.data);
            navigate('/chat');
            setShowPopup(true);
            setTimeout(() => setShowPopup(false), 1000);
        } catch (error) {
            console.log("Something went wrong", error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100" style={{ backgroundImage: 'url("https://images.pexels.com/photos/28523492/pexels-photo-28523492/free-photo-of-vivid-blue-colonial-wall-in-arequipa-peru.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load")', backgroundSize: 'cover' }} aria-label="Vivid blue colonial wall in Arequipa, Peru">
            <meta name="description" content="Register a new account to start chatting and connecting with others." />
            <meta name="keywords" content="register, sign up, chat application" />
            <meta name="author" content="Your App Name" />
            <title>Register</title>

            <form onSubmit={handleSubmit(onRegister)} className="bg-white p-6 rounded shadow-md w-full max-w-sm bg-opacity-80">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
                    <input
                        type="text"
                        placeholder="Enter your username"
                        {...register('username', { required: true })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        {...register('email', { required: true })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        {...register('password', { required: true })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Register
                    </button>
                </div>
            </form>
            {showPopup && (
                <div className="fixed top-0 left-0 right-0 p-4 bg-green-500 text-white text-center">
                    Registered successfully!
                </div>
            )}
        </div>
    );
}

export default Register;
