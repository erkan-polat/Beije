import React from "react";
import { View, Dimensions } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { useSelector } from "react-redux";
import moment from "moment";

const { width } = Dimensions.get("window");
const OUTER_CIRCLE_RADIUS = width * 0.42;
const INNER_CIRCLE_RADIUS = width * 0.34;
const DOT_RADIUS = 6;

const colors = {
  NORMAL: "#D3D3D3",
  BLEEDING: "#FF7043",
  BLEEDING_BG: "rgba(255, 107, 107, 0.3)",
  FERTILITY: "#90EE90",
  FERTILITY_BG: "rgba(50, 205, 50, 0.3)",
  OVULATION: "#008000",
  RING_FILL: "#FFFFFF",
};

const CycleVisualization = () => {
  const menstruationData = useSelector((state) => state.user.menstruationDays);
  const today = moment().format("YYYY-MM-DD");
  const cycleDays = menstruationData?.menstrationDays || [];
  const totalDays = 28; // Always displaying 28 days for the cycle visualization

  const getDotColor = (date) => {
    const foundDay = cycleDays.find((day) => day.date === date);
    switch (foundDay?.type) {
      case "BLEEDING":
        return colors.BLEEDING;
      case "FERTILITY":
        return colors.FERTILITY;
      case "OVULATION":
        return colors.OVULATION;
      default:
        return colors.NORMAL;
    }
  };

  return (
    <View style={{ alignItems: "center", justifyContent: "center", backgroundColor: "transparent", marginTop: -20 }}>
      <Svg width={width} height={width} viewBox={`0 0 ${width} ${width}`}>
        {/* White Ring */}
        <Circle
          cx={width / 2}
          cy={width / 2}
          r={(OUTER_CIRCLE_RADIUS + INNER_CIRCLE_RADIUS) / 2}
          stroke={colors.RING_FILL}
          strokeWidth={OUTER_CIRCLE_RADIUS - INNER_CIRCLE_RADIUS}
          fill="none"
        />

        {/* Background for BLEEDING and FERTILITY days */}
        {cycleDays.map((day, index) => {
          if (day.type === "BLEEDING" || day.type === "FERTILITY") {
            const angle = (index / totalDays) * Math.PI * 2 - Math.PI / 2;
            const x = width / 2 + (OUTER_CIRCLE_RADIUS + INNER_CIRCLE_RADIUS) / 2 * Math.cos(angle);
            const y = width / 2 + (OUTER_CIRCLE_RADIUS + INNER_CIRCLE_RADIUS) / 2 * Math.sin(angle);
            return (
              <Circle
                key={`bg-${day.date}`}
                cx={x}
                cy={y}
                r={DOT_RADIUS * 2.5}
                fill={day.type === "BLEEDING" ? colors.BLEEDING_BG : colors.FERTILITY_BG}
              />
            );
          }
          return null;
        })}

        {/* Cycle Dots */}
        {Array.from({ length: totalDays }).map((_, index) => {
          const date = moment("2025-02-01").add(index, "days").format("YYYY-MM-DD");
          const angle = (index / totalDays) * Math.PI * 2 - Math.PI / 2;
          const x = width / 2 + (OUTER_CIRCLE_RADIUS + INNER_CIRCLE_RADIUS) / 2 * Math.cos(angle);
          const y = width / 2 + (OUTER_CIRCLE_RADIUS + INNER_CIRCLE_RADIUS) / 2 * Math.sin(angle);

          return (
            <Circle
              key={date}
              cx={x}
              cy={y}
              r={DOT_RADIUS}
              fill={getDotColor(date)}
            />
          );
        })}
      </Svg>
    </View>
  );
};

export default CycleVisualization;
