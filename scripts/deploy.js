const ghpages = require('gh-pages');
const path = require('path');

// Get the repository name from package.json
const pkg = require('../package.json');
const repoUrl = pkg.repository ? 
  (typeof pkg.repository === 'string' ? pkg.repository : pkg.repository.url) :
  undefined;

const options = {
  // Use the bot name for commits
  user: {
    name: 'GitHub Actions Bot',
    email: 'actions@github.com'
  },
  // If we have a token, use it for authentication
  repo: process.env.GITHUB_TOKEN ? 
    `https://x-access-token:${process.env.GITHUB_TOKEN}@github.com/${process.env.GITHUB_REPOSITORY}.git` : 
    repoUrl,
  silent: false,
  message: 'Deploy: [ci skip]'
};

console.log('Starting deployment...');
console.log(`Using repo URL: ${options.repo || '(default from git config)'}`);

// Deploy the site
ghpages.publish(path.join(process.cwd(), 'build'), options, (err) => {
  if (err) {
    console.error('Deployment error:', err);
    process.exit(1);
  } else {
    console.log('Deployed successfully!');
  }
}); 