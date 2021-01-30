import React, { useState, useEffect, useRef } from "react";
import { View, Text, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import Search from "../Search";
import Directions from "../Directions";
import { getPixcelSize } from "../../utils";
import markerImage from "../../assets/marker.png";
import { LocationText, LocationBox } from "./styles";

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
export default function Map() {
  const [location, setLocation] = useState(null);
  const [destination, setDestination] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const mapViewRef = useRef(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMessage("Permission to access location was denied");
        return;
      }

      let postionAsync = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      setLocation({
        latitude: postionAsync.coords.latitude,
        longitude: postionAsync.coords.longitude,
      });
    })();
  }, []);

  handleLocationSelected = (data, { geometry }) => {
    const {
      location: { lat: latitude, lng: longitude },
    } = geometry;

    setDestination({
      destination: {
        latitude,
        longitude,
        title: data.structured_formatting.main_text,
      },
    });
  };

  let loading = "Waiting...";
  if (errorMessage) {
    loading = errorMessage;
    return <Text>{loading}</Text>;
  } else if (location) {
    loading = JSON.stringify(location);
  }

  if (location !== null) {
    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          region={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0143,
            longitudeDelta: 0.0134,
          }}
          showsUserLocation
          loadingEnabled
          ref={mapViewRef}
        >
          {destination && (
            <>
              <Directions
                origin={location}
                destination={destination}
                onReady={(result) => {
                  mapViewRef.current.fitToCoordinates(result.coordinates, {
                    edgePadding: {
                      right: getPixcelSize(50),
                      left: getPixcelSize(50),
                      top: getPixcelSize(50),
                      bottom: getPixcelSize(50),
                    },
                  });
                }}
              />

              <Marker
                coordinate={{
                  latitude: destination.destination.latitude,
                  longitude: destination.destination.longitude,
                }}
                anchor={{ x: 0, y: 0 }}
                image={markerImage}
              >
               <LocationBox>
                 <LocationText>{destination.destination.title}</LocationText>
               </LocationBox>
              </Marker>
            </>
          )}
        </MapView>
        <Search onLocationSelected={handleLocationSelected} />
      </View>
    );
  } else {
    return <Text>{loading}</Text>;
  }
}
