# Blog Maintenance Guide

## AI-Assisted Content Workflow

This guide explains how to use AI to automatically generate blog content in your style, which will then be processed and published through your existing content workflow system.

### Step 1: Generate a Blog Post Template

Use the provided script to create a blog post template:

```bash
./scripts/generate-post.sh "Topic of your blog post" "optional-slug"
```

For example:
```bash
./scripts/generate-post.sh "TypeScript Tips for React Developers" "typescript-react-tips"
```

This will:
1. Create a new Markdown file in the `content/_incoming/` directory
2. Pre-fill the frontmatter with title, date, author, and placeholder tags
3. Add a basic structure for your blog post
4. Display instructions for using Claude to generate the content

### Step 2: Generate Content with Claude

1. Copy the prompt provided by the script
2. Visit https://claude.ai or use Claude in VS Code
3. Paste the prompt and let Claude generate the blog post content
4. Copy Claude's response and replace the placeholder content in your template file

Example prompt:
```
Write a blog post about [TOPIC] in my writing style.

The post should follow this structure:
1. Start with a # heading matching the title
2. An introduction paragraph that hooks the reader
3. Multiple ## section headings with organized content
4. Include relevant code examples with proper syntax highlighting
5. End with a conclusion that summarizes key points

Technical style preferences:
- Clear, direct explanations
- Code examples should be practical, not theoretical
- Highlight benefits and common pitfalls
- Use bullet points or numbered lists for steps/tips
- Keep explanations concise but thorough
```

### Step 3: Review and Refine the Content

1. Open the generated file in your editor
2. Review the AI-generated content for accuracy and style
3. Make any necessary edits or refinements
4. Ensure the frontmatter is properly formatted with title, date, tags, etc.

### Step 4: Commit and Push the New Content

```bash
git add content/_incoming/[filename].md
git commit -m "Add new post about [topic]"
git push
```

### Step 5: Follow Standard Content Workflow

The existing automated workflow will then:
1. Send you a Slack notification about new content
2. Process the content when you click "Process Content"
3. Deploy the changes when you click "Deploy Now"

## Content Structure and Workflow Separation

Your blog maintains a clean separation between:

1. **Content** - Stored in:
   - `content/_incoming/` - New drafts awaiting processing
   - `content/_processed/` - Archive of processed files
   - `content/posts/` - Final processed posts
   - `content/images/` - Blog images

2. **Code** - Located in the React application:
   - `src/` - React components and application logic
   - `public/` - Static assets and compiled content

3. **Workflow** - Automated through:
   - GitHub Actions workflows for notifications and deployments
   - Processing scripts in `scripts/` directory
   - This maintenance guide for reference

## Customizing the AI Content Generation

To customize how the AI generates content:

1. Adjust the prompt for Claude to specify:
   - Tone/voice preferences
   - Content structure requirements
   - Technical depth
   - Special formatting needs
   - Code example languages

2. Create template prompts for different content types:
   - Technical tutorials
   - Opinion pieces
   - Industry news analysis
   - Code explanations

## Troubleshooting

If your AI-generated content isn't processed correctly:

1. Verify the frontmatter is formatted correctly with title, date, tags, etc.
2. Check that the Markdown structure follows your blog's conventions
3. Ensure the file is in the `content/_incoming/` directory
4. Review GitHub Actions logs for any processing errors

For advanced troubleshooting, run the content processing script locally:
```bash
node scripts/process-content.js
```