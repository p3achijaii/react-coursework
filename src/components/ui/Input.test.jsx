import React from "react";
import { render, screen } from "@testing-library/react";
import Input from "./Input";

describe("Input component", () => {
  // Test 1: Renders input element
  test("renders the input element", () => {
    render(<Input placeholder="Enter text" />);
    const input = screen.getByPlaceholderText("Enter text");

    expect(input).toBeInTheDocument();
    expect(input.tagName).toBe("INPUT");
  });

  // Test 2: Renders label if provided
  test("renders label text when passed", () => {
    render(<Input label="Username" />);
    const label = screen.getByText("Username");

    expect(label).toBeInTheDocument();
  });

  // Test 3: Renders error message if provided
  test("renders error message when passed", () => {
    render(<Input error="Required field" />);
    const errorText = screen.getByText("Required field");

    expect(errorText).toBeInTheDocument();
  });

  // Test 4: Applies custom className
  test("applies custom className", () => {
    render(<Input className="custom-class" />);
    const input = screen.getByRole("textbox");

    expect(input).toHaveClass("custom-class");
  });
});
