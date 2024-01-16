import { fireEvent, render, screen } from "@testing-library/react";

import Login from "./page";

describe("Login", () => {
  it("input email and password", () => {
    render(<Login />);

    const heading: HTMLElement = screen.getByRole("heading", { level: 3 });
    const emailInput: HTMLInputElement = screen.getByPlaceholderText(/email/i);
    const passwordInput: HTMLInputElement =
      screen.getByPlaceholderText(/password/i);
    const loginButton: HTMLButtonElement = screen.getByRole("button", {
      name: /login/i,
    });

    fireEvent.change(emailInput, { target: { value: "garry" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });

    expect(heading.textContent).toBe("Login");
    expect(emailInput.value).toBe("garry");
    expect(passwordInput.value).toBe("password");
  });
});
