import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';

export default function Map() {

  const [location, setLocation] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect( () => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if(status !== 'granted'){
        setErrorMessage('Permission to access location was denied');
        return;
      }


    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);

    })();
  }, []);

  let loading = 'Waiting...';
  if(errorMessage){
    loading = errorMessage;
    return(
      <Text>{loading}</Text>
    );
  }else if(location){
    loading = JSON.stringify(location);
  }


   if(location !== null){
     return (
       <View style={styles.container}>
         <MapView
           style={{flex: 1}}
           region={{
             latitude: location.coords.latitude,
             longitude: location.coords.longitude,
             latitudeDelta: 0.0143,
             longitudeDelta: 0.0134,
           }}
           showsUserLocation
           loadingEnabled
         />
       </View>
     )
   }else{
     return(
       <Text>{loading}</Text>
     )
   }


}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
