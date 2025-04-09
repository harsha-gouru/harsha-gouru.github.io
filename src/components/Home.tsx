import React, { useState, useMemo } from 'react';
import BlogPost from './BlogPost';
import TagList from './TagList';

interface Post {
  title: string;
  date: string;
  content: string;
  excerpt: string;
  tags: string[];
  readingTime: string;
}

const samplePosts: Post[] = [
  {
    title: 'The Art of Minimalism in Web Design',
    date: '2024-04-08',
    content: '# The Art of Minimalism in Web Design\n\nMinimalism in web design is more than just a visual style...',
    excerpt: 'Exploring how minimalism in web design can enhance user experience and content clarity.',
    tags: ['Design', 'Web', 'UX'],
    readingTime: '5 min read'
  },
  {
    title: 'Building with TypeScript and React',
    date: '2024-04-07',
    content: '# Building with TypeScript and React\n\nTypeScript has become an essential tool...',
    excerpt: 'A deep dive into using TypeScript with React for better development experience.',
    tags: ['TypeScript', 'React', 'Development'],
    readingTime: '8 min read'
  },
  {
    title: 'The Power of White Space',
    date: '2024-04-06',
    content: '# The Power of White Space\n\nWhite space, or negative space...',
    excerpt: 'Understanding how white space can improve readability and visual hierarchy.',
    tags: ['Design', 'Typography', 'UX'],
    readingTime: '6 min read'
  }
];

const Home: React.FC = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const tags = useMemo(() => {
    const tagCounts: { [key: string]: number } = {};
    samplePosts.forEach(post => {
      post.tags.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });
    return Object.entries(tagCounts).map(([name, count]) => ({ name, count }));
  }, []);

  const filteredPosts = useMemo(() => {
    if (selectedTags.length === 0) return samplePosts;
    return samplePosts.filter(post =>
      selectedTags.every(tag => post.tags.includes(tag))
    );
  }, [selectedTags]);

  const handleTagSelect = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="max-w-2xl mx-auto px-6 md:px-8 py-16">
      <header className="mb-24">
        <h1 className="text-3xl md:text-4xl font-normal tracking-normal text-warm-gray-900 mb-8">
          Notes on Design & Development
        </h1>
        <p className="text-warm-gray-600 tracking-normal leading-relaxed max-w-xl">
          Exploring the intersection of minimalist design, web development, and user experience.
          Here you'll find my thoughts, experiments, and learnings.
        </p>
      </header>

      <TagList
        tags={tags}
        selectedTags={selectedTags}
        onTagSelect={handleTagSelect}
      />

      <div className="divide-y divide-warm-gray-200">
        {filteredPosts.map((post, index) => (
          <div 
            key={post.title}
            className={`
              py-16 first:pt-0 
              ${index === 0 ? 'lg:pt-0' : ''} 
              ${index === filteredPosts.length - 1 ? 'border-b border-warm-gray-200' : ''}
              hover:bg-warm-gray-50/50 transition-colors duration-300
            `}
          >
            <BlogPost
              {...post}
              isPreview
            />
          </div>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-16">
          <p className="text-warm-gray-500 tracking-wide">
            No posts found with the selected tags.
          </p>
        </div>
      )}
    </div>
  );
};

export default Home; 