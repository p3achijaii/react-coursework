import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";

describe("Button component", () => {
  // Test 1: Renders button with children text
  test("renders button with children", () => {
    render(<Button>Click Me</Button>);

    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Click Me");
  });

  // Test 2: Applies the correct variant class (primary by default)
  test("applies correct variant class", () => {
    render(<Button>Primary</Button>);
    const button = screen.getByRole("button", { name: /primary/i });

    // Expect default variant class 'primary' to be applied
    expect(button).toHaveClass("primary");
  });

  // Test 3: Applies the correct size class
  test("applies correct size class", () => {
    render(<Button size="lg">Large Button</Button>);

    const button = screen.getByRole("button", { name: /large button/i });
    expect(button).toHaveClass("lg");
  });

  // Test 4: Shows spinner and disables button when isLoading is true
  test("disables button and shows spinner when loading", () => {
    render(<Button isLoading>Loading</Button>);
    const button = screen.getByRole("button", { name: /loading/i });

    expect(button).toBeDisabled();
    expect(button.querySelector("div")).toHaveClass("spinner"); // Spinner div exists
  });

  // Test 5: Calls onClick handler when clicked
  test("calls onClick handler when clicked", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);

    const button = screen.getByRole("button", { name: /click me/i });
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
