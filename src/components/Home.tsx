import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import TagList from './TagList';

interface PostMeta {
  id: string;
  title: string;
  date: string;
  category: string;
  tags: string[];
  excerpt: string;
}

interface Post extends PostMeta {
  content: string;
  readingTime: string;
}

const CATEGORIES = ['All', 'Research', 'Learnings', 'Findings', 'Todo', 'Projects'];

const CATEGORY_COLORS: Record<string, string> = {
  Research: 'bg-blue-50 text-blue-700 border-blue-200',
  Learnings: 'bg-green-50 text-green-700 border-green-200',
  Findings: 'bg-amber-50 text-amber-700 border-amber-200',
  Todo: 'bg-purple-50 text-purple-700 border-purple-200',
  Projects: 'bg-rose-50 text-rose-700 border-rose-200',
};

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const manifestResponse = await fetch(`${process.env.PUBLIC_URL}/content/posts.json`);
        const manifest: PostMeta[] = await manifestResponse.json();

        const postsData = await Promise.all(
          manifest.map(async (meta) => {
            try {
              const response = await fetch(`${process.env.PUBLIC_URL}/content/${meta.id}.md`);
              const rawContent = await response.text();

              // Strip frontmatter from content
              const content = rawContent.replace(/^---[\s\S]*?---\n*/, '');

              return {
                ...meta,
                content,
                readingTime: `${Math.max(1, Math.ceil(content.split(/\s+/).length / 200))} min read`,
              };
            } catch (error) {
              console.error(`Error loading post ${meta.id}:`, error);
              return null;
            }
          })
        );

        const validPosts = postsData.filter(Boolean) as Post[];
        validPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setPosts(validPosts);
      } catch (error) {
        console.error('Failed to load posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const tags = useMemo(() => {
    const tagCounts: Record<string, number> = {};
    posts.forEach(post => {
      post.tags?.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });
    return Object.entries(tagCounts).map(([name, count]) => ({ name, count }));
  }, [posts]);

  const filteredPosts = useMemo(() => {
    let result = posts;
    if (selectedCategory !== 'All') {
      result = result.filter(post => post.category === selectedCategory);
    }
    if (selectedTags.length > 0) {
      result = result.filter(post =>
        selectedTags.every(tag => post.tags?.includes(tag))
      );
    }
    return result;
  }, [selectedCategory, selectedTags, posts]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: posts.length };
    posts.forEach(post => {
      counts[post.category] = (counts[post.category] || 0) + 1;
    });
    return counts;
  }, [posts]);

  const handleTagSelect = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-black mb-2 tracking-tight">
          Harsha's Notebook
        </h1>
        <p className="text-lg text-gray-500 mb-6">
          Research · Learnings · Findings · Projects
        </p>
      </section>

      {/* Category Filters */}
      <section className="mb-8">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by category">
          {CATEGORIES.map(category => {
            const count = categoryCounts[category] || 0;
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                role="tab"
                aria-selected={isActive}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-1.5 text-sm font-medium rounded-full border transition-colors duration-200 ${
                  isActive
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400 hover:text-gray-900'
                }`}
              >
                {category}
                {count > 0 && (
                  <span className="ml-1.5 text-gray-400">
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* Posts List */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <h2 className="text-lg font-semibold text-black">
              {selectedCategory === 'All' ? 'All Posts' : selectedCategory}
            </h2>
            <div className="h-px flex-grow bg-gray-100 ml-4 min-w-[2rem]"></div>
          </div>
          <span className="text-sm text-gray-400 ml-4 whitespace-nowrap">
            {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'}
          </span>
        </div>

        {loading ? (
          <div className="space-y-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="animate-pulse p-6 border border-gray-100 rounded">
                <div className="h-4 bg-gray-100 rounded w-1/4 mb-3"></div>
                <div className="h-6 bg-gray-100 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-gray-100 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-lg mb-2">No posts yet in this category.</p>
            <p className="text-sm">Check back soon or browse other categories.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPosts.map(post => (
              <Link to={`/blog/${post.id}`} key={post.id} className="block group">
                <div className="p-5 border border-gray-100 hover:border-gray-300 transition-all duration-200 bg-white rounded">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${CATEGORY_COLORS[post.category] || 'bg-gray-50 text-gray-600 border-gray-200'}`}>
                      {post.category}
                    </span>
                    <time className="text-xs text-gray-400" dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </time>
                    <span className="text-xs text-gray-400">· {post.readingTime}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-black mb-1.5 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3 line-clamp-2">{post.excerpt}</p>
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.map(tag => (
                        <span key={tag} className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Topics Section */}
      <section className="border-t border-gray-100 pt-8">
        <div className="flex items-center mb-6">
          <h2 className="text-lg font-semibold text-black">Topics</h2>
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