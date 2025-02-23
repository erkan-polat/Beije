import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "./screens/SplashScreen";
import CycleScreen from "./screens/CycleScreen";

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="CycleScreen" component={CycleScreen} />
    </Stack.Navigator>
  );
};

export default Navigation;
