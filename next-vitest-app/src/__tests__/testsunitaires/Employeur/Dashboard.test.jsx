import { render, screen } from "@testing-library/react";
import Dashboard from "@components/Employeur/dashboard/Dashboard.jsx";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";

vi.mock("@util/supabaseClient.js", () => ({
  supabase: {
    from: () => ({
      select: () => ({
        filter: () => Promise.resolve({ data: [], error: null }),
      }),
    }),
  },
}));

describe("Dashboard.jsx", () => {
  it("affiche 'Available Services' dans le h1", async () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );
    const heading = await screen.findByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent("Available Services");
  });
});
