# Personal Blog

A modern, minimalist blog built with React, Next.js, and TypeScript, deployed on GitHub Pages.

## Features

- Clean, responsive design with Tailwind CSS
- Markdown-based content
- Tag filtering
- Code syntax highlighting
- GitHub Pages integration

## Content Management

This blog features an automated content workflow:

1. Add Markdown files to `content/_incoming/`
2. Receive Slack notifications for approval
3. Approve to process and deploy automatically

For detailed instructions, see [CONTENT_WORKFLOW.md](CONTENT_WORKFLOW.md).

## Development

### Prerequisites

- Node.js (v14+)
- npm or yarn

### Local Development

To run the blog locally:

```bash
# Install dependencies
npm install

# Start development server
npm start
```

### Deployment

The blog uses GitHub Pages for deployment:

```bash
# Build and deploy to GitHub Pages
npm run deploy
```

## Folder Structure

```
/
├── public/               # Static assets and built files
├── src/                  # Source code
│   ├── components/       # React components
│   ├── content/          # Blog post content
│   └── pages/            # Page components
├── content/              # Content management
│   ├── _incoming/        # Drop new posts here
│   └── _processed/       # Archive of processed posts
├── scripts/              # Utility scripts
├── .github/              # GitHub configuration
│   └── workflows/        # GitHub Actions workflows
└── logs/                 # Processing and deployment logs
```

## Customization

To customize the blog:
- Edit `src/components/Layout.tsx` for layout changes
- Modify styles in `src/index.css` and component files
- Update site metadata in `public/index.html`

## Credits

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [GitHub Pages](https://pages.github.com/)

## License

MIT
