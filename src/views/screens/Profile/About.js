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
} from "react-native";
import COLORS from "../../../consts/colors";
const { width } = Dimensions.get("screen");
import { color } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import { useNavigation } from "@react-navigation/native";

export default function About() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          backgroundColor: COLORS.white,
          flex: 1,
          marginTop: 1,
          padding: 1,
          justifyContent: "flex-start",
          alignContent: "center",
        }}
      >
        {/* <Pressable
          onPress={() => navigation.navigate("Profile")}
          style={({ pressed }) => [
            style.backBtn,
            {
              backgroundColor: pressed ? COLORS.grey : COLORS.dark,
              marginTop: 1,
              paddingLeft: 1,
            },
          ]}
        >
          <Text style={{ color: "white", fontSize: 14 }}>BACK</Text>
        </Pressable> */}

        <View style={style.container}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>About</Text>

          <Text style={{ fontSize: 18 }}>
            Rent a Bike app is a part of course work for the course CS559:
            Computer System Design.
          </Text>

          <Text style={{ fontSize: 18 }}>
            Rent a Bike app is a part of course work for the course CS559:
            Computer System Design.
          </Text>
        </View>
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
  backBtn: {
    height: 40,
    width: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    padding: 20,
    backgroundColor: "white",
    borderRadius: 5,
    marginTop: 10,
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
