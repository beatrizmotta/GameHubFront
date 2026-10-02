import { render, screen } from "@testing-library/react";
import { PasswordInput } from "./PasswordInput";
import { describe, it, expect } from "@jest/globals";
import userEvent from "@testing-library/user-event";

describe("PasswordInput", () => {
  it("should toggle input type when show/hide button clicked", async () => {
    const user = userEvent.setup();

    render(<PasswordInput aria-label="password" />);
    const input = screen.getByLabelText("password");
    const button = screen.getByRole("button");

    expect(input).toHaveProperty("type", "password");
    
    await user.click(button);
    
    expect(input).toHaveProperty("type", "text");
    
    await user.click(button);
    
    expect(input).toHaveProperty("type", "password");
  });
});
