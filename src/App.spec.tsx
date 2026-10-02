import { describe, expect, it, jest } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import App from "./App";

jest.mock("react-router", () => ({
  RouterProvider: () => <div data-testid="router-provider" />,
}));

describe("App", () => {
  it("should render App", () => {
    render(<App />);

    expect(screen.getByTestId("router-provider")).toBeTruthy();
  });
});
