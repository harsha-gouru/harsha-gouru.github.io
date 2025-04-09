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
  const baseClasses = "inline-flex items-center text-sm tracking-wider py-1 px-3 rounded-md transition-colors duration-300";
  const buttonClasses = isSelected
    ? "btn-primary"
    : "btn-secondary";
  const linkClasses = "border border-warm-gray-200 text-warm-gray-600 hover:text-warm-gray-900 hover:border-warm-gray-400";

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