"use client";

import { useState } from 'react';
import {  useSearchParams } from 'next/navigation'
import axios from 'axios';

const Verification = () => {
  const searchParams = useSearchParams()
  const [emailOTP, setEmailOTP] = useState('');
  const [phoneOTP, setPhoneOTP] = useState('');
  const [error, setError] = useState('');

  
  const handleEmailOTPChange = (event: any) => {
    setEmailOTP(event.target.value);
  };

  const handlePhoneOTPChange = (event: any) => {
    setPhoneOTP(event.target.value);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      console.log(searchParams.get('email'))

      // Make a POST request to the backend API to verify the user
      const response = await axios.post('http://localhost:5555/api/auth/verify', {
        email: searchParams.get('email'),
        verificationCode: emailOTP
      });

      console.log(response.data.message);
      alert("success")
    } catch (error: any) {
      console.log(error.response.data)
      setError(error.response.data.error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md">
        <h2 className="text-2xl font-bold mb-4">Verification</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="emailOTP" className="block text-gray-700">Enter OTP sent to your email:</label>
            <input type="text" id="emailOTP" value={emailOTP} onChange={handleEmailOTPChange} className="input-field" />
          </div>
          <div className="mb-4">
            <label htmlFor="phoneOTP" className="block text-gray-700">Enter OTP sent to your phone number:</label>
            <input type="text" id="phoneOTP" value={phoneOTP} onChange={handlePhoneOTPChange} className="input-field" />
          </div>
          <button type="submit" className="btn-primary">Verify</button>
        </form>
      </div>
    </div>
  );
};

export default Verification;
