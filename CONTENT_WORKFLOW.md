# Blog Content Workflow

This document outlines the automated content workflow for adding new blog posts to your site.

## How It Works

The automated content pipeline follows these steps:

1. You create a new Markdown file in the `content/_incoming/` directory
2. GitHub Actions automatically detects the new file
3. You receive a Slack notification asking for approval
4. Upon approval, the content is processed and deployed
5. All actions are logged for future reference

## Adding New Content

### Step 1: Create Your Markdown File

Create your blog post as a Markdown file (`.md`) and place it in the `content/_incoming/` directory.

The Markdown file should follow this format:

```markdown
# Your Post Title Here

A brief introduction paragraph that will be used as your excerpt.

## First Section Heading

Your content here...

## Second Section Heading

More content with **bold text** that will be extracted as tags.
```

Guidelines:
- Start with a single `#` heading as the title
- Use `##` for section headings
- Use `**keyword**` to highlight important terms (these will be extracted as tags)
- Include code examples in triple backticks with language specification:

````markdown
```javascript
const example = "code here";
```
````

### Step 2: Commit and Push Your File

```bash
git add content/_incoming/your-post.md
git commit -m "Add new blog post about [topic]"
git push
```

### Step 3: Approval and Deployment

1. After pushing your changes, the GitHub Actions workflow will automatically detect the new file
2. You'll receive a Slack notification with details about the new content
3. Click "Approve & Deploy" to process and publish the content
4. Once deployed, you'll receive a confirmation notification

## Behind the Scenes

When you approve the deployment:

1. The Markdown file is copied to:
   - `src/content/` for the source code 
   - `public/content/` for serving with the deployed app
2. The original file is moved to `content/_processed/` with a timestamp
3. The Home component is updated to include your new post
4. The site is built and deployed via gh-pages
5. All actions are logged in the `logs/` directory

## Content Logs

All content processing is logged for reference:

- `logs/content_processing.log` - Detailed processing information
- `logs/content_history.log` - Record of all content added
- `logs/deployments/` - Individual deployment logs

## Manual Control

You can also trigger the content deployment workflow manually:

1. Go to your repository on GitHub
2. Navigate to Actions → "Deploy Blog Content" workflow
3. Click "Run workflow"

## Customizing the Process

If you need to modify the content processing workflow:

- Edit `.github/workflows/content-pipeline.yml` - Content detection workflow
- Edit `.github/workflows/content-deployment.yml` - Content deployment workflow
- Edit `scripts/process-content.js` - Content processing script

## Troubleshooting

If your content isn't appearing correctly:

1. Check the GitHub Actions logs for errors
2. Verify your Markdown file follows the expected format
3. Ensure the `content/_incoming/` directory contains your file
4. Check the deployment logs in the `logs/deployments/` directory

For advanced troubleshooting, run the content processing script locally:

```bash
node scripts/process-content.js
``` 