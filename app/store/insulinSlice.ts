"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { set } from "lodash";
import { TimeOfDay } from "../types/types";

type InsulinState = {
  fastActingInsulin: Record<TimeOfDay, string>;
  longActingInsulin: Record<TimeOfDay, string>;
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
    updateInsulin: (state, action: PayloadAction<Record<string, string>>) => {
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

export const { updateInsulin, initializeInsulin } = insulinSlice.actions;
