#!/usr/bin/env node

/**
 * This script processes files from the content/_incoming directory
 * and moves them to the appropriate content directories
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const INCOMING_DIR = path.join(process.cwd(), 'content', '_incoming');
const POSTS_DIR = path.join(process.cwd(), 'content', 'posts');
const PROCESSED_DIR = path.join(process.cwd(), 'content', '_processed');

// Ensure directories exist
[INCOMING_DIR, POSTS_DIR, PROCESSED_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
});

// Get all files from incoming directory
const files = fs.readdirSync(INCOMING_DIR).filter(file => file.endsWith('.md'));

if (files.length === 0) {
  console.log('No files to process in _incoming directory');
  process.exit(0);
}

console.log(`Found ${files.length} files to process`);

// Process each file
files.forEach(file => {
  const incomingPath = path.join(INCOMING_DIR, file);
  const content = fs.readFileSync(incomingPath, 'utf8');
  
  // Parse frontmatter
  const { data, content: markdownContent } = matter(content);
  
  // Generate a slug from the title if not provided
  const slug = data.slug || 
    data.title.toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
  
  // Format date if provided
  let date = data.date ? new Date(data.date) : new Date();
  const formattedDate = date.toISOString().split('T')[0];
  
  // Create a filename with date prefix
  const newFilename = `${formattedDate}-${slug}.md`;
  const postsPath = path.join(POSTS_DIR, newFilename);
  
  // Create updated frontmatter with date
  const updatedData = {
    ...data,
    date: formattedDate,
    published: true
  };
  
  // Stringify the content with updated frontmatter
  const updatedContent = matter.stringify(markdownContent, updatedData);
  
  // Write to posts directory
  fs.writeFileSync(postsPath, updatedContent);
  console.log(`Processed and moved: ${file} → ${newFilename}`);
  
  // Move original to processed folder
  const processedPath = path.join(PROCESSED_DIR, file);
  fs.renameSync(incomingPath, processedPath);
  console.log(`Moved original to processed folder: ${file}`);
});

console.log('All files processed successfully!'); 