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
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
const { width } = Dimensions.get("screen");
import COLORS from "../../consts/colors";
import * as Permissions from "expo-permissions";
import GoogleLogin from "react-google-login";
import LoginScreen from "react-native-login-screen";
import { useAuth } from "../../globalStates/auth-context.js";

const Login = ({ navigation }) => {
  const [auth, setAuth] = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  console.log("login auth");
  console.log(auth);

  useEffect(() => {}, []);

  // console.log(isLoading);
  // if (isLoading) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  //       <ActivityIndicator size="large" />
  //     </View>
  //   );
  // }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          backgroundColor: COLORS.white,
          flex: 1,
          justifyContent: "center",
        }}
      >
        <LoginScreen
          logoImageSource={require("../../assets/IITbh.png")}
          onLoginPress={() => {
            setAuth({ loggedIn: true });
          }}
          onHaveAccountPress={() => {}}
          onEmailChange={(email) => {}}
          onPasswordChange={(password) => {}}
          disableSocialButtons
          haveAccountText="Please enter your IIT Bhilai LDAP email and password"
          loginButtonStyle={style.btn}
          style={{
            backgroundColor: COLORS.white,
            flex: 1,
            margin: 5,
            padding: 5,
            justifyContent: "center",
          }}
        />
      </View>
    </SafeAreaView>
  );
};

//------

//--

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
    backgroundColor: COLORS.dark,
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
  card: {
    height: 250,
    backgroundColor: COLORS.white,
    elevation: 10,
    width: width - 40,
    marginRight: 20,
    padding: 15,
    borderRadius: 20,
  },
  cardImage: {
    width: "100%",
    height: 120,
    borderRadius: 15,
  },
  facility: { flexDirection: "row", marginRight: 15 },
  facilityText: { marginLeft: 5, color: COLORS.grey },
});
export default Login;
