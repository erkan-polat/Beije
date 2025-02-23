import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = "https://96318a87-0588-4da5-9843-b3d7919f1782.mock.pstmn.io";

/**
 * Kullanıcı giriş yapma fonksiyonu (Sign-In Request)
 */
export const signInRequest = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/sign-in-request`, {
      email,
      password,
    });

    if (response.data.success) {
      const token = response.data.data.token;
      await AsyncStorage.setItem("token", token);
      return token;
    } else {
      throw new Error("Login failed");
    }
  } catch (error) {
    console.error("Sign-in error:", error);
    return null;
  }
};

/**
 * API isteklerinde kullanılacak token'ı getirir
 */
const getToken = async () => {
  return await AsyncStorage.getItem("token");
};

/**
 * Kullanıcı profili bilgisini getirir
 */
export const getProfile = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/profile`);
    const profileData = response.data.data;
    console.log("Profile Info:", profileData);
    return response.data.data;

  } catch (error) {
    console.error("Get Profile Error:", error);
    return null;
  }
};

/**
 * Kullanıcının adet günlerini getirir
 */
export const getMenstruationDays = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/menstruation-days`);
    const menstruationData = response.data.data;
    console.log("menstruationData Info:", menstruationData);
    return response.data.data;

  } catch (error) {
    console.error("Get Menstruation Days Error:", error);
    return [];
  }
};

/**
 * Kullanıcı için öneriler ve içerikleri getirir
 */
export const getInsights = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/insights`);

    const insightsData = response.data.data;
    console.log("insightsData Info:", insightsData);
    return response.data.data;

  } catch (error) {
    console.error("Get Insights Error:", error);
    return [];
  }
};
