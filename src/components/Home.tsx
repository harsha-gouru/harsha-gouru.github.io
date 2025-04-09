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
    <div className="max-w-5xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <section className="mb-16">
        <div className="bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 rounded-2xl p-8 shadow-xl">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
            Tech & AI Explorations
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed mb-8 max-w-3xl">
            Navigating the intersection of quantum computing, web development, and artificial intelligence. 
            Join me on this journey through the digital frontier.
          </p>
          <div className="flex space-x-4 mb-2">
            <div className="inline-flex items-center px-3 py-2 border border-cyan-500 rounded-full text-sm text-cyan-400 bg-slate-800 mt-2 shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-2">
                <path d="M13 7L11 7v2h2v2h-2v2h2v2h-2v2h2a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2z"/>
                <path d="M7 9h2V7H7v2zm0 6h2v-2H7v2zm14-8v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2zm-2 0H5v10h14V7z"/>
              </svg>
              <span>Quantum Computing</span>
            </div>
            <div className="inline-flex items-center px-3 py-2 border border-purple-500 rounded-full text-sm text-purple-400 bg-slate-800 mt-2 shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-2">
                <path d="M12 16.54L19.37 10.8L21 12.07L12 19.07L3 12.07L4.62 10.81L12 16.54Z"/>
                <path d="M12 14L3 7L12 0L21 7L12 14ZM12 2.53L6.26 7L12 11.47L17.74 7L12 2.53Z"/>
              </svg>
              <span>Web Development</span>
            </div>
            <div className="inline-flex items-center px-3 py-2 border border-blue-500 rounded-full text-sm text-blue-400 bg-slate-800 mt-2 shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-2">
                <path d="M21,16V4H3V16H21M21,2A2,2 0 0,1 23,4V16A2,2 0 0,1 21,18H14V20H16V22H8V20H10V18H3A2,2 0 0,1 1,16V4A2,2 0 0,1 3,2H21M5,6H14V10H5V6M5,12H9V14H5V12M10,12H14V14H10V12M15,6H19V14H15V6Z"/>
              </svg>
              <span>Artificial Intelligence</span>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-center mb-8">
          <h2 className="text-2xl font-semibold tracking-tight bg-gradient-to-r from-cyan-600 to-purple-600 text-transparent bg-clip-text">
            Latest Insights
          </h2>
          <div className="h-px flex-grow bg-gradient-to-r from-cyan-500/30 to-purple-500/30 ml-4"></div>
        </div>

        {loading ? (
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-slate-200 rounded-md mb-4 w-3/4"></div>
            <div className="h-4 bg-slate-200 rounded-md mb-2 w-1/4"></div>
            <div className="h-4 bg-slate-200 rounded-md mb-6 w-1/2"></div>
            <div className="h-24 bg-slate-200 rounded-md"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredPosts.map((post, index) => (
              <Link to={`/blog/${post.id}`} key={post.id} className="block">
                <div className="group h-full p-6 rounded-lg border border-slate-200 hover:border-cyan-300 hover:shadow-lg hover:shadow-cyan-100/20 transition-all duration-300 bg-white backdrop-blur-sm">
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

      <section className="mt-16 pt-8 border-t border-slate-200">
        <div className="flex items-center mb-6">
          <h2 className="text-xl font-semibold tracking-tight bg-gradient-to-r from-cyan-600 to-purple-600 text-transparent bg-clip-text">
            Explore by Topic
          </h2>
          <div className="h-px flex-grow bg-gradient-to-r from-cyan-500/30 to-purple-500/30 ml-4"></div>
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