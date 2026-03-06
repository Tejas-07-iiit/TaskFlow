import { configureStore } from "@reduxjs/toolkit";
import componentReducer from "./componentSlice";

const store = configureStore({
    reducer: {
        component: componentReducer,
    },
});

export default store;
