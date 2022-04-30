// react native screen template
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  SafeAreaView,
  View,
  StatusBar,
  Text,
  TextInput,
  FlatList,
  Dimensions,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
  Button,
  Alert,
} from "react-native";
import COLORS from "../../consts/colors";
const { width } = Dimensions.get("screen");
import { color } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import ProfileList from "./Profile/ProfileList";
import About from "./Profile/About";
import Complain from "./Profile/Complain";
import UserInformation from "./Profile/UserInformation";

const Stack = createNativeStackNavigator();

export default function Profile() {
  const [tripBooked, setTripBooked] = useState(false);

  return (
    <Stack.Navigator
      initialRouteName="Profile"
      mode="modal"
      headerMode="none"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Profile" component={ProfileList} />
      <Stack.Screen name="About" component={About} />
      <Stack.Screen name="Complain" component={Complain} />
      <Stack.Screen name="User Information" component={UserInformation} />
    </Stack.Navigator>
  );
}
