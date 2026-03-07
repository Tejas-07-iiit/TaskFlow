import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: "notification",
    initialState: {
        message: "",
        type: "info", // "success" | "error" | "info"
        isVisible: false,
    },
    reducers: {
        showNotification: (state, action) => {
            state.message = action.payload.message;
            state.type = action.payload.type || "info";
            state.isVisible = true;
        },
        hideNotification: (state) => {
            state.isVisible = false;
            state.message = "";
        },
    },
});

export const { showNotification, hideNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
