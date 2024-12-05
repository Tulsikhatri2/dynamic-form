import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./Slice/dataSlice";

export const store = () => {
  return configureStore({
    reducer: {
      data: dataReducer,
    },
  });
};

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
