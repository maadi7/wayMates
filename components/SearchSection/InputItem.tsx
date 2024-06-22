import React, { useEffect, useState } from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { useLocationStore } from '@/lib/store';
interface Option {
  label: string;
  value: string;
}

const InputItem = ({ type, user }: { type: string, user: string }) => {
  const [value, setValue] = useState<Option | null>(null);
  const [placeholder, setPlaceholder] = useState<String | null>(null);
  const setSource = useLocationStore((state) => state.setSource);
  const setDestination = useLocationStore((state) => state.setDestination);


  useEffect(()=>{
    type === 'source' && user === 'lift taker' && setPlaceholder('Pickup Location');
    type === 'destination' && user === 'lift taker' && setPlaceholder('Dropoff Location'); 
    type === 'source' && user === 'lift provider' && setPlaceholder('Starting From'); 
    type === 'destination' && user === 'lift provider' && setPlaceholder('Heading To'); 
  },[])

  const getLatAndLng = (place: any, type: any) => {
    console.log(place, type);
    const placeId = place.value.place_id;
    const service = new google.maps.places.PlacesService(document.createElement('div'));
    service.getDetails({placeId}, (place, status)=>{
      if(status === "OK" && place?.geometry && place.geometry.location){
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        const name = place.formatted_address || '';
        const label = place.name || '';
        if (type === 'source') {
          setSource(lat, lng, name, label);
        } else {
          setDestination(lat, lng, name, label);
        }
      }
    })

  }

  return (
    <div className='bg-slate-200 p-3 mt-3 rounded-lg flex items-center gap-4'>
      <LocationOnIcon />
      <GooglePlacesAutocomplete
        selectProps={{
          value,
          onChange: (place)=>{getLatAndLng(place, type);
            setValue(place)
          },
          placeholder: placeholder,
          isClearable: true,
          className:'w-full',
          components: {
            DropdownIndicator: () => null // Use a function returning null valur
          },
          styles:{
            control: (provided, state)=> ({
              ...provided,
              backgroundColor: "#00ffff00",
              border:'none',
              boxShadow: state.isFocused ? 'none' : provided.boxShadow,
            }),
          }

        }}
     
      />
    </div>
  );
};

export default InputItem;
  