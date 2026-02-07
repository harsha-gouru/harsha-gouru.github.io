/**
 * Process Incoming Blog Posts
 * 
 * This script processes Markdown blog posts from content/_incoming directory
 * and moves them to the content/posts directory with proper formatting and metadata.
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Directory paths
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

// Get list of Markdown files in incoming directory
let incomingFiles;
try {
  incomingFiles = fs.readdirSync(INCOMING_DIR)
    .filter(file => file.endsWith('.md') || file.endsWith('.mdx'));
  
  console.log(`Found ${incomingFiles.length} file(s) to process`);
} catch (err) {
  console.error('Error reading incoming directory:', err);
  process.exit(1);
}

// Process each file
incomingFiles.forEach(filename => {
  const sourcePath = path.join(INCOMING_DIR, filename);
  console.log(`Processing: ${filename}`);
  
  try {
    // Read the file content
    const fileContent = fs.readFileSync(sourcePath, 'utf8');
    
    // Parse frontmatter
    let { data, content } = matter(fileContent);
    
    // Ensure required metadata exists
    if (!data.title) {
      // Extract title from first heading if not in frontmatter
      const titleMatch = content.match(/^#\s+(.+)$/m);
      if (titleMatch) {
        data.title = titleMatch[1];
        // Remove the title from content to avoid duplication
        content = content.replace(/^#\s+(.+)$/m, '');
      } else {
        data.title = path.basename(filename, path.extname(filename))
          .replace(/-/g, ' ')
          .replace(/\b\w/g, c => c.toUpperCase());
      }
    }
    
    // Add date if missing
    if (!data.date) {
      data.date = new Date().toISOString().split('T')[0];
    }
    
    // Add author if missing
    if (!data.author) {
      data.author = "Harsha Gouru";
    }
    
    // Add default tags if missing
    if (!data.tags || !Array.isArray(data.tags) || data.tags.length === 0) {
      data.tags = ["tech", "web-development"];
    }
    
    // Add slug if missing
    if (!data.slug) {
      data.slug = path.basename(filename, path.extname(filename))
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]/g, '');
    }
    
    // Generate new content with improved frontmatter
    const newContent = matter.stringify(content.trim(), data);
    
    // Create new filename based on date and slug
    const datePrefix = data.date.replace(/[^\d]/g, '').substring(0, 8);
    const newFilename = `${datePrefix}-${data.slug}${path.extname(filename)}`;
    const destPath = path.join(POSTS_DIR, newFilename);
    
    // Write to posts directory
    fs.writeFileSync(destPath, newContent);
    console.log(`✅ Saved to: ${destPath}`);
    
    // Move original to processed directory
    const processedPath = path.join(PROCESSED_DIR, filename);
    fs.copyFileSync(sourcePath, processedPath);
    fs.unlinkSync(sourcePath);
    console.log(`✅ Moved original to processed directory`);
    
  } catch (err) {
    console.error(`❌ Error processing ${filename}:`, err);
    
    // Move to error directory
    try {
      const errorPath = path.join(ERROR_DIR, filename);
      fs.copyFileSync(sourcePath, errorPath);
      fs.unlinkSync(sourcePath);
      console.log(`⚠️ Moved to error directory: ${errorPath}`);
    } catch (moveErr) {
      console.error('Failed to move file to error directory:', moveErr);
    }
  }
});

// --- Generate posts.json manifest ---
const PUBLIC_CONTENT_DIR = path.join(process.cwd(), 'public', 'content');

// Ensure public/content directory exists
if (!fs.existsSync(PUBLIC_CONTENT_DIR)) {
  fs.mkdirSync(PUBLIC_CONTENT_DIR, { recursive: true });
}

// Read all markdown files from public/content
const publicMdFiles = fs.readdirSync(PUBLIC_CONTENT_DIR)
  .filter(file => file.endsWith('.md'));

const manifest = publicMdFiles.map(filename => {
  const filePath = path.join(PUBLIC_CONTENT_DIR, filename);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data } = matter(fileContent);
  const id = path.basename(filename, '.md');
  
  return {
    id,
    title: data.title || id.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
    date: data.date || new Date().toISOString().split('T')[0],
    category: data.category || 'Learnings',
    tags: data.tags || [],
    excerpt: data.excerpt || ''
  };
}).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

const manifestPath = path.join(PUBLIC_CONTENT_DIR, 'posts.json');
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
console.log(`✅ Generated posts.json manifest with ${manifest.length} posts`);

console.log('Processing complete!'); 