"use client"

import { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
// import  sendVerificationEmail  from '@/helpers/sendVerificationEmail';

const Register = () => {
  // State variables to hold form data
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('');

  // Function to handle form submission
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      // Check username length, email format, and password match
      // Validation code removed for brevity
      
      // Generate a random verification code
      const verificationCode = Math.random().toString(36).slice(-8).toUpperCase();

      // Set verification code expiry to 1 hour ahead of the current time
      const verificationCodeExpiry = new Date();
      verificationCodeExpiry.setHours(verificationCodeExpiry.getHours() + 1);

      // Make registration API request
      const response = await axios.post('http://localhost:5555/api/auth/register', {
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
        userType,
        verificationCode,
        verificationCodeExpiry
      });

      // Handle success
      console.log('Registration successful:', response.data);
      // const res = await sendVerificationEmail(firstName, lastName, verificationCode);
      // console.log(res)
      alert('Registration successful. Please check your email for verification code.');

      // Redirect user to verification page with user details as query parameters
      window.location.href = `/verification?email=${email}`;
    } catch (error: any) {
      // Handle error
      console.error('Registration failed:', error.response.data);
      alert('Registration failed. Please try again.');
    }
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="First Name" className="input-field" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
          <input type="text" placeholder="Last Name" className="input-field" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
          <input type="email" placeholder="Email" className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="number" placeholder="Phone Number" className="input-field" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
          <input type="password" placeholder="Password" className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <input type="password" placeholder="Confirm Password" className="input-field" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          <select className="input-field" value={userType} onChange={(e) => setUserType(e.target.value)} required>
            <option value="" disabled>Select who you are?</option>
            <option value="lift taker">lift taker</option>
            <option value="lift provider">lift provider</option>
          </select>
          <button type="submit" className="btn-primary">Register</button>
        </form>
        <p className="mt-4 text-center">Already have an account? <Link href="/signIn" className="text-blue-500">Sign In</Link></p>
      </div>
    </div>
  );
};

export default Register;
