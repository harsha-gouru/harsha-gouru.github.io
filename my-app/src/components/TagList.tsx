import React from 'react';
import Tag from './Tag';

interface TagListProps {
  tags: { name: string; count: number }[];
  selectedTags: string[];
  onTagSelect: (tag: string) => void;
}

const TagList: React.FC<TagListProps> = ({ tags, selectedTags, onTagSelect }) => {
  return (
    <div className="mb-16">
      <h2 className="text-sm tracking-widest uppercase text-warm-gray-900 mb-6">
        Filter by topic
      </h2>
      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <Tag
            key={tag.name}
            name={tag.name}
            count={tag.count}
            isButton
            isSelected={selectedTags.includes(tag.name)}
            onClick={() => onTagSelect(tag.name)}
          />
        ))}
      </div>
    </div>
  );
};

export default TagList; 