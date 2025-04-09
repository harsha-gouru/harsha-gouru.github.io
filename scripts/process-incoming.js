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
const ERROR_DIR = path.join(process.cwd(), 'content', '_error');

// Ensure directories exist
[INCOMING_DIR, POSTS_DIR, PROCESSED_DIR, ERROR_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
});

// Get all files from incoming directory
let files = [];
try {
  files = fs.readdirSync(INCOMING_DIR).filter(file => file.endsWith('.md'));
  console.log(`Found ${files.length} markdown files in _incoming directory`);
} catch (error) {
  console.error(`Error reading incoming directory: ${error.message}`);
  process.exit(1);
}

if (files.length === 0) {
  console.log('No files to process in _incoming directory');
  process.exit(0);
}

// Counter for successful and failed files
let successCount = 0;
let errorCount = 0;

// Process each file
files.forEach(file => {
  console.log(`\nProcessing file: ${file}`);
  const incomingPath = path.join(INCOMING_DIR, file);
  
  try {
    // Read the file
    const content = fs.readFileSync(incomingPath, 'utf8');
    console.log(`Read file: ${file} (${content.length} bytes)`);
    
    // Parse frontmatter with error handling
    let parsedContent;
    try {
      parsedContent = matter(content);
      console.log(`Parsed frontmatter successfully`);
    } catch (parseError) {
      console.error(`Error parsing frontmatter in ${file}: ${parseError.message}`);
      
      // Create minimal frontmatter if missing
      parsedContent = {
        data: {
          title: file.replace('.md', ''),
          date: new Date().toISOString()
        },
        content: content
      };
      console.log(`Created default frontmatter for file without valid frontmatter`);
    }
    
    // Extract data and content
    const { data, content: markdownContent } = parsedContent;
    
    // Ensure required fields exist
    if (!data.title) {
      data.title = file.replace('.md', '');
      console.log(`Added missing title: ${data.title}`);
    }
    
    // Generate a slug from the title
    const slug = data.slug || 
      data.title.toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');
    console.log(`Using slug: ${slug}`);
    
    // Format date if provided
    let date = data.date ? new Date(data.date) : new Date();
    // Handle invalid dates
    if (isNaN(date.getTime())) {
      console.log(`Invalid date detected, using current date`);
      date = new Date();
    }
    const formattedDate = date.toISOString().split('T')[0];
    
    // Create a filename with date prefix
    const newFilename = `${formattedDate}-${slug}.md`;
    const postsPath = path.join(POSTS_DIR, newFilename);
    
    // Create updated frontmatter with date
    const updatedData = {
      ...data,
      date: formattedDate,
      published: true,
      slug: slug
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
    
    successCount++;
  } catch (error) {
    console.error(`Error processing file ${file}: ${error.message}`);
    
    // Move problematic file to error directory
    try {
      const errorPath = path.join(ERROR_DIR, file);
      fs.renameSync(incomingPath, errorPath);
      console.log(`Moved problematic file to error folder: ${file}`);
    } catch (moveError) {
      console.error(`Error moving problematic file: ${moveError.message}`);
    }
    
    errorCount++;
  }
});

console.log(`\nProcessing complete!`);
console.log(`Successfully processed: ${successCount} files`);
console.log(`Failed to process: ${errorCount} files`);

// Exit with error code if any files failed
if (errorCount > 0) {
  console.log(`Some files could not be processed. Check the _error directory for details.`);
  // Still exit with 0 so the workflow continues
  process.exit(0);
} else {
  console.log(`All files processed successfully!`);
  process.exit(0);
} 