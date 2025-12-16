import { render, screen, fireEvent } from '@testing-library/react';
import Signup from '@components/signup/Signup.jsx';
import { vi } from 'vitest';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

// Mock Supabase
const mockFrom = vi.fn();
vi.mock('@backendUtil/supabaseClient.js', () => ({
  supabase: { from: mockFrom },
}));

describe('Signup integration', () => {
  beforeEach(() => vi.clearAllMocks());

 

  it('shows error when passwords do not match', async () => {
    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: 'Test User' },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'bad@test.com' },
    });
    fireEvent.change(screen.getByLabelText('Password:'), {
      target: { value: 'short' },
    });
    fireEvent.change(screen.getByLabelText('Confirm Password:'), {
      target: { value: 'different' },
    });
    fireEvent.change(screen.getByLabelText(/Status/i), {
      target: { value: 'client' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Register/i }));

    // Vérifie que l'erreur de mot de passe est affichée
    const errorMessage = await screen.findByText(/Passwords do not match/i);
    expect(errorMessage).toHaveClass('error-message');
  });
});