import { useState } from 'react';
import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { login } from '../ReduxToolkit/authSlice';
import { useNavigate } from 'react-router-dom';
import Allid from './Allid';

function Login() {
    const { register, handleSubmit } = useForm();
    const [showPopup, setShowPopup] = useState(false)
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const onlogin = async (data) => {
        try {
            const response = await axios.post('http://localhost:8000/api/v1/users/login', data, { withCredentials: true });
            if (!response) {
                console.log("Response not found; something went wrong in the login request");
            }
            dispatch(login(response.data.data))
            console.log(response.data.data);
            navigate('/chat')
            setShowPopup(true)
            setTimeout(() => setShowPopup(false), 1000);


        } catch (error) {
            console.log("Something went wrong", error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100" style={{ backgroundImage: 'url("https://images.pexels.com/photos/263856/pexels-photo-263856.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', backgroundSize: 'cover' }} aria-label="Vivid blue colonial wall in Arequipa, Peru">
            <meta name="description" content="Log in to your account to access and manage your blog posts and profile."/>
                <meta name="keywords" content="login, sign in, blog access"/>
                    <meta name="author" content="Your Blog Name"/>
                        <title>Login - Your Blog</title>

                        <form onSubmit={handleSubmit(onlogin)} className="bg-white p-6 rounded shadow-md w-full max-w-sm bg-opacity-80">
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                                <input
                                    type="email"
                                    placeholder="Enter the email"
                                    {...register('email', { required: true })}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                                <input
                                    type="password"
                                    placeholder="Enter the password"
                                    {...register('password', { required: true })}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                    Login
                                </button>
                            </div>
                        </form>
                        {showPopup && (
                            <div className="fixed top-0 left-0 right-0 p-4 bg-green-500 text-white text-center">
                                Logged in successfully!
                            </div>
                        )}
                    </div>
                    );
}

                    export default Login;

