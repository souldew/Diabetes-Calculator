"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { set } from "lodash";

export const timeOfDay = ["morning", "noon", "night"] as const;
export type TimeOfDay = (typeof timeOfDay)[number];

type InsulinState = {
  fastActingInsulin: { [key in TimeOfDay]: string };
  longActingInsulin: { [key in TimeOfDay]: string };
  dust: string;
};

const initialState: InsulinState = {
  fastActingInsulin: {
    morning: "0",
    noon: "0",
    night: "0",
  },
  longActingInsulin: {
    morning: "0",
    noon: "0",
    night: "0",
  },
  dust: "0",
};

const name = "insulin-slice";
export const insulinSlice = createSlice({
  name: "insulin-slice",
  initialState,
  reducers: {
    handleInsulin: (
      state,
      action: PayloadAction<{ key: string; value: string }>
    ) => {
      set(state, action.payload.key, action.payload.value || "");
      localStorage.setItem(name, JSON.stringify(state));
    },
    initializeInsulin: (state) => {
      const store = localStorage.getItem(name);
      if (store) {
        Object.assign(state, JSON.parse(store));
      }
    },
  },
});

export const { handleInsulin, initializeInsulin } = insulinSlice.actions;
