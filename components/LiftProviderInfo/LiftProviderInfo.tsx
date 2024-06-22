import React from 'react';
import Image from 'next/image';
import car from "../../assets/car.png"
import bicycle from "../../assets/bicycle.png"
import scooty from "../../assets/scooty.png"
import bike from "../../assets/bike.png"

interface Provider {
    id: number;
    name: string;
    vehicleType: string;
    farePrice: string;
    rating: number; // Added rating property
}

const LiftProviderInfo: React.FC<{ providers: Provider[] }> = ({ providers }) => {
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="grid grid-cols-1 gap-4 w-full">
                {providers.map(provider => (
                    <div key={provider.id} className="bg-white rounded-lg shadow-md p-4 w-full transition duration-300 ease-in-out transform hover:scale-105 flex justify-between items-center">
                        <div>
                        <p className="text-lg font-semibold">{provider.name}</p>
                        <p className="text-gray-500">{provider.vehicleType}</p>
                        <p className="text-green-500 font-semibold">Price: {provider.farePrice}</p>
                        <div className="flex items-center mt-2">
                            <span className="text-sm text-gray-500 mr-1">Rating:</span>
                            <span className="text-yellow-500 flex">
                                {[...Array(Math.round(provider.rating))].map((_, i) => (
                                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-current" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M3.225 7.383c.365-.349.853-.549 1.375-.549h10.8c.521 0 1.01.2 1.376.55.366.349.575.828.575 1.327v6.558c0 .5-.21.978-.575 1.327a2.166 2.166 0 0 1-1.376.549H4.6c-.522 0-1.01-.2-1.375-.55a2.15 2.15 0 0 1-.575-1.326V8.71c0-.5.209-.978.575-1.327zM10 13.928a.798.798 0 0 0 .57-.24l2.632-2.625a.826.826 0 0 0 0-1.164.817.817 0 0 0-1.156 0l-2.07 2.068-2.07-2.069a.817.817 0 0 0-1.157 0 .826.826 0 0 0 0 1.165l2.633 2.624c.16.16.37.24.578.24z" clipRule="evenodd" />
                                    </svg>
                                ))}
                            </span>
                        </div>
                        </div>
                        <div>
                            <Image src={car} alt='vehicle-logo' height={60} width={60}/>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}

export default LiftProviderInfo;
