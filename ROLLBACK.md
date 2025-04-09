# Rollback Procedures

This document outlines the procedures for rolling back the blog to a stable version if issues arise after deploying changes.

## Available Stable Versions

| Version Tag | Description | Date |
|-------------|-------------|------|
| v1.0-minimal | Minimal design with black/white theme | Current |

## Quick Rollback Process

### Option 1: Using Git Tags (Preferred)

To rollback to a stable tagged version:

```bash
# Pull the latest changes and tags
git fetch --all --tags

# Check out the specific tag
git checkout tags/v1.0-minimal

# Create a temporary branch from the tag to work on
git checkout -b temp-rollback-branch

# Build and deploy
npm run deploy

# Optionally, merge this back to main if you want to keep the rollback
git checkout main
git merge temp-rollback-branch
git push origin main
```

### Option 2: Reverting Specific Commits

If you need to undo specific changes:

```bash
# List recent commits
git log --oneline

# Revert a specific commit
git revert <commit-hash>

# Build and deploy
npm run deploy
```

### Option 3: Manual Deployment of Previous Build

If GitHub Actions is set up:

1. Go to GitHub repository
2. Click "Actions" tab
3. Find the last successful workflow run
4. Click "Re-run workflow" to redeploy that version

## Testing After Rollback

After rolling back, verify:

- Site loads correctly
- Navigation works
- Blog posts display properly
- Styling is consistent

## Preventative Measures

To avoid needing rollbacks:

1. Always create feature branches for changes
2. Test thoroughly before merging to main
3. Tag stable versions regularly
4. Back up content separately from code

## Emergency Contacts

If urgent help is needed:

- File an issue on GitHub repository
- Contact the site administrator

---

*Note: This rollback strategy primarily addresses UI and code issues. Content is stored separately so it's not affected by these rollbacks.* 