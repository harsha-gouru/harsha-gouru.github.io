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
  tags?: string[];
}

// For GitHub Pages to work correctly with React Router
const basename = process.env.PUBLIC_URL;

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
        
        const content = await response.text();
        
        // Simple parser for frontmatter and content
        const title = content.match(/# (.*)/)?.[1] || 'Untitled Post';
        
        // Get tags from content (simple implementation)
        const tagsMatch = content.match(/\*\*(.*?)\*\*/g);
        const tags = tagsMatch ? 
          Array.from(new Set(tagsMatch.map(tag => tag.replace(/\*\*/g, '')))) : 
          [];
        
        setPost({
          id,
          title,
          date: new Date().toISOString(),
          content,
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
      <div className="container-base py-16 animate-pulse">
        <div className="h-10 bg-warm-gray-100 rounded w-3/4 mb-8"></div>
        <div className="h-4 bg-warm-gray-100 rounded w-1/4 mb-12"></div>
        <div className="space-y-4">
          <div className="h-4 bg-warm-gray-100 rounded"></div>
          <div className="h-4 bg-warm-gray-100 rounded"></div>
          <div className="h-4 bg-warm-gray-100 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="container-base py-16">
        <div className="card">
          <h1 className="heading-2">Post Not Found</h1>
          <p className="body-normal mb-8">
            {error || 'We couldn\'t find the post you\'re looking for.'}
          </p>
          <Link 
            to="/" 
            className="btn btn-secondary"
          >
            ← Back to Home
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
          className="inline-flex items-center text-cyan-600 hover:text-cyan-700 font-medium transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-2">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
          </svg>
          <span>Back to all posts</span>
        </Link>
      </div>

      <BlogPost
        title={post.title}
        date={post.date}
        content={post.content}
        tags={post.tags}
        readingTime={`${Math.ceil(post.content.length / 1000)} min read`}
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
