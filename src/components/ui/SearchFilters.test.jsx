import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchFilters from "../SearchFilters";

describe("SearchFilters component", () => {
  const initialFilters = {
    type: "",
    minPrice: "",
    maxPrice: "",
    beds: "",
    postcode: "",
    dateAdded: "",
  };

  let setFiltersMock;

  beforeEach(() => {
    setFiltersMock = jest.fn();
    render(
      <SearchFilters filters={initialFilters} setFilters={setFiltersMock} />
    );
  });

  test("renders inputs with initial values", () => {
    const selects = screen.getAllByRole("combobox");
    const numbers = screen.getAllByRole("spinbutton");
    const text = screen.getByRole("textbox");

    expect(selects[0].value).toBe("");
    expect(numbers[0].value).toBe("");
    expect(numbers[1].value).toBe("");
    expect(numbers[2].value).toBe("");
    expect(text.value).toBe("");
  });

  test("updates input values", () => {
    const minPrice = screen.getAllByRole("spinbutton")[0];
    fireEvent.change(minPrice, { target: { value: "100000" } });
    expect(minPrice.value).toBe("100000");
  });

  test("prevents negative numbers", () => {
    const beds = screen.getAllByRole("spinbutton")[2];
    fireEvent.change(beds, { target: { value: "-1" } });
    expect(beds.value).toBe("");
  });

  test("reset button clears filters", () => {
    fireEvent.click(screen.getByText("Reset"));
    expect(setFiltersMock).toHaveBeenCalled();
  });

  test("search button applies filters", () => {
    fireEvent.click(screen.getByText("Search"));
    expect(setFiltersMock).toHaveBeenCalled();
  });
});
