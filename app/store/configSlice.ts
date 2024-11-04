import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Payload = {
  isLibre: boolean;
};

type ConfigState = {
  isLibre: boolean | undefined;
};

const getInitial = () => {
  const storedValue = localStorage.getItem("isLibre");
  let isLibre = false;
  if (storedValue == "true") {
    isLibre = true;
  }
  return { isLibre };
};

const initialConfigState: ConfigState = getInitial();

export const configSlice = createSlice({
  name: "configSlice",
  initialState: initialConfigState,
  reducers: {
    setIsLibre: (state, action: PayloadAction<boolean>) => {
      state.isLibre = action.payload;
      localStorage.setItem("isLibre", JSON.stringify(action.payload));
    },
  },
});

export const { setIsLibre } = configSlice.actions;
