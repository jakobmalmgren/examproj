// frontend/src/App.test.tsx
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

describe("App component", () => {
  it("renders static elements correctly", () => {
    render(<App />);

    // Huvudrubrik
    expect(screen.getByText("Jappe test")).toBeInTheDocument();

    // Bilder
    expect(screen.getByAltText("Vite logo")).toBeInTheDocument();
    expect(screen.getByAltText("React logo")).toBeInTheDocument();

    // Enkel text i <p>
    expect(screen.getByText("Edit")).toBeInTheDocument();

    // read-the-docs
    expect(
      screen.getByText(/Click on the Vite and React logos/i),
    ).toBeInTheDocument();

    // Initial count-knapp
    expect(screen.getByText("count is 0")).toBeInTheDocument();
  });

  it("increments count when button is clicked", () => {
    render(<App />);
    const button = screen.getByText("count is 0");

    fireEvent.click(button);
    expect(screen.getByText("count is 1")).toBeInTheDocument();

    fireEvent.click(screen.getByText("count is 1"));
    expect(screen.getByText("count is 2")).toBeInTheDocument();
  });
});
