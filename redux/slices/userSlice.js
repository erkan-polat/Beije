import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: null,
  menstruationDays: [],
  insights: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setProfile: (state, action) => {
      console.log("Redux'a kaydedilen profil:", action.payload);
      state.profile = action.payload;
    },
    setMenstruationDays: (state, action) => {
      console.log("Redux'a kaydedilen menstruation günleri:", action.payload);
      state.menstruationDays = action.payload;
    },
    setInsights: (state, action) => {
      console.log("Redux'a kaydedilen insights:", action.payload);
      state.insights = action.payload;
    },
  },
});

export const { setProfile, setMenstruationDays, setInsights } = userSlice.actions;
export default userSlice.reducer;
