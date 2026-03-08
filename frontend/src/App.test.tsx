// frontend/src/App.test.tsx
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

describe("App component", () => {
  it("renders static elements correctly", () => {
    render(<App />);

    // Huvudrubrik
    expect(screen.getByText("Jakobs react nya")).toBeInTheDocument();

    // Bilder
    expect(screen.getByAltText("Vite logo")).toBeInTheDocument();
    expect(screen.getByAltText("React logo")).toBeInTheDocument();

    // Text och code-element (splittrad text)
    expect(
      screen.getByText(
        (content, element) =>
          element?.tagName === "P" &&
          content.includes("Edit") &&
          content.includes("src/App.tsx"),
      ),
    ).toBeInTheDocument();

    // read-the-docs p
    expect(
      screen.getByText(/Click on the Vite and React logos/i),
    ).toBeInTheDocument();

    // Knappen med initial count
    expect(screen.getByText("count is 0")).toBeInTheDocument();
  });

  it("increments count when button is clicked", () => {
    render(<App />);
    const button = screen.getByText(/count is 0/i);

    fireEvent.click(button);
    expect(screen.getByText(/count is 1/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/count is 1/i));
    expect(screen.getByText(/count is 2/i)).toBeInTheDocument();
  });
});
