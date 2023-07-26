import { render, screen } from "@testing-library/react";

import HomePage from "../pages/home-page";

describe("HomePage", () => {
  it("renders the main description", () => {
    // Arrange
    render(<HomePage />);

    // Act
    const heading = screen.getByRole("heading", {
      name: /Company Watch List/i,
    });

    // Assert
    expect(heading).toBeInTheDocument();
  });

  it("renders the logo image", async () => {
    // Arrange
    render(<HomePage />);

    // Act - name is the alt text for images
    const image = await screen.findByRole("img",  {
      name: /Market logo/i,
    });

    // Assert
    expect(image).toBeInTheDocument();
   
  })
});
