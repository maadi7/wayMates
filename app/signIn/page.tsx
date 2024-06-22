"use client"

import { useState } from 'react';
// import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import { userStore } from '@/lib/store';

const SignIn = () => {
  // State to manage user input for email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // State to manage login error
  const [loginError, setLoginError] = useState('');

  // Router instance to navigate to different pages
  // const router = useRouter();
  const {user, addUser} = userStore();
  // Function to handle form submission
  const handleSignIn = async () => {
    try {
      // Send a POST request to the /api/login endpoint with the user's email and password
      const res = await axios.post("http://localhost:5555/api/auth/login", {email: email, password: password})
      if(res){
        console.log("empty user:", user)
        addUser(res.data);
        console.log(user);
        console.log(res.data);
        window.location.href = "/dashboard"

      }
    } catch (error) {
      // If authentication fails, set login error
      setLoginError('Invalid email or password');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md">
        <h2 className="text-2xl font-bold mb-4">Sign In</h2>
        {/* Email input field */}
        <input
          type="email"
          placeholder="Email"
          className="input-field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* Password input field */}
        <input
          type="password"
          placeholder="Password"
          className="input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* Login button */}
        <button className="btn-primary" onClick={handleSignIn}>
          Sign In
        </button>
        {/* Display login error if authentication fails */}
        {loginError && <p className="text-red-500 mt-2">{loginError}</p>}
        {/* Link to register page */}
        <p className="mt-4 text-center">
          Dont have an account?{' '}
          <Link href="/register" className="text-blue-500">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
