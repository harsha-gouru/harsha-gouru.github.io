import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import About from './components/About';

// Wrap components that use React Router with BrowserRouter
const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

test('renders layout component', () => {
  renderWithRouter(
    <Layout>
      <div>Test Content</div>
    </Layout>
  );
  
  const blogTitle = screen.getByText(/Harsha's Blog/i);
  expect(blogTitle).toBeInTheDocument();
});

test('renders about page', () => {
  renderWithRouter(<About />);
  
  const aboutTitle = screen.getByText(/About Me/i);
  expect(aboutTitle).toBeInTheDocument();
  
  const description = screen.getByText(/software developer/i);
  expect(description).toBeInTheDocument();
});
