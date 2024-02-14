import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import storageSession from 'redux-persist/lib/storage/session'

import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import cart from "./cartSlice";

const reducers = combineReducers({ cart });

const config = {
  key: "root",
  storage: storageSession,
  // storage: AsyncStorage,

};

const reducer = persistReducer(config, reducers);

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware ) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }) ,
});

export default store;
