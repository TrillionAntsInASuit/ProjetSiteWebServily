import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import Header from "@components/header/header.jsx";
import { AuthContext } from "@context/auth-context.js";

describe("Header.jsx", () => {
  it("affiche titre 'Servily'", () => {
    render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isLoggedIn: false }}>
          <Header />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText("Servily")).toBeInTheDocument();
  });
});
