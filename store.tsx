import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

import { persistReducer, persistStore } from "redux-persist";
import searchReducer from "./redux/reducers/search";
import menuReducer from "./redux/reducers/menu";
import markerReducer from "./redux/reducers/marker";

const persistConfig = {
    key: "root",
    storage,
    whitelist: [],
};

const rootReducer = combineReducers({ search: searchReducer, menu: menuReducer, marker: markerReducer });

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== "production", // 개발자도구 확인
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
export const persistor = persistStore(store);