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

  // If we're displaying the full post, remove the first heading (title) from content
  // to avoid duplication since we display the title separately
  const processedContent = isPreview 
    ? (excerpt || content.slice(0, 300) + '...') 
    : content.replace(/^#\s+.*$/m, '').trim();

  return (
    <article className={`prose max-w-none ${isPreview ? 'group cursor-pointer' : ''}`}>
      <header className="mb-6">
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <time dateTime={date} className="transition-colors duration-200 group-hover:text-gray-700 flex items-center">
            <svg className="w-4 h-4 mr-1.5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {formattedDate}
          </time>
          {readingTime && (
            <>
              <span className="mx-2 text-gray-400">•</span>
              <span className="transition-colors duration-200 group-hover:text-gray-700 flex items-center">
                <svg className="w-4 h-4 mr-1.5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {readingTime}
              </span>
            </>
          )}
        </div>
        
        <h1 className={`font-bold text-2xl ${isPreview ? 'md:text-3xl' : 'md:text-4xl'} tracking-tight mb-4 transition-colors duration-200 ${isPreview ? 'group-hover:text-black' : 'text-black'}`}>
          {title}
        </h1>
        
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map(tag => (
              isPreview ? (
                <span key={tag} className="inline-flex items-center text-sm py-1 px-3 rounded-full border border-gray-200 text-gray-600 bg-white">
                  {tag}
                </span>
              ) : (
                <Tag key={tag} name={tag} />
              )
            ))}
          </div>
        )}
      </header>

      <div className="mb-10 prose-p:my-4 prose-headings:mt-8 prose-headings:mb-4 prose-headings:font-semibold prose-a:text-gray-700 hover:prose-a:text-black prose-code:text-gray-800 prose-pre:bg-gray-50 prose-pre:border prose-pre:border-gray-200">
        <ReactMarkdown
          components={{
            code: ({ className, children }) => {
              const match = /language-(\w+)/.exec(className || '');
              return match ? (
                <SyntaxHighlighter
                  style={vs as any}
                  language={match[1]}
                  PreTag="div"
                  className="!bg-gray-50 !border !border-gray-200 !rounded !text-gray-900 !my-6"
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={`${className} bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded font-medium`}>
                  {children}
                </code>
              );
            },
            h2: ({ children }) => (
              <h2 className="text-xl md:text-2xl font-bold text-black tracking-tight mt-12 mb-6 pb-2 border-b border-gray-100">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-lg md:text-xl font-semibold text-black tracking-tight mt-8 mb-4">
                {children}
              </h3>
            ),
            p: ({ children }) => (
              <p className="text-gray-700 leading-relaxed my-4">
                {children}
              </p>
            ),
            a: ({ href, children }) => (
              <a 
                href={href} 
                className="text-gray-700 hover:text-black transition-colors font-medium underline decoration-gray-300 underline-offset-2 hover:decoration-gray-500"
                target={href?.startsWith('http') ? "_blank" : undefined}
                rel={href?.startsWith('http') ? "noopener noreferrer" : undefined}
              >
                {children}
              </a>
            ),
            ul: ({ children }) => (
              <ul className="text-gray-700 my-4 pl-6 space-y-2">
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol className="text-gray-700 my-4 pl-6 space-y-2">
                {children}
              </ol>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-gray-300 pl-4 italic my-6 text-gray-600 bg-gray-50 py-2 pr-2">
                {children}
              </blockquote>
            ),
          }}
        >
          {processedContent}
        </ReactMarkdown>
      </div>

      {isPreview && (
        <footer>
          <span
            className="inline-flex items-center space-x-2 text-gray-700 hover:text-black transition-colors duration-200 font-medium"
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