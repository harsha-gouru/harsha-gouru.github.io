/**
 * Feature flag utility
 * 
 * This utility provides a simple way to check if features are enabled
 * based on environment variables. This makes it easy to toggle features
 * without code changes.
 */

import React from 'react';

// Define types for our feature flags
type FeatureFlag = 
  | 'darkMode'
  | 'comments'
  | 'newsletter';

// Map environment variables to feature flags
const featureFlagMap: Record<FeatureFlag, string> = {
  darkMode: 'REACT_APP_FEATURE_DARK_MODE',
  comments: 'REACT_APP_FEATURE_COMMENTS',
  newsletter: 'REACT_APP_FEATURE_NEWSLETTER',
};

/**
 * Check if a feature is enabled
 * @param flag The feature flag to check
 * @returns boolean indicating if the feature is enabled
 */
export const isFeatureEnabled = (flag: FeatureFlag): boolean => {
  const envVar = featureFlagMap[flag];
  return process.env[envVar] === 'true';
};

/**
 * Get all feature flags and their status
 * @returns Record of all feature flags and their status
 */
export const getAllFeatureFlags = (): Record<FeatureFlag, boolean> => {
  return {
    darkMode: isFeatureEnabled('darkMode'),
    comments: isFeatureEnabled('comments'),
    newsletter: isFeatureEnabled('newsletter'),
  };
};

/**
 * Feature-gated component wrapper
 * Only renders children if the feature is enabled
 */
export const FeatureGate = ({ 
  feature, 
  fallback = null, 
  children 
}: { 
  feature: FeatureFlag; 
  fallback?: React.ReactNode; 
  children: React.ReactNode;
}): React.ReactElement => {
  if (isFeatureEnabled(feature)) {
    return React.createElement(React.Fragment, null, children);
  }
  return React.createElement(React.Fragment, null, fallback);
};

export default {
  isEnabled: isFeatureEnabled,
  getAll: getAllFeatureFlags,
  FeatureGate,
}; 