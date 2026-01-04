import React, { useState } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Select from "./Select";

describe("Select component", () => {
  const options = [
    { value: "", label: "Any" },
    { value: "House", label: "House" },
    { value: "Flat", label: "Flat" },
  ];

  // Test 1: renders label and options
  test("renders label and options", () => {
    render(<Select label="Property Type" options={options} />);
    expect(screen.getByText("Property Type")).toBeInTheDocument();
    options.forEach((opt) => {
      expect(screen.getByText(opt.label)).toBeInTheDocument();
    });
  });

  // Test 2: controlled component updates correctly
  test("updates value when user selects an option (controlled)", () => {
    // Mock parent component that controls value
    function Wrapper() {
      const [value, setValue] = useState("");
      return (
        <Select
          label="Property Type"
          options={options}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      );
    }

    render(<Wrapper />);
    const select = screen.getByRole("combobox");

    // Initial value should be ""
    expect(select.value).toBe("");

    // Simulate selecting "House"
    fireEvent.change(select, { target: { value: "House" } });

    // Now the value should be updated
    expect(select.value).toBe("House");
  });

  // Test 3: works without a label
  test("renders correctly without a label", () => {
    render(<Select options={options} />);
    const select = screen.getByRole("combobox");
    expect(select).toBeInTheDocument();
    expect(screen.queryByText("Property Type")).not.toBeInTheDocument();
  });
});
