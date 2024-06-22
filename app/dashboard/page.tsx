"use client";
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { userStore } from '@/lib/store';
import Image from 'next/image';
import { MapOutlined, InfoOutlined } from '@mui/icons-material';
import image from "@/assets/car.jpeg"
import Searchsection from '@/components/SearchSection/Searchsection';
import MapSection from '@/components/MapSection/MapSection';
import LiftProviderInfo from '@/components/LiftProviderInfo/LiftProviderInfo';
import {providers} from "../utils/CarListData";
import {seekers} from "../utils/UserInfo";
import LiftTakerInfo from '@/components/LiftTakerInfo/LiftTakerInfo';



const Page = () => {

 
  const [storedUser, setStoredUser] = useState<any | null>(null);
  const [directions, setDirections] = useState(null);
  const user = userStore.getState().user;
  const router = useRouter();


  useEffect(() => {
    console.log("ff", user)
    if (!user) {
      const data = localStorage.getItem('user-store') || null;
      console.log(data)
      if (data === null) {
        router.push('/signIn');
      }
      const dataObject = JSON.parse(data || "");
      console.log(dataObject.state.user)
      setStoredUser(dataObject.state.user);
      // addUser(dataObject);
    }
  }, []);


  // Render the page
  if (storedUser && storedUser.userType === "lift taker") {
    return (
      
      <LoadScript
      libraries={['places']}
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string}
      >
      <div className="flex h-screen">
        
      {/* // Left section */}
      <div className="flex-1 p-8" style={{ maxWidth: "460px" }}> {/* Adjust maxWidth as needed */}
          <h2 className="text-2xl font-bold mb-4">Hello {storedUser.firstName},</h2>
          <Searchsection userObj={storedUser} user='lift taker'/>
      </div>

        {/* Center section */}
        <div className="flex flex-1 flex-col justify-center items-center">
        <p className="text-2xl font-semibold mb-4">Ride Options</p>
        <div className="w-full overflow-y-scroll overflow-x-hidden mt-10 mb-5 p-3">
          <LiftProviderInfo providers={providers} />
        </div>
        </div>

        {/* Right section */}
        <div className="flex-1 p-8">
          <MapSection/>
        </div>

      </div>
    </LoadScript>
    );
  } 
  else if (storedUser && storedUser.userType === "lift provider") {
    return (
      <LoadScript
      libraries={['places']}
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string}
      >
      <div className="flex h-screen">
        
        {/* // Left section */}
        <div className="flex-1 p-8" style={{ maxWidth: "460px" }}> {/* Adjust maxWidth as needed */}
            <h2 className="text-2xl font-bold mb-4">Hello {storedUser.firstName},</h2>
            <Searchsection userObj={storedUser} user='lift provider'/>
        </div>
  
          {/* Center section */}
          <div className="flex flex-1 flex-col justify-center items-center">
            <p className="text-2xl font-semibold mb-4">Travel Buddy</p>
            <div className="w-full overflow-y-scroll overflow-x-hidden mt-10 mb-5 p-3">
              <LiftTakerInfo seekers={seekers} />
            </div>
          </div>
  
          {/* Right section */}
          <div className="flex-1 p-8">
            <MapSection/>
          </div>
  
        </div>

      </LoadScript>
    )
  }
  
  else {
    // Render a message or redirect if user type is not "lift taker"
    return (
      <div className="flex h-screen justify-center items-center">
        <h1>Unauthorized Access</h1>
        <p>This page is only accessible to lift takers.</p>
      </div>
    );
  }
};

export default Page;