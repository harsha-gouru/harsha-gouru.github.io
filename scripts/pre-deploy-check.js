#!/usr/bin/env node

/**
 * Pre-deployment check script
 * 
 * This script performs basic checks before deployment to help prevent issues:
 * 1. Checks for build errors
 * 2. Validates content files (basic checks)
 * 3. Ensures critical files exist
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔍 Running pre-deployment checks...');

// Track if any errors are found
let hasErrors = false;

// Directory paths
const BUILD_DIR = path.join(__dirname, '..', 'build');
const CONTENT_DIR = path.join(__dirname, '..', 'content');
const SRC_DIR = path.join(__dirname, '..', 'src');

// Critical files that must exist
const CRITICAL_FILES = [
  path.join(SRC_DIR, 'index.tsx'),
  path.join(SRC_DIR, 'App.tsx'),
  path.join(SRC_DIR, 'components', 'Layout.tsx'),
];

// Check 1: Ensure critical files exist
console.log('\n📋 Checking critical files...');
CRITICAL_FILES.forEach(file => {
  if (!fs.existsSync(file)) {
    console.error(`❌ Critical file missing: ${file}`);
    hasErrors = true;
  } else {
    console.log(`✅ Found: ${file}`);
  }
});

// Check 2: Run a build and check for errors
console.log('\n🏗️ Building project to check for errors...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build completed successfully');
  
  // Verify build directory exists and has files
  if (!fs.existsSync(BUILD_DIR) || fs.readdirSync(BUILD_DIR).length === 0) {
    console.error('❌ Build directory is empty or does not exist');
    hasErrors = true;
  }
} catch (error) {
  console.error('❌ Build failed');
  hasErrors = true;
}

// Check 3: Validate content markdown files (basic checks)
console.log('\n📝 Validating content files...');
if (fs.existsSync(path.join(CONTENT_DIR, 'posts'))) {
  const contentFiles = fs.readdirSync(path.join(CONTENT_DIR, 'posts'));
  const markdownFiles = contentFiles.filter(file => file.endsWith('.md'));
  
  console.log(`Found ${markdownFiles.length} markdown files`);
  
  markdownFiles.forEach(file => {
    const filePath = path.join(CONTENT_DIR, 'posts', file);
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Check for frontmatter
    if (!content.startsWith('---')) {
      console.error(`❌ Missing frontmatter in ${file}`);
      hasErrors = true;
    }
    
    // Check for title
    if (!content.includes('title:')) {
      console.error(`❌ Missing title in ${file}`);
      hasErrors = true;
    }
    
    // Check for date
    if (!content.includes('date:')) {
      console.error(`❌ Missing date in ${file}`);
      hasErrors = true;
    }
  });
} else {
  console.warn('⚠️ Content/posts directory does not exist yet');
}

// Final result
console.log('\n📊 Check results:');
if (hasErrors) {
  console.error('❌ Pre-deployment checks failed. Please fix the issues before deploying.');
  process.exit(1);
} else {
  console.log('✅ All pre-deployment checks passed!');
  process.exit(0);
} 