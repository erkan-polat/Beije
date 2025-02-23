import React from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { useSelector } from "react-redux";
import Icon from "react-native-vector-icons/MaterialIcons";
import moment from "moment";
import BottomSheet from "./BottomSheet";
import CycleVisualization from "./CycleVisualization";

const { width } = Dimensions.get("window");
const CIRCLE_RADIUS = width * 0.38;

const CycleScreen = () => {
  const profile = useSelector((state) => state.user.profile?.profileInfo);
  const menstruationData = useSelector((state) => state.user.menstruationDays);
  const today = moment().format("YYYY-MM-DD");
  const formattedDate = moment().format("D MMMM");

  // Redux'tan alınan gün bilgileri
  const cycleDays = menstruationData?.menstrationDays || [];
  const totalDays = cycleDays.length || 28; // Redux'tan gelen toplam gün sayısı

  // Redux'taki verilere göre gün rengi belirleme
  const getDotColor = (date) => {
    const foundDay = cycleDays.find((day) => day.date === date);
    switch (foundDay?.type) {
      case "BLEEDING":
        return "#FF7043"; // Kırmızı / Turuncu
      case "FERTILITY":
        return "#90EE90"; // Açık Yeşil
      case "OVULATION":
        return "#008000"; // Koyu Yeşil
      default:
        return "#D3D3D3"; // Normal günler için gri
    }
  };

  // Redux'tan gelen verilere göre çember üzerindeki noktaların pozisyonlarını hesapla
  const getCirclePositions = () => {
    const positions = [];
    const startAngle = -Math.PI / 1.4;
    const angleStep = (Math.PI * 1.4) / totalDays;

    cycleDays.forEach((day, index) => {
      const angle = startAngle + index * angleStep;
      positions.push({
        x: CIRCLE_RADIUS + Math.cos(angle) * CIRCLE_RADIUS,
        y: CIRCLE_RADIUS + Math.sin(angle) * (CIRCLE_RADIUS * 0.7),
        color: getDotColor(day.date),
        isToday: day.date === today,
      });
    });

    return positions;
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FFF5F2", alignItems: "center", paddingTop: 50 }}>

      {/* Üst Menü */}
      <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-between", paddingHorizontal: 20 }}>
        <TouchableOpacity style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: "#FF7043", alignItems: "center", justifyContent: "center" }}>
          <Text style={{ fontSize: 18, color: "#fff", fontWeight: "bold" }}>{profile?.firstName[0]}</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="notifications" size={30} color="#D3D3D3" />
        </TouchableOpacity>
      </View>

      {/* Tarih Başlığı */}
      <Text style={{ fontSize: 20, fontWeight: "bold", marginVertical: 5 }}>{formattedDate}</Text>

      {/* Döngü Görselleştirmesi */}
      <CycleVisualization cycleData={cycleDays} />

      {/* BottomSheet (Öne Çıkanlar) */}
      <BottomSheet />

      {/* Alt Menü */}
      <View style={{ position: "absolute", bottom: 0, width: "100%", backgroundColor: "#fff", flexDirection: "row", justifyContent: "space-around", paddingVertical: 15, borderTopWidth: 1, borderColor: "#EAEAEA" }}>
        <TouchableOpacity>
          <Icon name="autorenew" size={30} color="#FF7043" />
          <Text style={{ fontSize: 12, color: "#FF7043" }}>Döngü</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="event-note" size={30} color="#BDBDBD" />
          <Text style={{ fontSize: 12, color: "#BDBDBD" }}>Takvim</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="bar-chart" size={30} color="#BDBDBD" />
          <Text style={{ fontSize: 12, color: "#BDBDBD" }}>Analiz</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="visibility" size={30} color="#BDBDBD" />
          <Text style={{ fontSize: 12, color: "#BDBDBD" }}>Rehber</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CycleScreen;
