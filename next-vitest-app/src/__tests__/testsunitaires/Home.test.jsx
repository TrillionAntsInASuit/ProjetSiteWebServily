import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import Home from "@components/home/Home.jsx";

describe("Home.jsx", () => {
  it("affiche 'Welcome to Servily' dans le h2", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Welcome to Servily"
    );
  });
});
