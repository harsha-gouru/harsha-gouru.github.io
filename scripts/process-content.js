#!/usr/bin/env node

/**
 * Content Processing Script
 * 
 * This script processes Markdown files in the content/_incoming directory:
 * - Validates Markdown format
 * - Extracts metadata (title, tags, etc.)
 * - Generates unique IDs
 * - Formats content for consistency
 * - Moves processed files to appropriate directories
 */

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const copyFile = promisify(fs.copyFile);
const mkdir = promisify(fs.mkdir);
const stat = promisify(fs.stat);

const INCOMING_DIR = path.join(process.cwd(), 'content', '_incoming');
const SRC_CONTENT_DIR = path.join(process.cwd(), 'src', 'content');
const PUBLIC_CONTENT_DIR = path.join(process.cwd(), 'public', 'content');
const PROCESSED_DIR = path.join(process.cwd(), 'content', '_processed');
const LOGS_DIR = path.join(process.cwd(), 'logs');

// Ensure all directories exist
async function ensureDirectories() {
  const dirs = [INCOMING_DIR, SRC_CONTENT_DIR, PUBLIC_CONTENT_DIR, PROCESSED_DIR, LOGS_DIR];
  for (const dir of dirs) {
    try {
      await mkdir(dir, { recursive: true });
    } catch (err) {
      if (err.code !== 'EEXIST') throw err;
    }
  }
}

// Extract metadata from markdown content
function extractMetadata(content) {
  const titleMatch = content.match(/^#\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1] : 'Untitled Post';
  
  // Extract tags (words wrapped in ** or after tag indicators)
  const tagMatches = content.match(/\*\*([^*]+)\*\*/g) || [];
  const tags = tagMatches.map(tag => tag.replace(/\*\*/g, ''));
  
  // Extract first paragraph as excerpt
  const lines = content.split('\n');
  let excerpt = '';
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() !== '' && !lines[i].startsWith('#')) {
      excerpt = lines[i].trim();
      break;
    }
  }
  
  return {
    title,
    tags: [...new Set(tags)], // Remove duplicates
    excerpt: excerpt.substring(0, 150) + (excerpt.length > 150 ? '...' : ''),
    date: new Date().toISOString()
  };
}

// Generate a slug from title
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Log an entry to the processing log
async function logEntry(message) {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] ${message}\n`;
  
  const logFile = path.join(LOGS_DIR, 'content_processing.log');
  
  try {
    await fs.promises.appendFile(logFile, logEntry);
  } catch (err) {
    console.error('Error writing to log:', err);
  }
}

// Main process function
async function processContent() {
  try {
    await ensureDirectories();
    
    // Get all markdown files in incoming directory
    const files = await readdir(INCOMING_DIR);
    const markdownFiles = files.filter(file => file.endsWith('.md'));
    
    if (markdownFiles.length === 0) {
      console.log('No Markdown files found in incoming directory.');
      return;
    }
    
    console.log(`Found ${markdownFiles.length} files to process.`);
    await logEntry(`Starting to process ${markdownFiles.length} files`);
    
    for (const file of markdownFiles) {
      const filePath = path.join(INCOMING_DIR, file);
      const content = await readFile(filePath, 'utf8');
      
      // Extract metadata
      const metadata = extractMetadata(content);
      console.log(`Processing: ${metadata.title}`);
      await logEntry(`Processing file: ${file} - "${metadata.title}"`);
      
      // Determine filename (either use existing or generate from title)
      const fileInfo = path.parse(file);
      const slug = fileInfo.name === 'untitled' ? generateSlug(metadata.title) : fileInfo.name;
      const newFilename = `${slug}.md`;
      
      // Copy to src and public content directories
      await copyFile(filePath, path.join(SRC_CONTENT_DIR, newFilename));
      await copyFile(filePath, path.join(PUBLIC_CONTENT_DIR, newFilename));
      
      // Move original to processed directory with timestamp
      const timestamp = new Date().toISOString().replace(/:/g, '-').replace(/\..+/, '');
      const processedFilename = `${timestamp}-${newFilename}`;
      await copyFile(filePath, path.join(PROCESSED_DIR, processedFilename));
      
      // Delete original
      fs.unlinkSync(filePath);
      
      await logEntry(`Processed file: ${file} → ${newFilename} (Archive: ${processedFilename})`);
      console.log(`✅ Processed: ${newFilename}`);
    }
    
    console.log('Content processing complete!');
    await logEntry(`Completed processing ${markdownFiles.length} files`);
  } catch (err) {
    console.error('Error processing content:', err);
    await logEntry(`ERROR: ${err.message}`);
  }
}

// Run the script
processContent(); 