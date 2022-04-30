import { React, useEffect, useState } from "react";
import {
  TouchableOpacity,
  KeyboardAvoidingView,
  View,
  SafeAreaView,
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
const { width } = Dimensions.get("screen");
import COLORS from "../../consts/colors";

const UserAuth = ({ navigation }) => {
  const [authStep, setAuthStep] = useState(0);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [moveScreen, setMoveScreen] = useState(false);

  login = async () => {
    let email = { email };
    let pass = { pass };
    if (email != "" && pass != "") {
      try {
        let user = await auth.signInWithEmailAndPassword(email, pass); //('test@user.com','password');
      } catch (error) {
        console.log(error);
        alert(error);
      }
    } else {
      alert("email or password is empty.");
    }
  };

  createUserObj = (userObj, email) => {
    //assign different parameters for the user, like avatar etc
    console.log(userObj, email, userObj.uid);
    let avatar =
      "https://robohash.org/" + String(Math.floor(Math.random() * 500));
    let uObj = {
      name: "Enter name",
      username: "@name",
      avatar: avatar,
      email: email,
    };
    database.ref("users").child(userObj.uid).set(uObj);
  };

  signup = async () => {
    let email = { email };
    let pass = { pass };
    if (email != "" && pass != "") {
      try {
        let user = await auth
          .createUserWithEmailAndPassword(email, pass)
          .then((userObj) => this.createUserObj(userObj.user, email))
          .catch((error) => alert(error));
      } catch (error) {
        console.log(error);
        alert(error);
      }
    } else {
      alert("email or password is empty.");
    }
  };

  useEffect(() => {
    if (moveScreen == true) {
      setMoveScreen(true);
    }
  }, []);
  // componentDidMount = () => {
  //   if (this.props.moveScreen == true) {
  //     this.setState({ moveScreen: true });
  //   }
  // };

  showLogin = () => {
    setAuthStep(1);
    if (moveScreen == true) {
      this.props.navigation.navigate("Ride History");
      return false;
    }
  };

  showSignup = () => {
    if (this.state.moveScreen == true) {
      this.props.navigation.navigate("Ride History");
      return false;
    }
    setAuthStep(2);
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontWeight: "bold", color: COLORS.dark, fontSize: 16 }}>
        You are not logged in
      </Text>
      <Text
        style={{
          color: COLORS.dark,
          fontSize: 14,
          textAlign: "center",
          padding: 2,
        }}
      >
        {this.props.message}
      </Text>
      {this.state.authStep == 0 ? (
        <View style={{ marginVertical: 20, flexDirection: "row" }}>
          <TouchableOpacity onPress={() => showLogin()}>
            <Text
              style={{
                fontWeight: "bold",
                color: "white",
                backgroundColor: COLORS.blue,
                alignSelf: "flex-start",
                padding: 5,
                paddingHorizontal: width / 7,
                borderRadius: 5,
              }}
            >
              SIGN IN
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => showSignup()}>
            <Text
              style={{
                fontWeight: "bold",
                color: "white",
                backgroundColor: COLORS.blue,
                alignSelf: "flex-start",
                padding: 5,
                paddingHorizontal: width / 7,
                borderRadius: 5,
              }}
            >
              SIGN UP
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ marginVertical: 20 }}>
          {{ authStep } == 1 ? (
            //Login
            <View>
              <TouchableOpacity
                onPress={() => setAuthStep(0)}
                style={{
                  borderBottomWidth: 1,
                  paddingVertical: 5,
                  marginBottom: 10,
                  borderBottomColor: "black",
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    color: "white",
                    backgroundColor: COLORS.dark,
                    alignSelf: "flex-start",
                    padding: 5,
                    paddingHorizontal: 8,
                    borderRadius: 5,
                  }}
                >
                  Back
                </Text>
              </TouchableOpacity>
              <Text style={{ fontWeight: "bold", marginBottom: 20 }}>
                Login
              </Text>
              <Text style={{ fontWeight: "bold" }}>Email Address: </Text>
              <TextInput
                keyboardType={"email-address"}
                editable={true}
                placeholder={"enter your email address."}
                onChangeText={(text) => setEmail(text)}
                value={email}
                style={{
                  width: 250,
                  marginVertical: 10,
                  padding: 5,
                  borderWidth: 1,
                  borderColor: "grey",
                  borderRadius: 3,
                }}
              />

              <Text style={{ fontWeight: "bold" }}>Password: </Text>
              <TextInput
                secureTextEntry={true}
                editable={true}
                placeholder={"enter your password."}
                onChangeText={(text) => setPass(text)}
                value={pass}
                style={{
                  width: 250,
                  marginVertical: 10,
                  padding: 5,
                  borderWidth: 1,
                  borderColor: "grey",
                  borderRadius: 3,
                }}
              />
              <TouchableOpacity
                onPress={() => this.login()}
                style={{
                  backgroundColor: COLORS.blue,
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  borderRadius: 5,
                }}
              >
                <Text style={{ color: "white" }}>Login</Text>
              </TouchableOpacity>
            </View>
          ) : (
            //Sign up
            <View>
              <TouchableOpacity
                onPress={() => setAuthStep(0)}
                style={{
                  borderBottomWidth: 1,
                  paddingVertical: 5,
                  marginBottom: 10,
                  borderBottomColor: "black",
                }}
              >
                <Text style={{ fontWeight: "bold" }}>🔙 Cancel </Text>
              </TouchableOpacity>
              <Text style={{ fontWeight: "bold", marginBottom: 20 }}>
                Sign Up
              </Text>
              <Text>Email Address: </Text>
              <TextInput
                keyboardType={"email-address"}
                editable={true}
                placeholder={"enter your email address."}
                onChangeText={(text) => setEmail(text)}
                value={email}
                style={{
                  width: 250,
                  marginVertical: 10,
                  padding: 5,
                  borderWidth: 1,
                  borderColor: "grey",
                  borderRadius: 3,
                }}
              />

              <Text>Password: </Text>
              <TextInput
                secureTextEntry={true}
                editable={true}
                placeholder={"enter your password."}
                onChangeText={(text) => setPass(text)}
                value={pass}
                style={{
                  width: 250,
                  marginVertical: 10,
                  padding: 5,
                  borderWidth: 1,
                  borderColor: "grey",
                  borderRadius: 3,
                }}
              />
              <TouchableOpacity
                onPress={() => this.signup()}
                style={{
                  backgroundColor: "blue",
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  borderRadius: 5,
                }}
              >
                <Text style={{ color: "white" }}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default UserAuth;
