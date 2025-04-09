# Blog Maintenance Guide

## AI-Assisted Content Workflow

This guide explains how to use AI to automatically generate blog content in your style, which will then be processed and published through your existing content workflow system.

## Fully Automated Publishing

You can generate and publish blog posts completely automatically with AI, without having to manually approve or deploy anything. This is perfect for managing your blog from your phone or any device.

### Option 1: Direct GitHub Mobile App Method

1. Open the GitHub mobile app
2. Navigate to your repository
3. Go to content/_incoming/ directory
4. Create a new file with a descriptive name (e.g., `typescript-tips.md`)
5. Add frontmatter at the top:
   ```
   ---
   title: "Your Post Title"
   date: "YYYY-MM-DD"
   author: "Harsha Gouru"
   tags: ["tag1", "tag2", "tag3"]
   excerpt: "A brief summary of the post that will appear in previews."
   ---
   ```
6. Add your content below the frontmatter
7. Commit the file to the main branch

That's it! The GitHub Actions workflow will automatically:
- Process your content file
- Move it to the proper locations
- Build and deploy your blog
- Send a Slack notification when complete

### Option 2: AI Content Generation Method

Use Claude or another AI to write your blog post:

1. Ask the AI (Claude, ChatGPT, etc.) to:
   ```
   Write a blog post about [TOPIC] with this frontmatter:
   
   ---
   title: "Your Post Title"
   date: "YYYY-MM-DD" 
   author: "Harsha Gouru"
   tags: ["relevant", "tags", "here"]
   excerpt: "A brief summary of the post."
   ---
   
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

2. Copy the AI's response
3. Create a new file in content/_incoming/ using the GitHub mobile app
4. Paste the AI-generated content
5. Commit to main branch

The automated workflow will handle everything else!

### Behind the Scenes

When you add content to the _incoming folder, the `auto-content-deploy.yml` workflow will automatically:

1. Detect the new file
2. Process it with the script
3. Move it to the proper content directories
4. Build and deploy the blog
5. Send a confirmation notification via Slack

No manual approvals or clicks required!

## Using the Local Script (Optional)

If you're working on your computer, you can still use the `generate-post.sh` script to create a template:

```bash
./scripts/generate-post.sh "Topic of your blog post" "optional-slug"
```

This will create a template file that you can:
1. Fill with AI-generated content
2. Commit and push to GitHub
3. Let the automatic workflow deploy it

## Control Options

You can control the automatic publishing by adding these tags to your commit message:

- `[skip auto]` - Prevents automatic deployment (uses the manual Slack approval flow instead)
- `[skip ci]` - Skips all CI/CD workflows
- `[deploy]` - Forces deployment even without content changes

## Troubleshooting

If your content isn't appearing on the blog:

1. Check GitHub Actions to see if the workflow ran successfully
2. Verify your Markdown file has proper frontmatter
3. Make sure the file is in the content/_incoming/ directory
4. Check Slack for any error notifications
5. If needed, run content processing locally: `node scripts/process-incoming.js`