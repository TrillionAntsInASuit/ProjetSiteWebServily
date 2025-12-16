import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '@components/login/Login.jsx';
import { AuthContext } from '@context/auth-context.js';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

vi.mock('@hooks/http-hook.js', () => ({
  useHttpClient: () => ({
    isLoading: false,
    error: null, 
    sendRequest: vi.fn(() =>
      Promise.resolve({ userId: '123', token: 'abc' })
    ),
    clearError: vi.fn(),
  }),
}));


describe('Login.jsx', () => {
  const renderWithProviders = (authValue = {}) => {
    return render(
      <MemoryRouter>
        <AuthContext.Provider
          value={{
            isLoggedIn: false,
            userId: null,
            token: null,
            login: vi.fn(),
            logout: vi.fn(),
            ...authValue,
          }}
        >
          <Login />
        </AuthContext.Provider>
      </MemoryRouter>
    );
  };

  it('affiche les champs email et mot de passe', () => {
    renderWithProviders();
    expect(screen.getByPlaceholderText(/Email.../i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password.../i)).toBeInTheDocument();
  });
 it('soumet le formulaire avec des valeurs valides', async () => {
    const loginMock = vi.fn();

    render(
      <MemoryRouter>
        <AuthContext.Provider value={{ login: loginMock, logout: vi.fn() }}>
          <Login />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/Email.../i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password.../i), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

  await waitFor(() => {
  expect(loginMock).toHaveBeenCalled();
});
  });


  it('ne soumet pas si les champs sont vides', () => {
    const loginMock = vi.fn();
    renderWithProviders({ login: loginMock });

    fireEvent.click(screen.getByRole('button', { name: /Login/i }));
    expect(loginMock).not.toHaveBeenCalled();
  });

  it('affiche une erreur si useHttpClient renvoie une erreur', () => {
    vi.mock('@hooks/http-hook.js', () => ({
      useHttpClient: () => ({
        isLoading: false,
        error: 'Invalid credentials',
        sendRequest: vi.fn(),
        clearError: vi.fn(),
      }),
    }));

    renderWithProviders();
    expect(screen.getByText(/Invalid credentials/i)).toBeInTheDocument();
  });
});