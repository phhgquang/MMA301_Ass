import "react-native-gesture-handler";
import { StatusBar } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Detail from "./src/components/Detail";
import FavoriteItems from "./src/components/FavoriteItems";
import ListItem from "./src/components/ListItem";
import BottomTabNavigator from "./src/navigation/TabNavigation";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <BottomTabNavigator/>
      {/* <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} /> */}
      {/* <Stack.Navigator screenOptions={{ header: () => null }}>
        <Stack.Screen name="Home" component={ListItem} />
        <Stack.Screen name="Detail" component={Detail} />
      </Stack.Navigator> */}
      {/* <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Flowers") {
              iconName = "ios-list";
              // iconName = focused
              //   ? "ios-information-circle"
              //   : "ios-information-circle-outline";
            } else if (route.name === "Favorite Items") {
              iconName = focused
                ? "heart-sharp"
                : "heart-outline";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Flowers" component={ListItem}/>
        <Tab.Screen name="Favorite Items" component={FavoriteItems} />
      </Tab.Navigator> */}
      {/* <Drawer.Navigator>
        <Drawer.Screen name="List" component={ListItem} />
        <Drawer.Screen name="Detail" component={Detail} />
        <Drawer.Screen name="Favorite Items" component={FavoriteItems} />
      </Drawer.Navigator> */}
    </NavigationContainer>
  );
}
