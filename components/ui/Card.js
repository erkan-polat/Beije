// components/ui/Card.js
import React from "react";
import { View, Text } from "react-native";

const Card = ({ children }) => (
  <View style={{ padding: 15, backgroundColor: "white", borderRadius: 10, elevation: 3 }}>
    {children}
  </View>
);

const CardContent = ({ children }) => <View>{children}</View>;

export { Card, CardContent };
