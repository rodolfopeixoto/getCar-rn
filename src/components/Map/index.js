import React, { useState, useEffect, useRef } from "react";
import { View, Text, Dimensions, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import Search from "../Search";
import Directions from "../Directions";
import { getPixcelSize } from "../../utils";
import markerImage from "../../assets/marker.png";
import backImage from "../../assets/back.png";
import {
  LocationText,
  LocationBox,
  LocationTimeBox,
  LocationTimeText,
  LocationTimeTextSmall,
  Back,
} from "./styles";
import Geocoder from "react-native-geocoding";
import Details from "../Details";

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
export default function Map() {
  const [location, setLocation] = useState(null);
  const [destination, setDestination] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [timeRoute, setTimeRoute] = useState(0);
  const [currentAddress, setCurrentAddress] = useState("");
  const mapViewRef = useRef(null);

  Geocoder.init(process.env.GOOGLE_PLACES_API_KEY);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMessage("Permission to access location was denied");
        return;
      }

      const postionAsync = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const { coords } = postionAsync;
      const { latitude, longitude } = coords;

      const response = await Geocoder.from({ latitude, longitude });
      const address = response.results[0].formatted_address;
      const locationAddress = address.substring(0, address.indexOf(","));

      setCurrentAddress(locationAddress);

      setLocation({
        latitude,
        longitude,
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

  handleMapZoomAndTimeRoute = ({ duration, coordinates }) => {
    mapViewRef.current.fitToCoordinates(coordinates, {
      edgePadding: {
        right: getPixcelSize(50),
        left: getPixcelSize(50),
        top: getPixcelSize(50),
        bottom: getPixcelSize(350),
      },
    });

    // setTimeRoute(duration)
  };

  handleBack = () => {
    setDestination(null);
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
                onReady={handleMapZoomAndTimeRoute}
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

              <Marker
                coordinate={{
                  latitude: location.latitude,
                  longitude: location.longitude,
                }}
                anchor={{ x: 0, y: 0 }}
              >
                <LocationBox>
                  <LocationTimeBox>
                    <LocationTimeText>{Math.floor(timeRoute)}</LocationTimeText>
                    <LocationTimeTextSmall>MIN</LocationTimeTextSmall>
                  </LocationTimeBox>

                  <LocationText>{currentAddress}</LocationText>
                </LocationBox>
              </Marker>
            </>
          )}
        </MapView>

        {destination ? (
          <>
            <Back onPress={handleBack}>
              <Image source={backImage} />
            </Back>
            <Details />
          </>
        ) : (
          <Search onLocationSelected={handleLocationSelected} />
        )}
      </View>
    );
  } else {
    return <Text>{loading}</Text>;
  }
}
