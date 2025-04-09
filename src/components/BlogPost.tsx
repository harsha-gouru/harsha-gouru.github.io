import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Tag from './Tag';

interface BlogPostProps {
  title: string;
  date: string;
  content: string;
  excerpt?: string;
  tags?: string[];
  readingTime?: string;
  isPreview?: boolean;
}

const BlogPost: React.FC<BlogPostProps> = ({
  title,
  date,
  content,
  excerpt,
  tags = [],
  readingTime,
  isPreview = false
}) => {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <article className={`prose ${isPreview ? 'group cursor-pointer' : ''}`}>
      <header className="mb-8">
        <div className="flex items-center body-small mb-3">
          <time dateTime={date} className="transition-colors duration-300 group-hover:text-warm-gray-600">
            {formattedDate}
          </time>
          {readingTime && (
            <>
              <span className="mx-2 text-warm-gray-300">•</span>
              <span className="transition-colors duration-300 group-hover:text-warm-gray-600">
                {readingTime}
              </span>
            </>
          )}
        </div>
        
        <h1 className={`heading-1 mb-4 transition-colors duration-300 ${isPreview ? 'group-hover:text-warm-gray-700' : ''}`}>
          {title}
        </h1>
        
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map(tag => (
              <Tag key={tag} name={tag} />
            ))}
          </div>
        )}
      </header>

      <div className="mb-10">
        <ReactMarkdown
          components={{
            code: ({ className, children }) => {
              const match = /language-(\w+)/.exec(className || '');
              return match ? (
                <SyntaxHighlighter
                  style={vs as any}
                  language={match[1]}
                  PreTag="div"
                  className="!bg-warm-gray-50 !border !border-warm-gray-200 !rounded-sm !text-warm-gray-800 my-8"
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={`${className} bg-warm-gray-50 text-warm-gray-800 px-2 py-1 rounded-sm`}>
                  {children}
                </code>
              );
            },
            p: ({ children }) => (
              <p className="body-normal my-6 transition-colors duration-300 group-hover:text-warm-gray-700">
                {children}
              </p>
            ),
            h2: ({ children }) => (
              <h2 className="heading-2 mt-12">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="heading-3 mt-8">
                {children}
              </h3>
            ),
            ul: ({ children }) => (
              <ul className="my-6 space-y-2 text-warm-gray-700">
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol className="my-6 space-y-2 text-warm-gray-700">
                {children}
              </ol>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-2 border-warm-gray-300 pl-6 my-8 italic text-warm-gray-600">
                {children}
              </blockquote>
            ),
          }}
        >
          {isPreview ? excerpt || content.slice(0, 300) + '...' : content}
        </ReactMarkdown>
      </div>

      {isPreview && (
        <footer className="mt-8 pt-4 border-t border-warm-gray-100">
          <span
            className="inline-flex items-center space-x-2 btn-secondary px-4 py-2"
          >
            <span>Continue reading</span>
            <span className="transform transition-transform group-hover:translate-x-1">→</span>
          </span>
        </footer>
      )}
    </article>
  );
};

export default BlogPost; 