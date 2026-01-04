import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";

describe("Button component", () => {
  // Test 1: Renders button with text
  test("renders the button with children text", () => {
    render(<Button>Click Me</Button>);

    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Click Me");
  });

  // Test 2: Applies variant and size classes
  test("applies variant and size classes", () => {
    render(
      <Button variant="ghost" size="lg">
        Test
      </Button>
    );

    const button = screen.getByRole("button", { name: /test/i });
    expect(button).toHaveClass("ghost"); // variant
    expect(button).toHaveClass("lg"); // size
  });

  // Test 3: Shows spinner and disables button when isLoading
  test("disables button and shows spinner when isLoading", () => {
    render(<Button isLoading>Loading</Button>);

    const button = screen.getByRole("button", { name: /loading/i });
    expect(button).toBeDisabled();
    expect(button.querySelector("div")).toHaveClass("spinner"); // spinner div exists
  });

  // Test 4: Calls onClick handler when clicked
  test("calls onClick handler when clicked", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);

    const button = screen.getByRole("button", { name: /click me/i });
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
