import React from "react";
import MapViewDirections from "react-native-maps-directions";

const Directions: React.FC = ({ origin, destination,onReady  }) => {
  return (
    <MapViewDirections
      origin={origin}
      destination={destination.destination}
      onReady={onReady}
      apikey={process.env.GOOGLE_PLACES_API_KEY}
      strokeWidth={3}
      strokeColor="#222"
    />
  );
};

export default Directions;
