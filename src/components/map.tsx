'use client';

import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { Skeleton } from './ui/skeleton';

const containerStyle = {
  width: '100%',
  height: '100%',
};

// Nairobi coordinates
const center = {
  lat: -1.2921,
  lng: 36.8219,
};

export function Map() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  });

  if (!isLoaded) return <Skeleton className="w-full h-full" />;

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13} options={{disableDefaultUI: true}}>
      {/* You can add markers or other map components here */}
      <Marker position={center} />
    </GoogleMap>
  );
}
