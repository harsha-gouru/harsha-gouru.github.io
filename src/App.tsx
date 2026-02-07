import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams, Navigate, Link } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import About from './components/About';
import BlogPost from './components/BlogPost';

interface Post {
  id: string;
  title: string;
  date: string;
  content: string;
  category?: string;
  tags?: string[];
}

// For GitHub Pages to work correctly with React Router
const basename = process.env.PUBLIC_URL;

const parseFrontmatter = (raw: string): { data: Record<string, any>; content: string } => {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) {
    return { data: {}, content: raw };
  }
  const frontmatter = match[1];
  const content = match[2];
  const data: Record<string, any> = {};
  frontmatter.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) return;
    const key = line.slice(0, colonIndex).trim();
    let value = line.slice(colonIndex + 1).trim();
    // Remove surrounding quotes
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    // Parse arrays
    if (value.startsWith('[') && value.endsWith(']')) {
      data[key] = value.slice(1, -1).split(',').map(v => v.trim().replace(/^["']|["']$/g, ''));
    } else {
      data[key] = value;
    }
  });
  return { data, content };
};

const BlogPostRoute: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (!id) {
          setError('Post ID is missing');
          setLoading(false);
          return;
        }

        const response = await fetch(`${process.env.PUBLIC_URL}/content/${id}.md`);
        if (!response.ok) {
          throw new Error(`Failed to load post: ${response.statusText}`);
        }
        
        const raw = await response.text();
        const { data, content } = parseFrontmatter(raw);
        
        const title = data.title || content.match(/# (.*)/)?.[1] || 'Untitled Post';
        const date = data.date || new Date().toISOString().split('T')[0];
        const category = data.category || '';
        const tags = Array.isArray(data.tags) ? data.tags : [];
        
        setPost({
          id,
          title,
          date,
          content,
          category,
          tags
        });
      } catch (error) {
        console.error('Error loading post:', error);
        setError('Failed to load post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto py-16 px-4 sm:px-6 animate-pulse">
        <div className="h-4 bg-gray-100 rounded w-24 mb-8"></div>
        <div className="h-10 bg-gray-100 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-100 rounded w-1/4 mb-12"></div>
        <div className="space-y-4">
          <div className="h-4 bg-gray-100 rounded"></div>
          <div className="h-4 bg-gray-100 rounded"></div>
          <div className="h-4 bg-gray-100 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="max-w-3xl mx-auto py-16 px-4 sm:px-6">
        <div className="border border-gray-100 rounded p-8">
          <h1 className="text-2xl font-bold text-black mb-4">Post Not Found</h1>
          <p className="text-gray-500 mb-8">
            {error || "We couldn't find the post you're looking for."}
          </p>
          <Link 
            to="/" 
            className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-black transition-colors"
          >
            ← Back to all posts
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6">
      <div className="mb-6">
        <Link 
          to="/" 
          className="inline-flex items-center text-sm text-gray-500 hover:text-black font-medium transition-colors"
        >
          ← Back to all posts
        </Link>
      </div>

      <BlogPost
        title={post.title}
        date={post.date}
        content={post.content}
        category={post.category}
        tags={post.tags}
        readingTime={`${Math.max(1, Math.ceil(post.content.split(/\s+/).length / 200))} min read`}
      />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router basename={basename}>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog/:id" element={<BlogPostRoute />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
