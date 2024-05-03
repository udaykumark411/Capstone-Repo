import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography } from '@mui/material';

function MapModal({ open, onClose, userLocation, seller }) {
  const [map, setMap] = useState(null);
  const [yelpReviews, setYelpReviews] = useState([]);


  useEffect(() => {
    if (open) {
      const timeout = setTimeout(() => {
        initializeMap();
        fetchYelpReviews("worcester");
      }, 100);
      return () => clearTimeout(timeout);
    }
    //eslint-disable-next-line
  }, [open]);

  const initializeMap = () => {
    if (typeof google === 'undefined') {
      return;
    }
    console.log(userLocation);
    const mapCenter = { lat: userLocation.latitude, lng: userLocation.longitude };
    const mapElement = document.getElementById('google-map');
    if (!mapElement) {
      return;
    }

    const mapOptions = {
      center: mapCenter,
      zoom: 13,
    };
    const newMap = new window.google.maps.Map(mapElement, mapOptions);
    setMap(newMap);

    // Add marker for user's current location
    new window.google.maps.Marker({
      position: mapCenter,
      map: newMap,
      title: "Your Location",
    });

    // Add marker for specified coordinates
    const targetLocation = { lat: 42.2478128, lng: -71.8329502 };
    new window.google.maps.Marker({
      position: targetLocation,
      map: newMap,
      title: seller,
    });
  };
  const fetchYelpReviews = async (location) => {
    try {
    //   const response = await fetch(`/yelp-reviews/${location}`);
    //   if (!response.ok) {
    //     throw new Error('Failed to fetch Yelp reviews');
    //   }
      fetch(`/yelp-reviews/${location}`).then((res) => { return res.json() }).then((data) => {console.log(data)});
    } catch (error) {
      console.error('Error fetching Yelp reviews:', error);
    }
  };
//   fetchYelpReviews();
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 800, height: 600, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
        <Typography variant="h6" component="h2" gutterBottom>
          Map with Markers
        </Typography>
        <div id="google-map" style={{ width: '100%', height: '500px' }}></div>
      </Box>
    
    </Modal>
  );
}

export default MapModal;
