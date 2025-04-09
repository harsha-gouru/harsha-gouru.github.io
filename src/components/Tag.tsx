import React from 'react';
import { Link } from 'react-router-dom';

interface TagProps {
  name: string;
  count?: number;
  isButton?: boolean;
  isSelected?: boolean;
  onClick?: () => void;
}

const Tag: React.FC<TagProps> = ({ 
  name, 
  count, 
  isButton = false, 
  isSelected = false,
  onClick 
}) => {
  const baseClasses = "inline-flex items-center text-sm tracking-wider py-1 px-3 rounded-sm transition-colors duration-300";
  const buttonClasses = isSelected
    ? "bg-warm-gray-900 text-warm-gray-50"
    : "bg-warm-gray-100 text-warm-gray-700 hover:bg-warm-gray-200";
  const linkClasses = "text-warm-gray-600 hover:text-warm-gray-900";

  if (isButton) {
    return (
      <button
        onClick={onClick}
        className={`${baseClasses} ${buttonClasses}`}
      >
        {name}
        {count !== undefined && (
          <span className={`ml-2 ${isSelected ? 'text-warm-gray-300' : 'text-warm-gray-500'}`}>
            {count}
          </span>
        )}
      </button>
    );
  }

  return (
    <Link
      to={`/tags/${name.toLowerCase()}`}
      className={`${baseClasses} ${linkClasses}`}
    >
      {name}
      {count !== undefined && (
        <span className="ml-2 text-warm-gray-400">
          {count}
        </span>
      )}
    </Link>
  );
};

export default Tag; 