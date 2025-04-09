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
        <div className="flex items-center text-sm text-slate-400 mb-2">
          <time dateTime={date} className="transition-colors duration-300 group-hover:text-slate-600 flex items-center">
            <svg className="w-4 h-4 mr-1.5 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {formattedDate}
          </time>
          {readingTime && (
            <>
              <span className="mx-2 text-slate-300">•</span>
              <span className="transition-colors duration-300 group-hover:text-slate-600 flex items-center">
                <svg className="w-4 h-4 mr-1.5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {readingTime}
              </span>
            </>
          )}
        </div>
        
        <h1 className={`font-bold text-2xl ${isPreview ? 'md:text-3xl' : 'md:text-4xl'} tracking-tight mb-4 transition-colors duration-300 ${isPreview ? 'group-hover:text-cyan-700' : 'text-slate-900'}`}>
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

      <div className="mb-10 prose-p:my-4 prose-headings:mt-8 prose-headings:mb-4 prose-headings:font-semibold prose-a:text-cyan-600 hover:prose-a:text-cyan-700 prose-code:text-indigo-600 prose-pre:bg-slate-50 prose-pre:border prose-pre:border-slate-200 prose-pre:shadow-sm">
        <ReactMarkdown
          components={{
            code: ({ className, children }) => {
              const match = /language-(\w+)/.exec(className || '');
              return match ? (
                <SyntaxHighlighter
                  style={vs as any}
                  language={match[1]}
                  PreTag="div"
                  className="!bg-slate-50 !border !border-slate-200 !rounded-md !text-slate-800 !my-6 !shadow-sm"
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={`${className} bg-slate-100 text-indigo-600 px-1.5 py-0.5 rounded-md font-medium`}>
                  {children}
                </code>
              );
            },
            h2: ({ children }) => (
              <h2 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight mt-12 mb-6 pb-2 border-b border-slate-100">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-lg md:text-xl font-semibold text-slate-800 tracking-tight mt-8 mb-4">
                {children}
              </h3>
            ),
            p: ({ children }) => (
              <p className="text-slate-700 leading-relaxed my-4">
                {children}
              </p>
            ),
            a: ({ href, children }) => (
              <a 
                href={href} 
                className="text-cyan-600 hover:text-cyan-700 transition-colors font-medium underline decoration-cyan-200 decoration-2 underline-offset-2 hover:decoration-cyan-400"
                target={href?.startsWith('http') ? "_blank" : undefined}
                rel={href?.startsWith('http') ? "noopener noreferrer" : undefined}
              >
                {children}
              </a>
            ),
            ul: ({ children }) => (
              <ul className="text-slate-700 my-4 pl-6 space-y-2">
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol className="text-slate-700 my-4 pl-6 space-y-2">
                {children}
              </ol>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-cyan-300 pl-4 italic my-6 text-slate-600 bg-slate-50/50 py-2 pr-2 rounded-r">
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
            className="inline-flex items-center space-x-2 text-cyan-600 tracking-wide group-hover:text-cyan-700 transition-colors duration-300 font-medium"
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