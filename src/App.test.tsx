import React from 'react';
import { render, screen } from '@testing-library/react';

// Mock react-markdown (ESM module incompatible with Jest)
jest.mock('react-markdown', () => {
  const mockReact = require('react');
  return ({ children }: { children: string }) =>
    mockReact.createElement('div', { 'data-testid': 'markdown' }, children);
});

jest.mock('react-syntax-highlighter', () => ({
  Prism: ({ children }: { children: string }) => {
    const mockReact = require('react');
    return mockReact.createElement('pre', null, children);
  },
}));

jest.mock('react-syntax-highlighter/dist/esm/styles/prism', () => ({
  vs: {},
}));

import App from './App';

test('renders the notebook header', () => {
  render(<App />);
  const heading = screen.getByRole('heading', { name: /Harsha's Notebook/i });
  expect(heading).toBeInTheDocument();
});
