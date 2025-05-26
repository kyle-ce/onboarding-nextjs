import '@testing-library/jest-dom';
import { expect, afterEach, beforeEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import { resetMocks } from './utils';

// Extend Vitest's expect method with jest-dom matchers
expect.extend(matchers);

// Reset all mocks before each test
beforeEach(() => {
  resetMocks();
});

// Cleanup after each test
afterEach(() => {
  cleanup();
});
