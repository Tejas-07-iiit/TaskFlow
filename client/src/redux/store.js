import { configureStore } from "@reduxjs/toolkit";
import componentReducer from "./componentSlice";
import notificationReducer from "./notificationSlice";

const store = configureStore({
    reducer: {
        component: componentReducer,
        notification: notificationReducer,
    },
});

export default store;
