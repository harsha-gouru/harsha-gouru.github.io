# Development Guide

This document provides guidelines for developing and maintaining the blog.

## Project Structure

```
/
├── .github/           # GitHub Actions workflows
├── content/           # Content separate from UI
│   ├── posts/         # Blog post markdown files
│   ├── images/        # Image assets for blog posts
│   └── data/          # JSON data files (authors, etc.)
├── public/            # Static assets
├── src/               # React application source
└── build/             # Production build (generated)
```

## Content Management

### Blog Posts

Blog posts are stored as Markdown files in the `content/posts/` directory. Each post should have frontmatter metadata:

```markdown
---
title: "Post Title"
date: "YYYY-MM-DD"
author: "Author Name"
tags: ["tag1", "tag2"]
image: "/content/images/featured-image.jpg"
excerpt: "Brief summary of the post."
---

Post content starts here...
```

### Images

Store images in the `content/images/` directory. Reference them in markdown like:

```markdown
![Alt text](/content/images/my-image.jpg)
```

## Feature Flags

The application uses feature flags to enable/disable features without code changes. Current feature flags:

| Flag | Environment Variable | Description |
|------|---------------------|-------------|
| Dark Mode | REACT_APP_FEATURE_DARK_MODE | Enable dark mode option |
| Comments | REACT_APP_FEATURE_COMMENTS | Enable comments system |
| Newsletter | REACT_APP_FEATURE_NEWSLETTER | Enable newsletter sign-up |

### Using Feature Flags in Code

```jsx
// Import the feature flag utility
import { isFeatureEnabled, FeatureGate } from '../utils/featureFlags';

// Check if a feature is enabled
if (isFeatureEnabled('darkMode')) {
  // Do something
}

// Or use the FeatureGate component
return (
  <div>
    <FeatureGate feature="newsletter">
      <NewsletterSignup />
    </FeatureGate>
  </div>
);
```

## Development Workflow

1. **Feature Branches**: Create a new branch for each feature or bug fix
   ```bash
   git checkout -b feature/new-feature
   ```

2. **Local Development**: Run the development server
   ```bash
   npm run start
   ```

3. **Testing**: Test your changes thoroughly
   ```bash
   npm run test
   ```

4. **Pull Request**: Create a pull request to merge into main
   ```bash
   git push origin feature/new-feature
   # Then create PR on GitHub
   ```

5. **Deployment**: After merging, GitHub Actions will deploy automatically

## Version Management

Tag significant versions to make rollbacks easier:

```bash
git tag -a v1.1 -m "Description of this version"
git push origin v1.1
```

See the [ROLLBACK.md](./ROLLBACK.md) document for recovery procedures.

## Environment Variables

Configure environment-specific settings in `.env` files:

- `.env` - Shared environment variables
- `.env.development` - Development-specific variables
- `.env.production` - Production-specific variables

Environment variables must start with `REACT_APP_` to be accessible in the React app.

## Getting Help

If you encounter issues or have questions, check:

1. Project documentation
2. React and related tool documentation
3. File an issue on GitHub

---

*This guide is a living document and will be updated as the project evolves.* 