import { render, screen } from "@testing-library/react";
import Edit from "@components/Employeur/edit/Edit.jsx";
import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";

describe("Edit.jsx", () => {
  const renderWithRouter = () =>
    render(
      <MemoryRouter initialEntries={["/edit/123"]}>
        <Routes>
          <Route path="/edit/:serviceId" element={<Edit />} />
        </Routes>
      </MemoryRouter>
    );

  it("affiche le titre 'Enlève des clients'", () => {
    renderWithRouter();
    expect(screen.getByText("Enlève des clients")).toBeInTheDocument();
  });
});
