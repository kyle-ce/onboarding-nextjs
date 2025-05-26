import { vi } from 'vitest';

export const mockRouter = {
  replace: vi.fn(),
  push: vi.fn(),
  back: vi.fn(),
  forward: vi.fn(),
  refresh: vi.fn(),
  prefetch: vi.fn(),
};

export const mockSearchParams = new Map();

export const createMockSearchParams = (params: Record<string, string> = {}) => {
  const searchParams = {
    get: vi.fn((key: string) => params[key] || null),
    getAll: vi.fn(),
    has: vi.fn(),
    entries: vi.fn(),
    forEach: vi.fn(),
    keys: vi.fn(),
    values: vi.fn(),
    toString: vi.fn(),
    append: vi.fn(),
    delete: vi.fn(),
    set: vi.fn(),
    sort: vi.fn(),
  };
  return searchParams;
};

// Mock Next.js hooks
vi.mock('next/navigation', () => ({
  useRouter: () => mockRouter,
  useSearchParams: () => mockSearchParams,
}));

export const setMockSearchParams = (params: Record<string, string> = {}) => {
  const mockParams = createMockSearchParams(params);
  mockSearchParams.clear();
  Object.entries(params).forEach(([key, value]) => {
    mockSearchParams.set(key, value);
  });
  return mockParams;
};

export const resetMocks = () => {
  vi.clearAllMocks();
  mockRouter.replace.mockReset();
  mockSearchParams.clear();
};
