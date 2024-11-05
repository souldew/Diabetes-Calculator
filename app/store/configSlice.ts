"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Payload = {
  isLibre: boolean;
};

type ConfigState = {
  isLibre: boolean | undefined;
};

const initialConfigState: ConfigState = {
  isLibre: undefined,
};

export const configSlice = createSlice({
  name: "configSlice",
  initialState: initialConfigState,
  reducers: {
    setIsLibre: (state, action: PayloadAction<boolean>) => {
      state.isLibre = action.payload;
      localStorage.setItem("isLibre", JSON.stringify(action.payload));
    },
    initializeConfig: (state) => {
      const storedValue = localStorage.getItem("isLibre");
      state.isLibre = storedValue === "true";
    },
  },
});

export const { setIsLibre, initializeConfig } = configSlice.actions;
