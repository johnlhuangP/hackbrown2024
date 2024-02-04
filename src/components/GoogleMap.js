// GoogleMap.js
import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios';

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 41.8240, // Replace with your default latitude
  lng: -71.418884, // Replace with your default longitude
};

const GoogleMapComponent = ({ placeId }) => {
  const [place, setPlace] = useState(null);

  useEffect(() => {
    if (placeId) {
      // Fetch place details using the Google Places API
      axios.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=photos&key=AIzaSyDvrL9KnfVPESP5nB4ME1Dn3ka_hbGt9-g`)
        .then(response => {
          const photoReference = response.data.result.photos[0].photo_reference;
          setPlace({ photoReference });
        })
        .catch(error => {
          console.error('Error fetching place details:', error);
        });
    }
  }, [placeId]);

  return (
    <LoadScript googleMapsApiKey="AIzaSyDvrL9KnfVPESP5nB4ME1Dn3ka_hbGt9-g">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={14}
      >
        {place && (
          <Marker
            position={center}
            icon={{
              url: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photoReference}&key=AIzaSyDvrL9KnfVPESP5nB4ME1Dn3ka_hbGt9-g`,
              scaledSize: new window.google.maps.Size(40, 40),
            }}
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapComponent;
