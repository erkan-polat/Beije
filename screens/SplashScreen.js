import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import LottieView from "lottie-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { setProfile, setMenstruationDays, setInsights } from "../redux/slices/userSlice";
import { useNavigation } from "@react-navigation/native";
import { signInRequest, getProfile, getMenstruationDays, getInsights } from "../services/api";

const SplashScreen = () => {
  const animationRef = useRef(null);
  const [playCount, setPlayCount] = useState(0);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    const authenticateAndFetchData = async () => {
      let token = await AsyncStorage.getItem("token");

      if (!token) {
        // İlk defa giriş yapan kullanıcı için mock giriş isteği
        token = await signInRequest("salar@beije.co", "beijeApp");

        if (!token) {
          console.error("Login failed");
          return;
        }
      }

      // API'den verileri al ve Redux'a kaydet
      try {
        const profile = await getProfile();
        const menstruationDays = await getMenstruationDays();
        const insights = await getInsights();
        console.log("profile", profile);
        console.log("menstruationDays", menstruationDays);
        console.log("profile", profile);

        if (profile) dispatch(setProfile(profile));
        if (menstruationDays) dispatch(setMenstruationDays(menstruationDays));
        if (insights) dispatch(setInsights(insights));
      } catch (error) {
        console.error("Data Fetch Error:", error);
      }
    };

    authenticateAndFetchData();
  }, []);

  const handleAnimationFinish = () => {
    if (playCount < 2) {
      setPlayCount(playCount + 1);
      animationRef.current?.play();
    } else {
      navigation.replace("CycleScreen");
    }
  };

  return (
    <View style={styles.container}>
      {/* Lottie Animasyonu */}
<LottieView
  ref={animationRef}
  source={require("../assets/orange-dot.json")}
  autoPlay
  loop={false}
  onAnimationFinish={handleAnimationFinish}
  style={[styles.animation, { transform: [{ scale: 0.6 }] }]}
/>


      {/* "beije." Metni */}
      <Text style={styles.logoText}>beije</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF5F2", // Hafif pembe tonu
  },
  animation: {
    width: 150,  // Noktanın boyutu
    height: 150,
  },
  logoText: {
    position: "absolute",
    bottom: 60,  // Metni aşağıya hizala
    fontSize: 24,
    fontWeight: "bold",
    color: "#C56B3D", // Görseldeki turuncu tonuna yakın bir renk
    textTransform: "lowercase",
  },
});

export default SplashScreen;
