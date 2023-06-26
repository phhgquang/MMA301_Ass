import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Image,
  Alert,
} from "react-native";
import COLORS from "../consts/colors";
import flowers from "../consts/flowers";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

const width = Dimensions.get("window").width / 2 - 30;

const ListItem = ({ navigation }) => {
  const categories = ["POPULAR", "PINK", "WHITE", "PURPLE"];
  const [flowersList, setFlowers] = useState([]);
  const [catergory, setCategory] = useState("POPULAR");
  const [listwcat, setListwcat] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    (async () => {
      try {
        await AsyncStorage.setItem("flowers", JSON.stringify(flowers));
      } catch (e) {}
    })();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      // const setFlower = async () => {
      //   try {
      //     await AsyncStorage.setItem("flowers", JSON.stringify(flowers));
      //   } catch (e) {}
      // };
      const getFlower = async () => {
        try {
          const flowersAsync = await AsyncStorage.getItem("flowers");
          setFlowers(flowersAsync == null ? flowers : JSON.parse(flowersAsync));
          setListwcat(
            flowersAsync == null ? flowers : JSON.parse(flowersAsync)
          );
          console.log(flowersAsync);
        } catch (e) {}
      };
      // setFlower();
      getFlower();
      setCategory("POPULAR");
      setSearch("");
      return () => {
        setFlowers([]);
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );

  const getPopular = async () => {
    try {
      const flowersAsync = await AsyncStorage.getItem("flowers");
      setFlowers(flowersAsync == null ? flowers : JSON.parse(flowersAsync));
      setListwcat(flowersAsync == null ? flowers : JSON.parse(flowersAsync));
      console.log(flowersAsync);
    } catch (e) {}
  };

  const getCategory = async (catergory) => {
    try {
      const flowersAsync = await AsyncStorage.getItem("flowers");
      console.log(JSON.parse(flowersAsync));
      let filterList = JSON.parse(flowersAsync).filter((flower) => {
        console.log("flower cat: " + flower.name);
        return flower.category == catergory;
      });
      setFlowers(filterList == null ? [] : filterList);
      setListwcat(flowersAsync == null ? flowers : JSON.parse(flowersAsync));
      console.log("filtered" + filterList);
    } catch (e) {}
  };

  const setFlowersToAsyncStorage = async (flowers) => {
    try {
      await AsyncStorage.setItem("flowers", JSON.stringify(flowers));
    } catch (e) {}
  };

  const updateFlowerLike = (oldFlowersList, index, liked) => {
    let newFlowersList = oldFlowersList;
    console.log(index);
    console.log(liked);
    console.log(newFlowersList[index]);
    newFlowersList[index].like = liked;
    // setFlowers(newFlowersList);
    setFlowersToAsyncStorage(newFlowersList);
  };

  const CategoryList = () => {
    return (
      <View style={styles.categoryContainer}>
        {categories.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.5}
            onPress={() => {
              setCategory(item);
              if (item == "POPULAR") {
                getPopular();
                setSearch("");
              } else {
                getCategory(item);
                setSearch("");
              }
            }}
          >
            <View
              style={[
                styles.categoryText,
                catergory === item && styles.categoryTextSelected,
              ]}
            >
              <Text
                style={[
                  styles.categoryText,
                  catergory === item && styles.categoryTextSelected,
                ]}
              >
                {item}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const Card = ({ flower }) => {
    const [like, setLike] = useState(flower.like);
    // console.log(like);
    return (
      <View style={styles.card}>
        <View style={{ alignItems: "flex-end" }}>
          <View
            style={{
              width: 30,
              height: 30,
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
                let flower1 = listwcat.find(
                  (item, index) => item.id === flower.id
                );
                let index = listwcat.indexOf(flower1);
                console.log(index);
                updateFlowerLike(listwcat, index, flower.like);
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
            height: 100,
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("Detail", flower)}
          >
            <Image
              source={flower.image}
              style={{ flex: 1, resizeMode: "contain", width: 120 }}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Detail", flower)}>
          <Text
            style={{
              alignSelf: "center",
              fontWeight: "bold",
              fontSize: 17,
              marginTop: 30,
            }}
          >
            {flower.name}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        // paddingHorizontal: 20,
        backgroundColor: COLORS.white,
      }}
    >
      <View style={styles.header}>
        <View>
          <Text style={{ fontSize: 25, fontWeight: "bold" }}>Orchid</Text>
          <Text
            style={{ fontSize: 38, fontWeight: "bold", color: COLORS.green }}
          >
            COLLECTION
          </Text>
        </View>
      </View>
      <View
        style={{ paddingHorizontal: 20, marginTop: 30, flexDirection: "row" }}
      >
        <View style={styles.searchContainer}>
          <TouchableOpacity
            onPress={() => {
              const a = listwcat.filter((el) => {
                if (search === "") {
                  return el;
                }
                //return the item which contains the user input
                else {
                  return el.name.includes(search);
                }
              });
              setCategory("POPULAR");
              setFlowers(a);
              console.log(a);
            }}
          >
            <Ionicons name="search" size={25} style={{ marginLeft: 20 }} />
          </TouchableOpacity>
          <TextInput
            placeholder="Search"
            style={styles.input}
            value={search}
            onChangeText={(search) => {
              setSearch(search);
            }}
          />
        </View>
        <View style={styles.sortBtn}>
          <MaterialIcons name="sort" size={30} color="white" />
        </View>
      </View>
      <CategoryList />
      <FlatList
        columnWrapperStyle={{ justifyContent: "space-between" }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: 10,
          paddingBottom: 50,
          paddingHorizontal: 20,
        }}
        numColumns={2}
        data={flowersList}
        renderItem={({ item }) => {
          return <Card flower={item} />;
        }}
      ></FlatList>
    </SafeAreaView>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  searchContainer: {
    height: 50,
    backgroundColor: COLORS.light,
    borderRadius: 10,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.dark,
    flex: 1,
  },
  sortBtn: {
    marginLeft: 10,
    height: 50,
    width: 50,
    backgroundColor: COLORS.green,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  categoryContainer: {
    paddingHorizontal: 20,
    flexDirection: "row",
    marginTop: 30,
    marginBottom: 20,
    justifyContent: "space-between",
  },
  categoryText: { fontSize: 16, color: "grey", fontWeight: "bold" },
  categoryTextSelected: {
    color: COLORS.green,
    paddingBottom: 2.5,
    borderBottomWidth: 2,
    borderColor: COLORS.green,
  },
  card: {
    height: 225,
    backgroundColor: COLORS.light,
    width,
    marginHorizontal: 2,
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,
  },
});
