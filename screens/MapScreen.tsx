import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker} from "react-native-maps";
import * as Location from 'expo-location';


type coordsObj = {
    latitude: number,
    longitude: number
}

const MapScreen = () => {
    const [region, setRegion] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    const [location, setLocation] = useState<coordsObj | null>(null);

    useEffect(() => {
        if (location) {
            setRegion({
                ...location,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            });
        }
    }, [location]);

    useEffect(() => {
        (async () => {
          
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            return;
          }
    
          let location = await Location.getCurrentPositionAsync({});
          const coords = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
          }
          setLocation(coords)
        } )();
      }, []);

  return (
    <View style={styles.container}>
        
      <MapView
        style={styles.mapStyle}
        region={region}
        showsUserLocation={true}
        mapType="standard"
        cameraZoomRange={{
            maxCenterCoordinateDistance: 20, 
            minCenterCoordinateDistance: 100
        }}
        onMapReady={() => console.log("Map is ready")}
        onRegionChangeComplete={(newRegion) => setRegion(newRegion)} 
      >
        {location !== null &&  <Marker
          title="I am here"
          coordinate={location}
          description='Hello'
        />}
       
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default MapScreen;