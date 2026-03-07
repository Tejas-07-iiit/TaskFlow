import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../redux/store";
import { setActiveComponent } from "../redux/componentSlice";
import Register from "../components/Register";
import "@testing-library/jest-dom";

test("register page shows register button", () => {
    // Set the active component to register so it renders
    store.dispatch(setActiveComponent("register"));

    render(
        <Provider store={store}>
            <Register />
        </Provider>
    );

    const button = screen.getByText("Register");
    expect(button).toBeInTheDocument();
});
