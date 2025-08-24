// Design system constants for consistent styling
// Note: Using Tailwind CSS classes is preferred over these constants

// Tailwind-compatible color palette
export const colors = {
  primary: 'blue',
  secondary: 'gray', 
  success: 'green',
  danger: 'red',
  warning: 'yellow',
  info: 'cyan',
} as const;

// Common Tailwind CSS class combinations for consistency
export const commonClasses = {
  // Layout
  container: 'container mx-auto px-4 sm:px-6 lg:px-8',
  section: 'py-12 sm:py-16 lg:py-20',
  
  // Flexbox utilities
  flexCenter: 'flex items-center justify-center',
  flexBetween: 'flex items-center justify-between',
  flexCol: 'flex flex-col',
  
  // Common components
  card: 'bg-white rounded-lg shadow-lg p-6',
  button: 'inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2',
  input: 'w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500',
  
  // States
  loading: 'animate-pulse',
  disabled: 'opacity-50 cursor-not-allowed',
} as const;

// Animation durations (if needed for custom animations)
export const animations = {
  fast: '150ms',
  normal: '300ms',
  slow: '500ms',
} as const;

// Z-index scale for layering
export const zIndex = {
  base: 0,
  dropdown: 10,
  modal: 20,
  overlay: 30,
  toast: 40,
} as const;

// Export type definitions
export type ColorPalette = typeof colors;
export type CommonClasses = typeof commonClasses;
export type AnimationDurations = typeof animations;
export type ZIndexScale = typeof zIndex;
