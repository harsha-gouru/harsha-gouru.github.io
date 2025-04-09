import React from 'react';
import { useParams } from 'react-router-dom';
import BlogPost from '../components/BlogPost';

interface BlogPost {
  title: string;
  date: string;
  content: string;
  tags: string[];
}

const Blog: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // This would typically come from an API or database
  const post: BlogPost = {
    title: "Getting Started with React and TypeScript",
    date: "2024-03-15",
    content: `# Getting Started with React and TypeScript

A comprehensive guide to setting up and using TypeScript with React...

## Why TypeScript?

TypeScript adds static typing to JavaScript, making your code more robust and maintainable...

## Setting Up Your Project

First, create a new React project with TypeScript support...

## Key Concepts

1. Type Annotations
2. Interfaces
3. Generics
4. Component Props

## Best Practices

- Always define prop interfaces
- Use type inference when possible
- Leverage union types for variants

## Example

\`\`\`typescript
interface ButtonProps {
  variant: 'primary' | 'secondary';
  onClick: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant,
  onClick,
  children
}) => {
  return (
    <button
      className={\`btn btn-\${variant}\`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
\`\`\`

## Conclusion

TypeScript is a powerful tool that can significantly improve your React development experience...`,
    tags: ['React', 'TypeScript', 'Development']
  };

  return (
    <div className="max-w-4xl mx-auto">
      <BlogPost {...post} />
    </div>
  );
};

export default Blog; 