import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView } from 'react-native';
import Map from './src/components/Map';

export default function App() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Map />
    </SafeAreaView>
  );
}
