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
      <header className="mb-10">
        <div className="flex items-center space-x-4 text-sm text-warm-gray-400 tracking-wide mb-4">
          <time dateTime={date} className="transition-colors duration-300 group-hover:text-warm-gray-600">
            {formattedDate}
          </time>
          {readingTime && (
            <>
              <span className="text-warm-gray-200">•</span>
              <span className="transition-colors duration-300 group-hover:text-warm-gray-600">
                {readingTime}
              </span>
            </>
          )}
        </div>
        <h1 className={`font-normal tracking-tighter mb-4 transition-colors duration-300 ${isPreview ? 'group-hover:text-warm-gray-700' : ''}`}>
          {title}
        </h1>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
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
                  className="!bg-warm-gray-50 !border !border-warm-gray-200 !rounded-sm !text-warm-gray-800"
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
              <p className="text-warm-gray-600 tracking-normal leading-relaxed transition-colors duration-300 group-hover:text-warm-gray-700">
                {children}
              </p>
            ),
            h2: ({ children }) => (
              <h2 className="text-xl md:text-2xl font-normal text-warm-gray-800 tracking-normal mt-12 mb-6">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-lg md:text-xl font-normal text-warm-gray-800 tracking-normal mt-8 mb-4">
                {children}
              </h3>
            ),
          }}
        >
          {isPreview ? excerpt || content.slice(0, 300) + '...' : content}
        </ReactMarkdown>
      </div>

      {isPreview && (
        <footer>
          <span
            className="inline-flex items-center space-x-2 text-warm-gray-500 tracking-wide group-hover:text-warm-gray-900 transition-colors duration-300"
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