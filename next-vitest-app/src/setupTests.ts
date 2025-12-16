import '@testing-library/jest-dom';

import { vi } from 'vitest';

// Ignore tous les imports CSS
vi.mock('*.css', () => ({}));
