import React from "react";
import { Dimensions } from "react-native";
import Svg, { Circle } from "react-native-svg";
import moment from "moment";
import { useSelector } from "react-redux";

const { width } = Dimensions.get("window");
const CIRCLE_RADIUS = width * 0.38;

const CycleSheet= () => {
  const menstruationData = useSelector((state) => state.user.menstruationDays);

  const today = moment().format("YYYY-MM-DD");
  const cycleDays = menstruationData?.menstrationDays || [];
  const totalDays = 28;

  // Günlerin renklerini belirleme fonksiyonu
  const getDotColor = (date) => {
    const foundDay = cycleDays.find((day) => day.date === date);
    switch (foundDay?.type) {
      case "BLEEDING":
        return "#FF7043";
      case "FERTILITY":
        return "#90EE90";
      case "OVULATION":
        return "#008000";
      default:
        return "#D3D3D3";
    }
  };

  // Çember üzerindeki noktaların konumlarını hesaplama
  const getCirclePositions = () => {
    const positions = [];
    const startAngle = -Math.PI / 1.4;
    const angleStep = (Math.PI * 1.4) / totalDays;

    for (let i = 0; i < totalDays; i++) {
      const date = moment().subtract(totalDays - i, "days").format("YYYY-MM-DD");
      const angle = startAngle + i * angleStep;
      positions.push({
        x: CIRCLE_RADIUS + Math.cos(angle) * CIRCLE_RADIUS,
        y: CIRCLE_RADIUS + Math.sin(angle) * (CIRCLE_RADIUS * 0.7),
        color: getDotColor(date),
        isToday: date === today,
      });
    }
    return positions;
  };

  return (
    <Svg width={width} height={CIRCLE_RADIUS * 1.5}>
      {getCirclePositions().map((pos, index) => (
        <Circle key={index} cx={pos.x} cy={pos.y} r={pos.isToday ? 18 : 10} fill={pos.color} />
      ))}
    </Svg>
  );
};

export default CycleSheet;
