import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import About from './components/About';
import BlogPost from './components/BlogPost';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/blog/:id"
            element={
              <BlogPost
                title="Getting Started with React and TypeScript"
                date="2024-03-15"
                content={`
# Getting Started with React and TypeScript

React and TypeScript are a powerful combination for building modern web applications. In this post, we'll explore how to set up a new project and cover some basic concepts.

## Why TypeScript?

TypeScript adds static typing to JavaScript, which helps catch errors early and improves the development experience with better tooling support.

## Setting Up a New Project

To create a new React project with TypeScript, you can use Create React App:

\`\`\`bash
npx create-react-app my-app --template typescript
\`\`\`

## Basic Example

Here's a simple component written in TypeScript:

\`\`\`typescript
interface GreetingProps {
  name: string;
}

const Greeting: React.FC<GreetingProps> = ({ name }) => {
  return <h1>Hello, {name}!</h1>;
};
\`\`\`

Stay tuned for more React and TypeScript tips!
                `}
                tags={['React', 'TypeScript', 'Development']}
              />
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
