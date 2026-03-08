// frontend/src/App.test.tsx
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

describe("App component", () => {
  it("renders all static elements", () => {
    render(<App />);

    // Kolla huvudrubrik
    expect(screen.getByText("Jakobs react nya")).toBeInTheDocument();

    // Kolla knappen
    expect(screen.getByText("count is 0")).toBeInTheDocument();

    // Kolla <p> med code
    expect(screen.getByText(/Edit src\/App.tsx/i)).toBeInTheDocument();

    // Kolla read-the-docs p
    expect(
      screen.getByText(/Click on the Vite and React logos/i),
    ).toBeInTheDocument();

    // Kolla att bilderna finns
    expect(screen.getByAltText("Vite logo")).toBeInTheDocument();
    expect(screen.getByAltText("React logo")).toBeInTheDocument();
  });

  it("increments count when button is clicked", () => {
    render(<App />);
    const button = screen.getByText(/count is 0/i);

    // Klicka på knappen
    fireEvent.click(button);

    // Count ska öka
    expect(screen.getByText(/count is 1/i)).toBeInTheDocument();

    // Klicka en gång till
    fireEvent.click(screen.getByText(/count is 1/i));
    expect(screen.getByText(/count is 2/i)).toBeInTheDocument();
  });
});
