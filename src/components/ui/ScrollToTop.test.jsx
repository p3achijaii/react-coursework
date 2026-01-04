import React from "react";
import { render } from "@testing-library/react";
import ScrollToTop from "./ScrollToTop";

// Mock react-router-dom so we can control useLocation
jest.mock("react-router-dom", () => ({
  // useLocation is mocked as a function that returns an object
  useLocation: jest.fn(),
}));

// Import the mocked useLocation
import { useLocation } from "react-router-dom";

describe("ScrollToTop component", () => {
  // Before each test, mock window.scrollTo so we can spy on calls
  beforeEach(() => {
    window.scrollTo = jest.fn();
  });

  // Test 1: Ensure component renders without crashing
  test("renders without crashing", () => {
    // Mock useLocation to return a pathname
    useLocation.mockReturnValue({ pathname: "/" });

    // Render the component
    render(<ScrollToTop />);

    // If it throws, the test fails automatically
  });

  // Test 2: Check that window.scrollTo is called on mount
  test("calls window.scrollTo when pathname changes", () => {
    // Mock useLocation to return a pathname
    useLocation.mockReturnValue({ pathname: "/home" });

    // Render the component
    render(<ScrollToTop />);

    // Expect window.scrollTo to have been called once
    expect(window.scrollTo).toHaveBeenCalled();

    // Expect scrollTo to be called with the correct options
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: "smooth",
    });
  });

  // Test 3: Check that scrollTo updates when pathname changes
  test("scrolls when pathname changes", () => {
    // First render at "/"
    useLocation.mockReturnValue({ pathname: "/" });
    const { rerender } = render(<ScrollToTop />);

    // Change pathname to "/new-page"
    useLocation.mockReturnValue({ pathname: "/new-page" });

    // Re-render component to simulate pathname change
    rerender(<ScrollToTop />);

    // Expect window.scrollTo to be called again
    expect(window.scrollTo).toHaveBeenCalledTimes(2);
    expect(window.scrollTo).toHaveBeenLastCalledWith({
      top: 0,
      behavior: "smooth",
    });
  });
});
