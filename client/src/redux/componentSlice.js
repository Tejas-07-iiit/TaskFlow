import { createSlice } from "@reduxjs/toolkit";

const componentSlice = createSlice({
    name: "component",
    initialState: {
        activeComponent: "login",
    },
    reducers: {
        setActiveComponent: (state, action) => {
            state.activeComponent = action.payload;
        },
    },
});

export const { setActiveComponent } = componentSlice.actions;
export default componentSlice.reducer;
