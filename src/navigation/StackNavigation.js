import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import ListItem from "../components/ListItem";
import Detail from "../components/Detail";
import FavoriteItems from "../components/FavoriteItems";

const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ header: () => null }}>
      <Stack.Screen name="List" component={ListItem} />
      <Stack.Screen name="Detail" component={Detail} />
    </Stack.Navigator>
  );
};

const ContactStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ header: () => null }}>
      <Stack.Screen name="Favorites" component={FavoriteItems} />
      <Stack.Screen name="Detail" component={Detail} />
    </Stack.Navigator>
  );
};

export { MainStackNavigator, ContactStackNavigator };
