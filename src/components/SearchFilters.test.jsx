import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchFilters from "./SearchFilters";

// Group all tests related to the SearchFilters component
describe("SearchFilters component", () => {
  // Initial filter state passed as props to the component
  const initialFilters = {
    type: "",
    minPrice: "",
    maxPrice: "",
    beds: "",
    postcode: "",
    dateAdded: "",
  };

  // Mock function to track calls to setFilters
  let setFiltersMock;

  // Runs before each test to render a fresh instance of the component
  beforeEach(() => {
    setFiltersMock = jest.fn();
    render(
      <SearchFilters filters={initialFilters} setFilters={setFiltersMock} />
    );
  });

  // Test 1: Ensure all inputs and selects render with empty initial values
  test("renders inputs with initial values", () => {
    const selects = screen.getAllByRole("combobox"); // Select dropdowns
    const numbers = screen.getAllByRole("spinbutton"); // Number inputs
    const text = screen.getByRole("textbox"); // Text input (postcode)

    expect(selects[0].value).toBe(""); // Property Type
    expect(numbers[0].value).toBe(""); // Min Price
    expect(numbers[1].value).toBe(""); // Max Price
    expect(numbers[2].value).toBe(""); // Min Bedroom
    expect(text.value).toBe(""); // Postcode
  });

  // Test 2: Verify that typing into a numeric input updates its value
  test("updates input values", () => {
    const minPrice = screen.getAllByRole("spinbutton")[0];
    fireEvent.change(minPrice, { target: { value: "100000" } });

    expect(minPrice.value).toBe("100000");
  });

  // Test 3: Ensure negative values are not allowed for numeric inputs
  test("prevents negative numbers", () => {
    const beds = screen.getAllByRole("spinbutton")[2];
    fireEvent.change(beds, { target: { value: "-1" } });

    expect(beds.value).toBe("");
  });

  // Test 4: Clicking Reset should call setFilters to clear all filters
  test("reset button clears filters", () => {
    fireEvent.click(screen.getByText("Reset"));

    expect(setFiltersMock).toHaveBeenCalled();
  });

  // Test 5: Clicking Search should apply the current filters
  test("search button applies filters", () => {
    fireEvent.click(screen.getByText("Search"));

    expect(setFiltersMock).toHaveBeenCalled();
  });
});
