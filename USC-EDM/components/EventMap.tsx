import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { MapPin } from 'lucide-react-native';

interface EventMapProps {
  latitude: number;
  longitude: number;
  title: string;
}

export default function EventMap({ latitude, longitude, title }: EventMapProps) {
  const initialRegion = {
    latitude,
    longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={Platform.OS === 'ios' ? undefined : PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={initialRegion}
        mapType="standard"
      >
        <Marker coordinate={{ latitude, longitude }} title={title}>
          <View style={styles.customMarker}>
            <MapPin size={24} color="#B81D24" />
          </View>
        </Marker>
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
  },
  map: {
    height: '100%',
    width: '100%',
  },
  customMarker: {
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#B81D24',
  },
});