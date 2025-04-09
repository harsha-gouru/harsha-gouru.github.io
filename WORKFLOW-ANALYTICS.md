# Workflow Analytics Dashboard

I've set up a new automated workflow analytics system that will help you track and optimize your GitHub Actions workflows.

## What's Been Implemented

1. **New Workflow File**: `.github/workflows/workflow-analytics.yml`
   - Runs automatically every Sunday
   - Can be triggered manually at any time

2. **Features**:
   - Analyzes all your workflow runs
   - Calculates success rates and execution times
   - Provides optimization recommendations
   - Creates/updates a dashboard issue automatically

## How to Use It

1. **View the Dashboard**:
   - The dashboard will be created as a separate issue with the label `workflow-dashboard`
   - It updates automatically on schedule or when manually triggered

2. **Trigger Manually**:
   - Go to the GitHub repository: https://github.com/harsha-gouru/harsha-gouru.github.io
   - Click "Actions" in the top navigation
   - From the left sidebar, find and click "Workflow Analytics Dashboard"
   - Click the "Run workflow" dropdown on the right
   - Select the main branch and click the green "Run workflow" button

3. **Review Recommendations**:
   - The dashboard includes optimization suggestions based on the analysis
   - Follow the recommendations to improve workflow performance

## Benefits

- **Visibility**: Clear insight into which workflows are performing well and which need attention
- **Performance Tracking**: Monitor execution times to identify slow workflows
- **Success Rates**: Track reliability metrics for each workflow
- **Insights**: Get actionable recommendations for improvements

## What's Being Analyzed

For each workflow, the dashboard shows:
- Success/failure rates
- Average execution times
- Recent runs with status
- Trigger events

## Next Steps

After reviewing the dashboard, you might want to:
1. Fix any workflows with high failure rates
2. Optimize slow-running workflows by adding caching
3. Consolidate similar workflows to reduce duplication
4. Update workflows using deprecated actions

## Customizing the Analytics

If you want to modify the analytics:
1. Edit `.github/workflows/workflow-analytics.yml`
2. Adjust the analysis parameters in the JavaScript code
3. Add additional metrics or recommendations as needed

The system is now ready for use - trigger the workflow from GitHub Actions and check the dashboard issue that will be created! 