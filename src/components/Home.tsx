import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import BlogPost from './BlogPost';
import TagList from './TagList';

interface Post {
  id: string;
  title: string;
  date: string;
  content: string;
  excerpt?: string;
  tags?: string[];
  readingTime: string;
}

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // For GitHub Pages, we need to use relative paths
        const postModules = [
          { id: 'hello-world', path: `${process.env.PUBLIC_URL}/content/hello-world.md` },
          { id: 'quantum-computing-basics', path: `${process.env.PUBLIC_URL}/content/quantum-computing-basics.md` },
          { id: 'modern-web-development', path: `${process.env.PUBLIC_URL}/content/modern-web-development.md` },
          { id: 'javascript-best-practices', path: `${process.env.PUBLIC_URL}/content/javascript-best-practices.md` }
        ];

        const postsData = await Promise.all(
          postModules.map(async (module) => {
            try {
              const response = await fetch(module.path);
              const content = await response.text();
              
              // Simple parser for frontmatter and content
              const title = content.match(/# (.*)/)?.[1] || 'Untitled Post';
              
              // Get date from filename or use current date
              const date = new Date().toISOString();
              
              // Get tags from content (simple implementation)
              const tagsMatch = content.match(/\*\*(.*?)\*\*/g);
              const tags = tagsMatch ? 
                Array.from(new Set(tagsMatch.map(tag => tag.replace(/\*\*/g, '')))) : 
                [];
              
              return {
                id: module.id,
                title,
                date,
                content,
                excerpt: content.split('\n\n')[1] || '',
                tags,
                readingTime: `${Math.ceil(content.length / 1000)} min read`
              };
            } catch (error) {
              console.error(`Error loading post ${module.id}:`, error);
              return null;
            }
          })
        );

        setPosts(postsData.filter(Boolean) as Post[]);
      } catch (error) {
        console.error('Failed to load posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const tags = useMemo(() => {
    const tagCounts: { [key: string]: number } = {};
    posts.forEach(post => {
      post.tags?.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });
    return Object.entries(tagCounts).map(([name, count]) => ({ name, count }));
  }, [posts]);

  const filteredPosts = useMemo(() => {
    if (selectedTags.length === 0) return posts;
    return posts.filter(post =>
      selectedTags.every(tag => post.tags?.includes(tag))
    );
  }, [selectedTags, posts]);

  const handleTagSelect = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <section className="mb-16 pb-8 border-b border-gray-100">
        <h1 className="text-4xl font-bold text-black mb-4">
          Welcome to my blog
        </h1>
        <p className="text-xl text-gray-600 mb-4 max-w-2xl">
          Thoughts on quantum computing, web development, and artificial intelligence.
        </p>
        <div className="flex flex-wrap gap-2 mt-6">
          <div className="inline-flex items-center text-sm text-gray-600 border border-gray-200 px-3 py-1 rounded-full">
            <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Updated regularly
          </div>
        </div>
      </section>

      <section className="mb-16">
        <div className="flex items-center mb-8">
          <h2 className="text-2xl font-semibold text-black">
            Latest Posts
          </h2>
          <div className="h-px flex-grow bg-gray-100 ml-4"></div>
        </div>

        {loading ? (
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-100 rounded mb-4 w-3/4"></div>
            <div className="h-4 bg-gray-100 rounded mb-2 w-1/4"></div>
            <div className="h-4 bg-gray-100 rounded mb-6 w-1/2"></div>
            <div className="h-24 bg-gray-100 rounded"></div>
          </div>
        ) : (
          <div className="space-y-12">
            {filteredPosts.map((post, index) => (
              <Link to={`/blog/${post.id}`} key={post.id} className="block">
                <div className="group p-6 border border-gray-100 hover:border-gray-300 transition-colors duration-300 bg-white rounded">
                  <BlogPost
                    title={post.title}
                    date={post.date}
                    content={post.content}
                    excerpt={post.excerpt}
                    tags={post.tags}
                    readingTime={post.readingTime}
                    isPreview={true}
                  />
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="border-t border-gray-100 pt-8">
        <div className="flex items-center mb-6">
          <h2 className="text-xl font-semibold text-black">
            Topics
          </h2>
          <div className="h-px flex-grow bg-gray-100 ml-4"></div>
        </div>
        <TagList
          tags={tags}
          selectedTags={selectedTags}
          onTagSelect={handleTagSelect}
        />
      </section>
    </div>
  );
};

export default Home; 