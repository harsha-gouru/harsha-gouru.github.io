# Using the Automated Blog Workflow

This is a sample blog post that demonstrates how to use the new automated blog workflow. Simply create Markdown files like this one and place them in the `content/_incoming` directory.

## How the Workflow Works

The **automated workflow** makes it easy to add new content to your blog without manual deployment steps. When you place a Markdown file in the `content/_incoming` directory and push it to GitHub, a workflow automatically:

1. Detects the new content
2. Sends you a **Slack notification**
3. Processes the file after approval
4. Deploys your updated blog

## Writing Guidelines

Your posts should follow some basic guidelines:

- Use a single `#` heading at the top for the title
- Use `##` for section headings
- Wrap important terms in `**double asterisks**` to tag them
- Use proper Markdown syntax for code blocks:

```javascript
// Example code block
function greet(name) {
  return `Hello, ${name}!`;
}
```

## After Deployment

Once the post is deployed, the original file is moved to `content/_processed` with a timestamp, and the processed versions are placed in both:

- `src/content/` - For the source code
- `public/content/` - For the deployed site

Everything is logged for **traceability** and you'll receive deployment confirmations in Slack.

## Next Steps

For your real blog posts, simply replace this file with your actual content, and the **automation system** will handle the rest! 