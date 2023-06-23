import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MainStackNavigator, ContactStackNavigator } from "./StackNavigation";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "List") {
            iconName = "ios-list";
            // iconName = focused
            //   ? "ios-information-circle"
            //   : "ios-information-circle-outline";
          } else if (route.name === "Favorites") {
            iconName = focused ? "heart-sharp" : "heart-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        header: () => null,
      })}
    >
      <Tab.Screen name="List" component={MainStackNavigator} />
      <Tab.Screen name="Favorites" component={ContactStackNavigator} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
