import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../redux/store";
import Login from "../components/Login";
import "@testing-library/jest-dom";

test("renders login form", () => {
    render(
        <Provider store={store}>
            <Login />
        </Provider>
    );

    const emailInput = screen.getByPlaceholderText("you@example.com");
    const button = screen.getByText("Sign in");

    expect(emailInput).toBeInTheDocument();
    expect(button).toBeInTheDocument();
});
