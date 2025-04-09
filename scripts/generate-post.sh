#!/bin/bash

# AI-Powered Blog Post Generator
# This script creates a template for a blog post and provides instructions
# for using Claude to generate content based on a provided topic

# Check if required argument is provided
if [ $# -lt 1 ]; then
  echo "Usage: $0 \"Topic of the blog post\" [optional-custom-slug]"
  echo "Example: $0 \"GraphQL Query Optimization\" \"graphql-optimization\""
  exit 1
fi

# Get arguments
TOPIC="$1"
SLUG="${2:-$(echo "$TOPIC" | tr '[:upper:]' '[:lower:]' | tr ' ' '-' | sed 's/[^a-z0-9-]//g')}"
OUTPUT_PATH="$(dirname "$(dirname "$(realpath "$0")")")/content/_incoming/$SLUG.md"

# Ensure directory exists
mkdir -p "$(dirname "$OUTPUT_PATH")"

# Create a starter template with frontmatter
cat > "$OUTPUT_PATH" << EOF
---
title: "$TOPIC"
date: "$(date +%Y-%m-%d)"
author: "Harsha Gouru"
tags: ["tag1", "tag2", "tag3", "tag4"]
excerpt: "A brief summary of the post that will appear in previews."
---

# $TOPIC

This is a starter template for your blog post. Replace this content with AI-generated content.

## Introduction

Add your introduction here...

## Main Content

Add your main content here...

## Conclusion

Add your conclusion here...
EOF

echo "✅ Blog post template created at: $OUTPUT_PATH"
echo ""
echo "NEXT STEPS:"
echo "1. Open the file in your editor: $OUTPUT_PATH"
echo "2. Use Claude to generate content with this prompt:"
echo ""
echo "-------------- CLAUDE PROMPT --------------"
echo "Write a blog post about $TOPIC in my writing style."
echo ""
echo "The post should follow this structure:"
echo "1. Start with a # heading matching the title"
echo "2. An introduction paragraph that hooks the reader"
echo "3. Multiple ## section headings with organized content"
echo "4. Include relevant code examples with proper syntax highlighting"
echo "5. End with a conclusion that summarizes key points"
echo ""
echo "Technical style preferences:"
echo "- Clear, direct explanations"
echo "- Code examples should be practical, not theoretical"
echo "- Highlight benefits and common pitfalls"
echo "- Use bullet points or numbered lists for steps/tips"
echo "- Keep explanations concise but thorough"
echo ""
echo "Also provide appropriate tags and a brief excerpt for the frontmatter."
echo "-------------- END PROMPT --------------"
echo ""
echo "3. After generating content, review and edit as needed"
echo "4. Commit and push to trigger the content workflow:"
echo ""
echo "git add $OUTPUT_PATH"
echo "git commit -m \"Add new post about $TOPIC\""
echo "git push"