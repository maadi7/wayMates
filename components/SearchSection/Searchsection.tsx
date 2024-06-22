import React, { useState, useEffect } from 'react';
import InputItem from './InputItem';
import { useLocationStore } from '@/lib/store';
import io from 'socket.io-client';
import axios from 'axios';

const LOCATION_UPDATE_INTERVAL = Number(process.env.NEXT_PUBLIC_LOCATION_UPDATE_INTERVAL) || 5000;
const socket = io('http://localhost:3001');

interface UserObj {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userType: 'LiftProvider' | 'LiftSeeker';
  isVerified: boolean;
  phoneNumber: string;
  verificationCode: string;
  verificationCodeExpiry: Date;
  createdAt: Date;
  updatedAt: Date;
}

interface SearchsectionProps {
  user: string;
  userObj: UserObj;
}

interface Location {
  latitude: number;
  longitude: number;
}
type LocationD = {
  lat: number | null;
  lng: number | null;
  name: string | null;
  label: string | null;
};

const Searchsection: React.FC<SearchsectionProps> = ({ user, userObj }) => {
  const source = useLocationStore((state) => state.source);
  const destination = useLocationStore((state) => state.destination);
  const [nearbyUsers, setNearbyUsers] = useState<any[]>([]);

  useEffect(() => {
    socket.on('locationUpdate', (data) => {
      console.log('Received location update:', data);
    });

    const interval = setInterval(async () => {
      const { latitude, longitude } = await getCurrentLocation();
      socket.emit('locationUpdate', { userId: userObj._id, latitude, longitude });
    }, LOCATION_UPDATE_INTERVAL);

    return () => {
      clearInterval(interval);
      socket.off('locationUpdate');
    };
  }, [userObj]);

  const handleSearch = async () => {
    const userType = userObj.userType;
    console.log(userType)
    const { latitude, longitude } = await getCurrentLocation();
    await saveOrUpdateUser(userType, latitude, longitude, destination);
    const response = await fetchNearbyUsers(userType, latitude, longitude, destination);
    setNearbyUsers(response);
  };

  const getCurrentLocation = async (): Promise<Location> => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          reject(error);
        }
      );
    });
  };

  const fetchNearbyUsers = async (userType: 'LiftProvider' | 'LiftSeeker', latitude: number, longitude: number, destination: LocationD) => {
    const endpoint = userType === 'LiftProvider' ? '/api/liftSeekers/search/nearby' : '/api/liftProviders/search/nearby';
    const response = await axios.get(`http://localhost:5555${endpoint}`, {
      params: {
        latitude,
        longitude,
        destination
      },
    });
    return response.data;
  };
  const saveOrUpdateUser = async (userType: 'LiftProvider' | 'LiftSeeker', latitude: number, longitude: number, destination: any) => {
    const endpoint = userType === 'LiftProvider' ? '/api/liftProviders/save' : '/api/liftSeekers/save';
    console.log(destination.longitude)
    await axios.post(`http://localhost:5555${endpoint}`, {
      user: userObj._id,
      currentLocation: {
        type: 'Point',
        coordinates: [longitude, latitude],
      },
      destination: {
        type: 'Point',
        coordinates: [destination.lng, destination.lat],
      }
    });
  };
  return (
    <div className="p-2 md:p-6 border-[2px] rounded-xl">
      <p className="text-[20px] font-bold">Get a ride</p>
      <InputItem type="source" user={user} />
      <InputItem type="destination" user={user} />
      <button className="p-3 bg-black w-full mt-5 text-white rounded-lg" onClick={handleSearch}>
        Search
      </button>
      <div>
        {nearbyUsers.map((nearbyUser) => (
          <div key={nearbyUser._id}>
            <p>{nearbyUser.user.name} - {nearbyUser.destination}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Searchsection;
