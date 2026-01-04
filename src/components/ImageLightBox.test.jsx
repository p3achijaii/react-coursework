import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ImageLightBox from "./ImageLightBox";

describe("ImageLightBox component", () => {
  const images = ["img1.jpg", "img2.jpg", "img3.jpg"];
  let onCloseMock;
  let onIndexChangeMock;

  beforeEach(() => {
    onCloseMock = jest.fn();
    onIndexChangeMock = jest.fn();
  });

  // Test 1: Component does not render if isOpen is false
  test("does not render when isOpen is false", () => {
    const { container } = render(
      <ImageLightBox
        isOpen={false}
        onClose={onCloseMock}
        images={images}
        currentIndex={0}
        onIndexChange={onIndexChangeMock}
      />
    );
    expect(container.firstChild).toBeNull();
  });

  // Test 2: Renders image and buttons when open
  test("renders image and buttons when open", () => {
    render(
      <ImageLightBox
        isOpen={true}
        onClose={onCloseMock}
        images={images}
        currentIndex={1}
        onIndexChange={onIndexChangeMock}
      />
    );

    // Check if image is displayed correctly
    const image = screen.getByAltText("Gallery image 2");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "img2.jpg");

    // Query buttons by className (close, prev, next)
    const closeBtn = document.querySelector(".closeBtn");
    const prevBtn = document.querySelector(".prevBtn");
    const nextBtn = document.querySelector(".nextBtn");

    expect(closeBtn).toBeInTheDocument();
    expect(prevBtn).toBeInTheDocument();
    expect(nextBtn).toBeInTheDocument();
  });

  // Test 3: Close button calls onClose
  test("calls onClose when close button is clicked", () => {
    render(
      <ImageLightBox
        isOpen={true}
        onClose={onCloseMock}
        images={images}
        currentIndex={0}
        onIndexChange={onIndexChangeMock}
      />
    );

    const closeBtn = document.querySelector(".closeBtn");
    fireEvent.click(closeBtn);
    expect(onCloseMock).toHaveBeenCalled();
  });

  // Test 4: Next button increments index
  test("next button calls onIndexChange with next index", () => {
    render(
      <ImageLightBox
        isOpen={true}
        onClose={onCloseMock}
        images={images}
        currentIndex={0}
        onIndexChange={onIndexChangeMock}
      />
    );

    const nextBtn = document.querySelector(".nextBtn");
    fireEvent.click(nextBtn);
    expect(onIndexChangeMock).toHaveBeenCalledWith(1);
  });

  // Test 5: Prev button decrements index (wrap around)
  test("prev button calls onIndexChange with previous index", () => {
    render(
      <ImageLightBox
        isOpen={true}
        onClose={onCloseMock}
        images={images}
        currentIndex={0}
        onIndexChange={onIndexChangeMock}
      />
    );

    const prevBtn = document.querySelector(".prevBtn");
    fireEvent.click(prevBtn);
    expect(onIndexChangeMock).toHaveBeenCalledWith(2);
  });
});
