---
title: Testing the Notification Workflow
date: '2023-07-25'
description: This is a test post to verify our automated content notification system
tags:
  - test
  - automation
  - workflow
category: Development
author: Harsha Gouru
slug: test-blog-post
---
# Testing the Content Notification Workflow

This is a test post to verify that our automated notification system works correctly.

When this file is committed and pushed to the repository:

1. The content-change-notification workflow should detect the new file
2. A Slack notification should be sent with information about the change
3. The notification should include buttons to deploy or view the changes

## Code Example

```javascript
function testWorkflow() {
  console.log("Testing the notification workflow");
  return "It works!";
}
```

If everything is working correctly, we should be able to click the "Deploy Now" button in the Slack notification to trigger a deployment.

## Next Steps

If this test is successful, we can move forward with standardizing this workflow for all content updates.
