import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="prose dark:prose-invert mx-auto">
      <h1 className="text-4xl font-bold mb-8">Welcome to My Blog</h1>
      <p className="text-lg mb-6">
        Hi! I'm Harsha, and this is my personal blog where I share my thoughts, experiences,
        and learnings about technology, programming, and more.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Latest Posts</h2>
          <p>Check out my most recent blog posts about various topics in tech and programming.</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">About Me</h2>
          <p>Learn more about my background, interests, and what I'm currently working on.</p>
        </div>
      </div>
    </div>
  );
};

export default Home; 