import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import Search from "../Search";
export default function Map() {
  const [location, setLocation] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMessage("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      setLocation(location);
    })();
  }, []);

  let loading = "Waiting...";
  if (errorMessage) {
    loading = errorMessage;
    return <Text>{loading}</Text>;
  } else if (location) {
    loading = JSON.stringify(location);
  }

  if (location !== null) {
    return (
      <View style={{ flex: 1}}>
        <MapView
          style={{ flex: 1 }}
          region={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0143,
            longitudeDelta: 0.0134,
          }}
          showsUserLocation
          loadingEnabled
        />
        <Search />
      </View>
    );
  } else {
    return <Text>{loading}</Text>;
  }
}
