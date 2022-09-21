import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  Text,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useState } from "react";

export default function App() {
  const [address, setAddress] = useState("");
  const [cordinates, setCordinates] = useState({
    lat: 60.201373,
    lng: 24.934041,
  });

  const searchCordinates = () => {
    let input = address.replace(" ");
    fetch(
      `http://www.mapquestapi.com/geocoding/v1/address?key=d8Chjsag9iS3ZraGY1kS0NXBzmdvwoOV&location=` +
        input
    )
      .then((response) => response.json())
      .then((data) => {
        setCordinates({
          lat: data.results[0].locations[0].displayLatLng.lat,
          lng: data.results[0].locations[0].displayLatLng.lng,
        });
      })
      .catch((error) => {
        Alert.alert("Well it is not working at the moment.");
      });
  };

  return (
    <View style={styles.container}>
      <MapView
        style={{ flex: 1, width: "100%" }}
        region={{
          latitude: cordinates.lat,
          longitude: cordinates.lng,
          latitudeDelta: 0.0322,
          longitudeDelta: 0.0221,
        }}
      >
        <Marker
          coordinate={{
            latitude: cordinates.lat,
            longitude: cordinates.lng,
          }}
        />
      </MapView>
      <View style={styles.TextInput}>
        <TextInput
          onChangeText={(address) => setAddress(address)}
          value={address}
          placeholder="Search here"
        ></TextInput>
      </View>
      <TouchableOpacity style={styles.Button} onPress={searchCordinates}>
        <Text>Search</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  TextInput: {
    borderWidth: 2,
    borderColor: "gray",
    width: "97%",
    margin: 5,
  },

  Button: {
    height: 30,
    width: 600,
    alignItems: "center",
    marginHorizontal: 5,
    borderRadius: 3,
    justifyContent: "center",
    backgroundColor: "gray",
    borderWidth: 1,
  },
});
