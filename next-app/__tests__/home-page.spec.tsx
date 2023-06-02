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
});
