import 'react-native-gesture-handler'; // <--- Add this at the very top
import { registerRootComponent } from "expo";
import React from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native"; // NavigationContainer burada!
import store from "./redux/store";
import Navigation from "./Navigation"; // Düzeltilmiş Navigation bileşeni

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </Provider>
  );
}

registerRootComponent(App);
