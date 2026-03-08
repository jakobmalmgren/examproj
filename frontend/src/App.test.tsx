// frontend/src/App.test.tsx
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App component", () => {
  it("renders HEJ text", () => {
    render(<App />);
    expect(screen.getByText("HEJ")).toBeInTheDocument();
  });
});
