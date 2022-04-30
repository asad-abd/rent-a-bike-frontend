import { React, useEffect, useState } from "react";
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
} from "react-native";
import { f, auth, database, storage } from "../../../config/config.js";
import Icon from "react-native-vector-icons/MaterialIcons";
const { width } = Dimensions.get("screen");
import COLORS from "../../consts/colors";
import * as Permissions from "expo-permissions";
import CustomTable from "../components/CustomTable";
import LoginScreen from "react-native-login-screen";
import { useAuth } from "../../globalStates/auth-context.js";
//import UserAuth from "../components/Auth.js";
//import Auth from "../components/freeAuth.js";

const RideHistoryItem = ({ data }) => {
  const { startTime, endTime, startLocation, endLocation, i, cost } = data;
  return (
    <View style={style.optionsCard2}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginVertical: 5,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          Ride {i}
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          Rs {cost}
        </Text>
      </View>
      <View>
        <Text style={{ fontSize: 16 }}>
          Started {startTime} at {startLocation}
        </Text>
        <Text style={{ fontSize: 16 }}>
          Ended {endTime} at {endLocation}
        </Text>
      </View>
    </View>
  );
};

const RideHistory = ({ navigation }) => {
  const [auth, setAuth] = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  console.log(auth);
  const [loggedIn, setLoggedIn] = useState(false);
  const [rideHistoryData, setRideHistoryData] = useState([]);
  useEffect(() => {
    // fetch data using axios
    setRideHistoryData([
      {
        startTime: "16:05",
        endTime: "16:47",
        startLocation: "Ena",
        endLocation: "Dio",
        i: 1,
        cost: 50,
      },
    ]);
    setTimeout(() => {
      // just for testing state changefalse
      setLoggedIn(false);
    }, 1000);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          backgroundColor: COLORS.white,
          flex: 1,
          marginTop: 1,
          padding: 5,
          justifyContent: "center",
        }}
      >
        <ScrollView>
          <View style={{ flex: 1 }}>
            <View style={style.container}>
              {rideHistoryData.map((data, i) => (
                <RideHistoryItem key={i} data={data} />
              ))}

              {/* {RideHistoryItem("18:15", "19:01", "Dio", "Acad", 2)}
              {RideHistoryItem("18:15", "19:01", "Dio", "Acad", 2)}
              {RideHistoryItem("18:15", "19:01", "Dio", "Acad", 2)}
              {RideHistoryItem("18:15", "19:01", "Dio", "Acad", 2)}
              {RideHistoryItem("18:15", "19:01", "Dio", "Acad", 2)} */}
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  profileImage: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  searchInputContainer: {
    height: 50,
    backgroundColor: COLORS.light,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  btn: {
    height: 40,
    width: "100%",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  sortBtn: {
    backgroundColor: COLORS.dark,
    height: 50,
    width: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  optionsCard: {
    height: 210,
    width: width / 2 - 30,
    elevation: 15,
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 20,
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  optionsCard2: {
    elevation: 15,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 10,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  optionsCardImage: {
    height: 140,
    borderRadius: 10,
    width: "100%",
  },
  optionListsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    paddingHorizontal: 20,
  },
  categoryListText: {
    fontSize: 16,
    fontWeight: "bold",
    paddingBottom: 5,
    color: COLORS.grey,
  },

  activeCategoryListText: {
    color: COLORS.dark,
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  categoryListContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40,
    paddingHorizontal: 40,
  },
  container: {
    flexDirection: "column",
    justifyContent: "center",
    marginTop: 5,
    padding: 10,
  },
  container2: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 5,
    padding: 10,
  },
  dropdown: {
    marginTop: 5,
    height: 50,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  facility: { flexDirection: "row", marginRight: 15 },
  facilityText: { marginLeft: 5, color: COLORS.grey },
});

export default RideHistory;
