import React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { useSelector } from "react-redux";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { BottomSheet } from "react-native-elements";
import { Svg, Circle } from "react-native-svg";

const CycleTracker = () => {
  const userProfile = useSelector((state) => state.profile.user);
  const cycleDays = useSelector((state) => state.cycle.days);
  const insights = useSelector((state) => state.insights.list);

  const [isSheetVisible, setSheetVisible] = React.useState(false);
  const cycleLength = cycleDays.length;

  // Function to determine dot color
  const getDotColor = (day) => {
    if (day.type === "BLEEDING") return "orange";
    if (day.type === "FERTILITY") return "lightgreen";
    if (day.type === "OVULATION") return "darkgreen";
    return "grey";
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", padding: 20 }}>
      {/* Top Bar */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <TouchableOpacity style={{ backgroundColor: "#ddd", padding: 10, borderRadius: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>{userProfile?.firstName[0]}</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} />
        </TouchableOpacity>
      </View>

      {/* Cycle Representation */}
      <View style={{ alignItems: "center", marginTop: 50 }}>
        <Svg height="200" width="200" viewBox="0 0 200 200">
          {cycleDays.map((day, index) => {
            const angle = (index / cycleLength) * Math.PI * 2;
            const x = 100 + Math.cos(angle) * 80;
            const y = 100 - Math.sin(angle) * 80;

            return <Circle key={index} cx={x} cy={y} r="5" fill={getDotColor(day)} />;
          })}
        </Svg>
      </View>

      {/* Bottom Sheet Trigger */}
      <TouchableOpacity
        style={{ marginTop: 40, backgroundColor: "#6200ea", padding: 12, borderRadius: 10 }}
        onPress={() => setSheetVisible(true)}
      >
        <Text style={{ color: "#fff", textAlign: "center", fontSize: 16 }}>View Insights</Text>
      </TouchableOpacity>

      {/* Bottom Sheet */}
      <BottomSheet isVisible={isSheetVisible}>
        <View style={{ backgroundColor: "white", padding: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Insights</Text>
          <FlatList
            data={insights}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Text style={{ paddingVertical: 5 }}>• {item}</Text>
            )}
          />
          <TouchableOpacity
            style={{ marginTop: 10, backgroundColor: "red", padding: 10, borderRadius: 5 }}
            onPress={() => setSheetVisible(false)}
          >
            <Text style={{ color: "white", textAlign: "center" }}>Close</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </View>
  );
};

export default CycleTracker;
