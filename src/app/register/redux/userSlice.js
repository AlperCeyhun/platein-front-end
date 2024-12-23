import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    firstName: "",
    email: "",
    password: "",
    gender: "",
    age: 0,
    currentweight: 0,
    height: 0,
    goalweight: 0,
    dailyMeals: "",
    eatingStyle: "",
    lastName: "",
    sleepingPattern: "",
    waterintake: "",
  },
  reducers: {
    updateUser: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
