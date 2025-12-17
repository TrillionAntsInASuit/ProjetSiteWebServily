import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Create from "@components/Employeur/create/Create.jsx";

describe("Create.jsx", () => {
  it("affiche le titre Create Listing", () => {
    render(
      <MemoryRouter>
        <Create />
      </MemoryRouter>
    );
    expect(screen.getByText(/Create Listing/i)).toBeInTheDocument();
  });
});
