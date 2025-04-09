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
        { id: 'sample-post', path: `${process.env.PUBLIC_URL}/content/sample-post.md` },
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
    <div className="container-base py-16">
      <section className="section-spacing">
        <h1 className="heading-1">
          Welcome to My Blog
        </h1>
        <p className="body-large">
          Exploring web development, quantum computing, and technology insights.
        </p>
      </section>

      <section className="section-spacing">
        <h2 className="heading-2">
          Latest Posts
        </h2>

        {loading ? (
          <div className="animate-pulse">
            <div className="h-8 bg-warm-gray-100 rounded mb-4 w-3/4"></div>
            <div className="h-4 bg-warm-gray-100 rounded mb-2 w-1/4"></div>
            <div className="h-4 bg-warm-gray-100 rounded mb-6 w-1/2"></div>
            <div className="h-24 bg-warm-gray-100 rounded"></div>
          </div>
        ) : (
          <div className="space-y-20">
            {filteredPosts.map((post) => (
              <Link to={`/blog/${post.id}`} key={post.id} className="block">
                <BlogPost
                  title={post.title}
                  date={post.date}
                  content={post.content}
                  excerpt={post.excerpt}
                  tags={post.tags}
                  readingTime={post.readingTime}
                  isPreview={true}
                />
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="section-spacing">
        <TagList
          tags={tags}
          selectedTags={selectedTags}
          onTagSelect={handleTagSelect}
        />
      </section>

      {filteredPosts.length === 0 && (
        <div className="text-center py-16">
          <p className="body-normal">
            No posts found with the selected tags.
          </p>
        </div>
      )}
    </div>
  );
};

export default Home; 