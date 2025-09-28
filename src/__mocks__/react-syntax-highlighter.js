import React from 'react';

// Mock react-syntax-highlighter for testing
export const Prism = ({ children, language }) => {
  return React.createElement('pre', { 
    'data-testid': 'syntax-highlighter',
    'data-language': language 
  }, children);
};

const SyntaxHighlighter = ({ children, language }) => {
  return React.createElement('pre', { 
    'data-testid': 'syntax-highlighter',
    'data-language': language 
  }, children);
};

export default SyntaxHighlighter;
