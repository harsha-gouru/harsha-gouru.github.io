# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run all tests
- `npm test -- --testNamePattern="component name"` - Run specific test
- `npm run deploy` - Deploy to GitHub Pages
- `npm run eject` - Eject from Create React App (not recommended)

## Code Style Guidelines
1. **TypeScript/React**: Use functional components with hooks and proper TypeScript types/interfaces
2. **Imports**: Group imports by type (React core, 3rd party libraries, local components/styles)
3. **Formatting**: Follow ESLint config from "react-app" preset with 2-space indentation
4. **Naming Conventions**:
   - Components: PascalCase (e.g., `BlogPost.tsx`)
   - Variables/functions: camelCase
   - Interfaces: PascalCase with 'Props' suffix for component props (e.g., `BlogPostProps`)
   - Files: Component files match component names
5. **CSS**: Use TailwindCSS utility classes consistently
6. **Testing**: Use React Testing Library with Jest
7. **Error Handling**: Use try/catch blocks for async operations
8. **File Structure**: Keep related components, interfaces, and utilities in appropriate directories