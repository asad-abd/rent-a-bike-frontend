import React, { useState, useEffect } from "react";
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
  Modal,
} from "react-native";
import axios from "axios";
import COLORS from "../../consts/colors";
const { width } = Dimensions.get("screen");
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "react-native-vector-icons/AntDesign";
import { color } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import rideRates from "../../consts/rideRates";
import CustomTable from "../components/CustomTable";
import { BarCodeScanner } from "expo-barcode-scanner";
import GetLocation from "react-native-get-location";
import * as Location from "expo-location";

export default function RentBike() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [isFocus, setIsFocus] = useState(false);
  const [tripBooked, setTripBooked] = useState(false);
  const [bikeId, setBikeId] = useState(-1);
  const [modalVisible, setModalVisible] = useState(false);
  const [qrVisible, setQrVisible] = useState(false);
  // const [qrData, setQrData] = useState("");
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [availableBikes, setAvailableBikes] = useState([]);
  //location
  const [location, setLocation] = useState(null);
  const [locationErrorMsg, setLocationErrorMsg] = useState(null);

  // do this properly
  useEffect(() => {
    // camera permissions
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
    // location permissions
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setLocationErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
    // fetch loggedIn info from somewhere
    let res = axios
      .get("https://rent-a-bikee.herokuapp.com/show-avail-bikes")
      .then(function (response) {
        // handle success
        setAvailableBikes(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
        console.log("Finally called");
        // setAvailableBikes(response.data);
      });
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setQrVisible(false);
    handleBookBike(data);
    // alert(`Bar code with type ${type} and data ${qrData} has been scanned!`);
  };

  // if (hasPermission === null) {
  //   return <Text>Requesting for camera permission</Text>;
  // }
  // if (hasPermission === false) {
  //   return <Text>No access to camera</Text>;
  // }

  const showAvailableBikes = () => {
    let tableHead = ["Station", "No. of Bikes"];
    // let tableData = [
    //   ["Castle Ena", 7],
    //   ["Castle Dio", 8],
    //   ["Academic block", 5],
    // ];

    let tableData = [];
    availableBikes.forEach((station) => {
      let tableRow = [];
      tableRow.push(station.StationName);
      tableRow.push(station.count);
      tableData.push(tableRow);
    });
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={style.centeredView}>
          <View style={style.modalView}>
            {/* // show available bikes */}
            <View>
              <CustomTable head={tableHead} data={tableData} />
            </View>
            <Pressable
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? COLORS.grey : COLORS.dark,
                  marginTop: 30,
                },
                style.btn,
              ]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={{ color: "white", fontSize: 14, padding: 2 }}>
                Hide Bike Availability
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    );
  };
  const handleBookBike = (qrData) => {
    //event.preventDefault();
    if (
      qrData !== null &&
      Number.isInteger(Number(qrData)) &&
      Number(qrData) >= 0
    ) {
      axios
        .post("https://rent-a-bikee.herokuapp.com/book-bike", {
          bikeid: qrData,
          userid: 2,
        })
        .then(function (response) {
          if (response?.err) {
            Alert.alert("", "Booking Failed", [
              {
                text: response?.err,
                onPress: () => {
                  // setTripBooked(false);
                },
              },
            ]);
          } else {
            if (response.data === "Bike Not Available") {
              Alert.alert("", response.data, [
                {
                  text: "OK",
                  onPress: () => {},
                },
              ]);
            } else if (response.data === "User has already booked a bike") {
              Alert.alert("", response.data, [
                {
                  text: "OK",
                  onPress: () => {},
                },
              ]);
            } else {
              Alert.alert("", "Booking Confirmed", [
                {
                  text: "OK",
                  onPress: () => {},
                },
              ]);
              setBikeId(response.data.BikeId);
              setTripBooked(true);
            }
            console.log("bikeId " + response.data.BikeId);
          }
        })
        .catch(function (error) {
          if (error.response) {
            console.log(error.response.data);
          }
        });
    } else {
      Alert.alert("", "Please scan a proper bike QR", [
        {
          text: "OK",
          onPress: () => {},
        },
      ]);
    }
  };

  const handleFinishRide = async () => {
    console.log("handleFini shRide");
    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    if (locationErrorMsg === null) {
      console.log("Location ok");
      console.log(location["coords"]);
      axios
        .post("https://rent-a-bikee.herokuapp.com/end-trip", {
          lat: location["coords"]["latitude"],
          long: location["coords"]["longitude"],
          userid: 2,
        })
        .then(function (response) {
          if (response?.err) {
            Alert.alert("", "Failed to end the Ride", [
              {
                text: response?.err,
                onPress: () => {
                  // setTripBooked(false);
                },
              },
            ]);
          } else {
            if (response.data === "Trip Ended") {
              Alert.alert("", "Ride Ended", [
                {
                  text: "OK",
                  onPress: () => {
                    setTripBooked(false);
                  },
                },
              ]);
            } else {
              Alert.alert("", response.data, [
                {
                  text: "OK",
                  onPress: () => {},
                },
              ]);
            }
          }
        })
        .catch(function (error) {
          if (error.response) {
            // console.log(error.response.data);
          }
        });
    } else {
      Alert.alert(
        "",
        "Please give location permission to the app to finish the ride",
        [
          {
            text: "OK",
            onPress: () => {},
          },
        ]
      );
    }
  };
  // fetch bike data from backend api endpoint

  // show ride rates information

  const showRideRates = () => {
    let tableHead = ["Ride Duration", "Ride Rate"];
    let tableData = [];
    {
      rideRates.map((rate, index) =>
        tableData.push([rate.duration, rate.cost])
      );
      // rideRates.map((rate, index) => (
      //   <View key={index}>
      //     <View>
      //       <Text style={{ marginTop: 10, fontSize: 16 }}>
      //         {rate.duration} - {`\t`} {rate.cost}
      //       </Text>
      //     </View>
      //   </View>
      // ));
    }
    return (
      <View style={style.optionsCard2}>
        <Text
          style={{
            marginTop: 10,
            fontSize: 18,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Ride Rates
        </Text>
        <View>
          <CustomTable head={tableHead} data={tableData} />
        </View>
      </View>
    );
  };

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
        {!qrVisible ? (
          !tripBooked ? (
            // trip not yet booked
            <View style={{ flex: 1 }}>
              <View style={style.container}>
                <Pressable
                  style={({ pressed }) => [
                    {
                      backgroundColor: pressed ? COLORS.grey : COLORS.dark,
                      marginTop: 30,
                    },
                    style.btn,
                  ]}
                  onPress={() => setQrVisible(true)}
                >
                  <Text style={{ color: "white", fontSize: 16 }}>
                    Scan Bike QR
                  </Text>
                </Pressable>

                {showRideRates()}

                {/* show Available bikes */}
                <Pressable
                  style={({ pressed }) => [
                    {
                      backgroundColor: pressed ? COLORS.grey : COLORS.dark,
                      marginTop: 30,
                    },
                    style.btn,
                  ]}
                  onPress={() => setModalVisible(true)}
                >
                  <Text style={{ color: "white", fontSize: 16 }}>
                    Show Available Bikes
                  </Text>
                </Pressable>
                {showAvailableBikes()}
              </View>
            </View>
          ) : (
            // trip booked
            <View style={{ flex: 1 }}>
              <View style={style.container}>
                {/* fetch and show bike info  */}
                <View style={style.optionsCard2}>
                  <Text
                    style={{
                      marginTop: 10,
                      fontSize: 18,
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    Booking Information
                  </Text>
                  <CustomTable
                    head={["Cycle No.", "Password"]}
                    data={[[bikeId, "AdcfD"]]}
                  />
                </View>

                {showRideRates()}
                {/* display the lock bike and finish ride buttons */}
                <View style={style.container2}>
                  <Pressable
                    // onPress={() => Alert.alert(`You selected ${dropdownValue}`)}
                    onPress={() => handleFinishRide()}
                    style={({ pressed }) => [
                      {
                        backgroundColor: pressed ? COLORS.grey : COLORS.dark,
                        marginTop: 30,
                      },
                      style.btn2,
                    ]}
                  >
                    <Text style={{ color: "white" }}>
                      {/* send a location check request to backend. if near a station. ask again with popup */}
                      FINISH RIDE
                    </Text>
                  </Pressable>

                  <Pressable
                    // onPress={() => Alert.alert(`You selected ${dropdownValue}`)}
                    onPress={() => setTripBooked(false)}
                    style={({ pressed }) => [
                      {
                        backgroundColor: pressed ? COLORS.grey : COLORS.dark,
                        marginTop: 30,
                      },
                      style.btn2,
                    ]}
                  >
                    <Text style={{ color: "white" }}>LOCK BIKE</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          )
        ) : (
          // show QR
          <View style={style.qrContainer}>
            <View style={{ flex: 1, width: "100%" }}>
              <BarCodeScanner
                onBarCodeScanned={handleBarCodeScanned}
                style={[
                  StyleSheet.absoluteFillObject,
                  { width: "100%", borderWidth: 20 },
                ]}
              />
            </View>
            <View>
              <Pressable
                style={({ pressed }) => [
                  style.btn,
                  {
                    backgroundColor: pressed ? COLORS.grey : COLORS.dark,
                    marginTop: 5,
                    width: "40%",
                    alignSelf: "center",
                  },
                ]}
                onPress={() => setQrVisible(false)}
              >
                <Text style={{ color: "white", fontSize: 16 }}>Back</Text>
              </Pressable>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

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
  btn2: {
    height: 40,
    width: "47%",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
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
  qrContainer: {
    height: "100%",
    width: "100%",
    flexDirection: "column",
    padding: 5,
    borderBottomColor: COLORS.grey,
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
  modalView: {
    margin: 10,
    width: "80%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  facility: { flexDirection: "row", marginRight: 15 },
  facilityText: { marginLeft: 5, color: COLORS.grey },
});
