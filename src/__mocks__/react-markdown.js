import React from 'react';

// Mock ReactMarkdown for testing
const ReactMarkdown = ({ children }) => {
  return React.createElement('div', { 'data-testid': 'markdown-content' }, children);
};

export default ReactMarkdown;
