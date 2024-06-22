import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type User = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    userType: string;
    isVerified: boolean;
    phoneNumber: string;
    verificationCode: string;
    verificationCodeExpiry: Date;
    createdAt: Date;
    updatedAt: Date;
};

export type State = {
    user: User | null;   
};

export type Actions = {
    addUser: (user: User) => void;
    removeUser: () => void;
};

export const userStore = create<State & Actions>()(
    persist(
        (set) => ({
            user: null,
            addUser: (user: User) => {
                // Log the user data when adding user
                console.log("User saved in Zustand:", user);
                set((state) => ({
                
                    user: user,
                }))
            },
            removeUser: () =>
                set(() => ({
                    user: null,
                })),
        }),
        { name: 'user-store', skipHydration: true }
    )
);


//location store
type Location = {
    lat: number | null;
    lng: number | null;
    name: string | null;
    label: string | null;
};

type LocationState = {
    source: Location;
    destination: Location;
}

type LocationActions = {
    setSource: (lat: number, lng: number, name: string, label: string) => void;
    setDestination: (lat: number, lng: number, name: string, label: string) => void;
};
  
export const useLocationStore = create<LocationState & LocationActions>((set) => ({
    source: { lat: null, lng: null, name: null, label: null },
    destination: { lat: null, lng: null, name: null, label: null },
    setSource: (lat, lng, name, label) => set({ source: { lat, lng, name, label } }),
    setDestination: (lat, lng, name, label) => set({ destination: { lat, lng, name, label } }),
}));

