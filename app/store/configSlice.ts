"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ConfigState = {
  isLibre: boolean | undefined;
  reserveDays: string | undefined; // 予備日数
  nextVisit: string | undefined; // 次回までの基本日数
};

const initialConfigState: ConfigState = {
  isLibre: undefined,
  reserveDays: undefined,
  nextVisit: undefined,
};

export const configSlice = createSlice({
  name: "configSlice",
  initialState: initialConfigState,
  reducers: {
    setIsLibre: (state, action: PayloadAction<boolean>) => {
      state.isLibre = action.payload;
      localStorage.setItem("isLibre", JSON.stringify(action.payload));
    },
    setReserveDays: (state, action: PayloadAction<string>) => {
      state.reserveDays = action.payload;
      localStorage.setItem("reserveDays", action.payload);
    },
    setNextVist: (state, action: PayloadAction<string>) => {
      state.nextVisit = action.payload;
      localStorage.setItem("nextVisit", action.payload);
    },
    initializeConfig: (state) => {
      const isLibre = localStorage.getItem("isLibre");
      state.isLibre = isLibre === "true";
      const reserveDays = localStorage.getItem("reserveDays");
      state.reserveDays = reserveDays ? reserveDays : "7";
      const nextVisit = localStorage.getItem("nextVisit");
      state.nextVisit = nextVisit ? nextVisit : "56";
    },
  },
});

export const { setIsLibre, setNextVist, setReserveDays, initializeConfig } =
  configSlice.actions;
