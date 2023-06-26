import React, { useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  SafeAreaView,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import flowers from "../consts/flowers";
import COLORS from "../consts/colors";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Detail = ({ navigation, route }) => {
  const setFlowersToAsyncStorage = async (flowers) => {
    try {
      await AsyncStorage.setItem("flowers", JSON.stringify(flowers));
    } catch (e) {}
  };

  const updateFlowerLike = (oldFlowersList, index, liked) => {
    let newFlowersList = oldFlowersList;
    // console.log(index);
    // console.log(liked);
    // console.log(newFlowersList[index]);
    newFlowersList[index].like = liked;
    // setFlowers(newFlowersList);
    setFlowersToAsyncStorage(newFlowersList);
  };

  const { flower, flowersList } = route.params;
  const [like, setLike] = useState(flower.like);
  console.log(flower);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}
    >
      <View style={styles.header}>
        <Ionicons
          name="arrow-back-outline"
          size={28}
          color="black"
          onPress={() => navigation.goBack()}
        />
        <Ionicons
          name="home"
          size={28}
          color="black"
          onPress={() => navigation.navigate("List")}
        />
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={flower.image}
          style={{ resizeMode: "contain", flex: 1 }}
        />
      </View>
      <View style={styles.detailsContainer}>
        <View
          style={{
            // marginLeft: 20,
            // marginTop: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              marginLeft: 20,
              flexDirection: "row",
              alignItems: "flex-end",
            }}
          >
            <View style={styles.line} />
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              Best choice
            </Text>
          </View>
          <View
            style={{
              width: 30,
              height: 30,
              marginRight: 10,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: like
                ? "rgba(245, 42, 42,0.2)"
                : "rgba(0,0,0,0.2) ",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setLike(!like);
                // console.log(flower);
                flower.like = !flower.like;
                let flower1 = flowersList.find(
                  (item, index) => item.id === flower.id
                );
                let index = flowersList.indexOf(flower1);
                console.log(index);
                updateFlowerLike(flowersList, index, flower.like);
              }}
            >
              <Ionicons
                name="heart"
                size={18}
                color={like ? COLORS.red : COLORS.black}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            marginLeft: 20,
            marginTop: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 22, fontWeight: "bold" }}>
            {flower.name}
          </Text>
          <View style={styles.priceTag}>
            <Text
              style={{
                marginLeft: 15,
                color: COLORS.white,
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              ORCHID
            </Text>
          </View>
        </View>
        <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>About</Text>
          <Text
            style={{
              color: "grey",
              fontSize: 16,
              lineHeight: 22,
              marginTop: 10,
            }}
          >
            {flower.about}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Detail;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  imageContainer: {
    flex: 0.45,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  detailsContainer: {
    flex: 0.55,
    backgroundColor: COLORS.light,
    marginHorizontal: 7,
    marginBottom: 7,
    borderRadius: 20,
    marginTop: 30,
    paddingTop: 30,
  },
  line: {
    width: 25,
    height: 2,
    backgroundColor: COLORS.dark,
    marginBottom: 5,
    marginRight: 3,
  },
  priceTag: {
    backgroundColor: COLORS.green,
    width: 80,
    height: 40,
    justifyContent: "center",
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
  },
});
