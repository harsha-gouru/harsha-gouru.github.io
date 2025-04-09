# Harsha's Tech Blog

A personal blog focused on quantum computing, web development, and artificial intelligence, built with React and deployed on GitHub Pages.

## Features

- Clean, minimal design with black and white theme
- Responsive layout for all device sizes
- Markdown-based content management
- Tag filtering system
- Syntax highlighting for code blocks
- GitHub Pages deployment with automated workflows

## Technical Stack

- React.js with TypeScript
- Tailwind CSS for styling
- React Router for navigation
- React Markdown for content rendering
- GitHub Pages for hosting
- GitHub Actions for CI/CD

## Development

For development instructions, see [DEVELOPMENT.md](./DEVELOPMENT.md), which covers:

- Project structure
- Content management
- Feature flags system
- Development workflow
- Environment variables

## Deployment

The site is automatically deployed when changes are merged to the main branch via GitHub Actions.

For manual deployment:

```bash
# Standard deployment
npm run deploy

# Deployment with pre-checks
npm run safedeploy
```

## Backup & Rollback Strategy

This project has a comprehensive backup and rollback strategy:

1. **Git tags** mark stable versions
2. **Content separation** keeps content isolated from UI changes
3. **Feature flags** allow toggling features without code changes
4. **GitHub Actions** automate deployment
5. **Pre-deployment checks** validate builds before deployment

For detailed rollback instructions, see [ROLLBACK.md](./ROLLBACK.md).

Current stable versions:
- v1.0-minimal: Minimal design with black/white theme

## License

Copyright © 2023 Harsha Gouru. All rights reserved.
