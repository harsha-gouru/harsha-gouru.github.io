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
  const baseClasses = "inline-flex items-center text-sm py-1 px-3 rounded-full transition-colors duration-200";
  
  const buttonClasses = isSelected
    ? "bg-black text-white border border-black"
    : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-100 hover:text-gray-900";
  
  const linkClasses = "border border-gray-200 text-gray-600 bg-white hover:text-black hover:border-gray-300";

  if (isButton) {
    return (
      <button
        onClick={onClick}
        className={`${baseClasses} ${buttonClasses}`}
      >
        {name}
        {count !== undefined && (
          <span className={`ml-2 ${isSelected ? 'text-gray-400' : 'text-gray-500'}`}>
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
        <span className="ml-2 text-gray-500">
          {count}
        </span>
      )}
    </Link>
  );
};

export default Tag; 