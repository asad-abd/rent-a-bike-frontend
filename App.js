import "react-native-gesture-handler";
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./src/views/screens/HomeScreen";
import RideHistory from "./src/views/screens/RideHistory";
import RentBike from "./src/views/screens/RentBike";
import Profile from "./src/views/screens/Profile";
import Login from "./src/views/screens/Login";
import { StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import COLORS from "./src/consts/colors";
import { UserAuth } from "./src/views/components/Auth";
import InternetConnectionAlert from "react-native-internet-connection-alert";
import { AuthContextProvider } from "./src/globalStates/auth-context";
import { useAuth } from "./src/globalStates/auth-context";

const Stack = createNativeStackNavigator();

const BottomStack = createBottomTabNavigator();

function BottomTab() {
  return (
    <BottomStack.Navigator
      tabBarOptions={{
        activeTintColor: COLORS.dark,
        inactiveTintColor: COLORS.grey,
      }}
      screenOptions={{
        activeTintColor: COLORS.dark,
        inactiveTintColor: COLORS.grey,
      }}
    >
      <BottomStack.Screen
        name="Rent Bike"
        component={RentBike}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bike" color={color} size={size} />
          ),
        }}
      />

      <BottomStack.Screen
        name="Ride History"
        component={RideHistory}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="timetable"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <BottomStack.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </BottomStack.Navigator>
  );
}
function MainStack() {
  // const [auth, setAuth] = useState({ user: null });
  const [auth, setAuth] = useState({ loggedIn: false });
  //useEffect(() => {}, []);
  return (
    <InternetConnectionAlert
      onChange={(connectionState) => {
        console.log("Connection State: ", connectionState);
      }}
    >
      <AuthContextProvider value={[auth, setAuth]}>
        <NavigationContainer>
          {auth["loggedIn"] ? (
            <Stack.Navigator
              initialRouteName="BottomTab"
              mode="modal"
              headerMode="none"
              screenOptions={{ headerShown: false }}
            >
              <Stack.Screen name="OnBoardScreen" component={BottomTab} />
              <Stack.Screen name="HomeScreen" component={HomeScreen} />
            </Stack.Navigator>
          ) : (
            <Login />
          )}
        </NavigationContainer>
      </AuthContextProvider>
    </InternetConnectionAlert>
  );
}
export default function App() {
  return <MainStack />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
