import React, { useEffect, useState } from 'react';
import { DirectionsRenderer, GoogleMap, MarkerF, OverlayView, OverlayViewF, useJsApiLoader } from '@react-google-maps/api';
import { useLocationStore } from '@/lib/store';

const MapSection = () => {
    const source = useLocationStore((state) => state.source);
    const destination = useLocationStore((state) => state.destination);
    const [map, setMap] = React.useState(null);
    const [directionRoutePoints, setDirectionRoutePoints]=useState<google.maps.DirectionsResult | null>(null);
    const [center, setCenter] = useState({
        lat: 19.2469649,
        lng: 72.9818412
    })
    const containerStyle = {
        width: '100%',
        height: '100%'
    };

    useEffect(()=>{
      if(source.lat && source.lng && map){
            setCenter({
            lat: source.lat,
            lng: source.lng
            });
        }
        if(source.label && destination.label){
            directionRoute();
        }
    }, [source]);

    useEffect(()=>{
      if(destination.lat && destination.lng && map){
        setCenter({
        lat: destination.lat,
        lng: destination.lng
        });
        }
        if(source.label && destination.label){
            directionRoute();
        }

    }, [destination]);
      
    const directionRoute = () =>{
        if(source.lat && source.lng && destination.lat && destination.lng && map){

        const DirectionsService = new google.maps.DirectionsService();
        DirectionsService.route({
            origin: {lat: source.lat, lng: source.lng},
            destination: {lat: destination.lat, lng: destination.lng},
            travelMode: google.maps.TravelMode.DRIVING
        }, (result, status)=>{
            if (status === 'OK' && result) {
                setDirectionRoutePoints(result);
              } else {
                console.log('Error: ', status);
              }
        })
    }}
    
    const onLoad = React.useCallback(function callback(map: any) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        setMap(map)
    }, [])
    
      const onUnmount = React.useCallback(function callback(map: any) {
        setMap(null)
      }, [])

      const defaultIconUrl = 'https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi.png'; // Default marker icon URL
    
      return  (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onLoad={onLoad}
          onUnmount={onUnmount}
         
        >
        {source.lat && source.lng ? <MarkerF
            position={{lat: source.lat, lng: source.lng}} 
            icon={{
                url: defaultIconUrl,
                scaledSize: new google.maps.Size(20, 20)
            }}
        >
            <OverlayViewF
            position={{lat: source.lat, lng: source.lng}}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
                <div className='p-2 bg-white font-bold inline-block' >
                    <p className='text-black text-[16px]' >{source.label}</p>
                </div>

            </OverlayViewF>

        </MarkerF> : null}

        {destination.lat && destination.lng ? <MarkerF
            position={{lat: destination.lat, lng: destination.lng}} 
            icon={{
                url: defaultIconUrl,
                scaledSize: new google.maps.Size(20, 20)
            }}
        >
            <OverlayViewF
            position={{lat: destination.lat, lng: destination.lng}}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
                <div className='p-2 bg-white font-bold inline-block' >
                    <p className='text-black text-[16px]' >{destination.label}</p>
                </div>

            </OverlayViewF>
        </MarkerF> : null}
          {directionRoutePoints &&
          <DirectionsRenderer
          directions={directionRoutePoints}
          options={{
            polylineOptions: {
                strokeColor: '#000000',
                strokeWeight: 5
            },
            suppressMarkers: true
        }}
        />
    }
        </GoogleMap>
    )
}

export default MapSection