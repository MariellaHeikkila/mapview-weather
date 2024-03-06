import { Dimensions, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import { useState, useEffect } from 'react';

export default function App() {

  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      try {
        if (status !== 'granted') {
        setIsLoading(false)
        alert('Geolocation failed');
        return;
      }

      const location = await Location.getLastKnownPositionAsync({
        accuracy: Location.Accuracy.High
      });
      setLatitude(location.coords.latitude)
      setLongitude(location.coords.longitude)
      setIsLoading(false)
    } catch (error) {
      alert('whot' + error)
      setIsLoading(false)
    }
  })();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Retrieving location.</Text>        
      </View>
    );
  } else {
  return (
    <View style={styles.container}>
      <MapView
      style={styles.map}
      initialRegion={{
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.0421 ,
        longitudeDelta: 0.0922 ,      
      }}
      >
      <Marker
      title='testing'
      coordinate={{latitude: latitude, longitude: longitude}}
      />
      </MapView>
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - Constants.statusBarHeight,
  }
});
