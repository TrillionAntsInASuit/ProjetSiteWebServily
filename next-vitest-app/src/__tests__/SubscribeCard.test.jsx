import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SubscribeCard from '@containers/SubscribeCard.jsx';
import { vi } from 'vitest';
import React from 'react';

// Mocks
const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);
vi.stubGlobal('alert', vi.fn());
delete window.location;
window.location = { href: '' };

describe('SubscribeCard integration', () => {
  const plan = { name: 'Pro Plan', price: '$10', priceId: 'price_123' };

  beforeEach(() => vi.clearAllMocks());

  it('handles successful subscription', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ url: 'http://checkout-session-url' }),
    });

    render(<SubscribeCard plan={plan} />);
    fireEvent.click(screen.getByRole('button', { name: /Subscribe Now/i }));

    await waitFor(() => {
      expect(window.location.href).toBe('http://checkout-session-url');
    });
  });

  it('handles subscription error when no url returned', async () => {
    mockFetch.mockResolvedValueOnce({ ok: true, json: async () => ({}) });

    render(<SubscribeCard plan={plan} />);
    fireEvent.click(screen.getByRole('button', { name: /Subscribe Now/i }));

    await waitFor(() => {
      expect(alert).toHaveBeenCalledWith('Error: No checkout URL received');
    });
  });
});