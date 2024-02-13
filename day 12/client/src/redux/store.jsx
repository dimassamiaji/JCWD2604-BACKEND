/** @format */

"use client";

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import userSlice from "./slices/userSlice";

const rootReducer = combineReducers({
  auth: userSlice,
});

export const StoreProvider = ({ children }) => {
  return (
    <Provider
      store={configureStore({
        reducer: rootReducer,
      })}
    >
      {children}
    </Provider>
  );
};
