import { render, screen, fireEvent } from '@testing-library/react';
import Create from '@components/Employeur/create/Create.jsx';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import React from 'react';

// Hoisted mock
const { mockFrom } = vi.hoisted(() => ({ mockFrom: vi.fn() }));

vi.mock('@backendUtil/supabaseClient.js', () => ({
  supabase: { from: mockFrom },
}));

// Mock useNavigate
const navigateMock = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

vi.stubGlobal('localStorage', { getItem: vi.fn(() => '1') });

describe('Create integration', () => {
  beforeEach(() => vi.clearAllMocks());

  it('creates a new service successfully', async () => {
    const insertMock = vi.fn(() => Promise.resolve({ data: [{ id: 1 }], error: null }));

    mockFrom.mockImplementation((table) => {
  if (table === 'services') {
    return {
      select: () => ({
        eq: () => Promise.resolve({ data: [], error: null }), // aucun service existant
      }),
      insert: insertMock, // 👈 brancher ici
    };
  }
  if (table === 'users') {
    return {
      select: () => ({
        eq: () => ({
          single: () => Promise.resolve({
            data: { estAbonne: true }, // abonné
            error: null,
          }),
        }),
      }),
    };
  }
  return {};
});


    render(
      <MemoryRouter>
        <Create />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: 'My Service' },
    });
    fireEvent.change(screen.getByLabelText(/Number of members allowed/i), {
      target: { value: '10' },
    });
    fireEvent.change(screen.getByLabelText(/Description/i), {
      target: { value: 'A test description' },
    });

    // Simule la sélection du type via ServiceTypeList
    // Ici tu peux mocker ServiceTypeList pour qu'il appelle directement onSelect
    // ou utiliser fireEvent si c'est un <select>

    fireEvent.click(screen.getByRole('button', { name: /Register/i }));

    // Vérifie que insert est appelé
    expect(insertMock).toHaveBeenCalled();

    // Vérifie que navigate est appelé
    expect(navigateMock).toHaveBeenCalledWith('/');
  });

 
});