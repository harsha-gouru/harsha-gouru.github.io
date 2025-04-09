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
  const baseClasses = "inline-flex items-center text-sm py-1 px-3 rounded-full transition-all duration-300";
  
  const buttonClasses = isSelected
    ? "bg-slate-800 text-cyan-300 border border-cyan-500 shadow-sm"
    : "bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200 hover:text-slate-800";
  
  const linkClasses = "border border-slate-200 text-slate-600 bg-slate-50 hover:text-slate-900 hover:border-cyan-300 hover:shadow-sm";

  if (isButton) {
    return (
      <button
        onClick={onClick}
        className={`${baseClasses} ${buttonClasses}`}
      >
        {name}
        {count !== undefined && (
          <span className={`ml-2 ${isSelected ? 'bg-slate-700 text-slate-300 px-1.5 py-0.5 rounded-full text-xs' : 'text-slate-500'}`}>
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
        <span className="ml-2 bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-full text-xs">
          {count}
        </span>
      )}
    </Link>
  );
};

export default Tag; 