/**
 * Postscript Brand Color Theme
 * 
 * Primary/brand colors (tier 1): #007AFF, #23D1AB, #2DE34C, #FFC300, #FF5C00, #FF2D55, #FF0099, #5724E9
 * Tints (tier 2): #99CAFF, #B5EFE3, #96F1A6, #FFE180, #FFD6BF, #FFCBD5, #FFBFE6, #C7B6F8
 * Dark bases (tier 3): #004999, #147761, #1C8E30, #BF9200, #AA3D00, #AA1E39, #AA0066, #2C1275
 */

export const theme = {
  // Primary brand colors
  primary: '#5724E9',
  primaryDark: '#2C1275',
  
  // Secondary/action colors
  secondaryBlue: '#007AFF',
  secondaryTeal: '#23D1AB',
  
  // Status colors
  success: '#2DE34C',
  warning: '#FFC300',
  danger: '#FF2D55',
  accentPink: '#FF0099',
  accentOrange: '#FF5C00',
  
  // Tints (for backgrounds, cards, subtle accents)
  tintPrimary: '#C7B6F8',
  tintBlue: '#99CAFF',
  tintTeal: '#B5EFE3',
  tintSuccess: '#96F1A6',
  tintWarning: '#FFE180',
  tintOrange: '#FFD6BF',
  tintPink: '#FFCBD5',
  tintAccentPink: '#FFBFE6',
  
  // Dark bases (for borders, text accents, high-contrast)
  darkBlue: '#004999',
  darkTeal: '#147761',
  darkSuccess: '#1C8E30',
  darkWarning: '#BF9200',
  darkOrange: '#AA3D00',
  darkDanger: '#AA1E39',
  darkPink: '#AA0066',
  
  // Background and surface colors
  backgroundSoft: '#0B0B10', // Very dark neutral, similar to postscript.io
  surface: 'rgba(199, 182, 248, 0.1)', // Subtle primary tint with opacity
  surfaceElevated: 'rgba(199, 182, 248, 0.15)',
  borderSubtle: 'rgba(44, 18, 117, 0.3)', // primaryDark with low opacity
  
  // Text colors
  textPrimary: '#FFFFFF',
  textSecondary: 'rgba(255, 255, 255, 0.9)',
  textTertiary: 'rgba(255, 255, 255, 0.7)',
  
  // Team colors (mapped to brand palette)
  team1: '#007AFF', // secondaryBlue
  team1Tint: '#99CAFF',
  team1Dark: '#004999',
  
  team2: '#23D1AB', // secondaryTeal
  team2Tint: '#B5EFE3',
  team2Dark: '#147761',
} as const

// Export CSS custom properties string for use in CSS
export const themeCSS = `
  :root {
    --color-primary: ${theme.primary};
    --color-primary-dark: ${theme.primaryDark};
    --color-secondary-blue: ${theme.secondaryBlue};
    --color-secondary-teal: ${theme.secondaryTeal};
    --color-success: ${theme.success};
    --color-warning: ${theme.warning};
    --color-danger: ${theme.danger};
    --color-accent-pink: ${theme.accentPink};
    --color-accent-orange: ${theme.accentOrange};
    --color-tint-primary: ${theme.tintPrimary};
    --color-tint-blue: ${theme.tintBlue};
    --color-tint-teal: ${theme.tintTeal};
    --color-tint-success: ${theme.tintSuccess};
    --color-tint-warning: ${theme.tintWarning};
    --color-tint-orange: ${theme.tintOrange};
    --color-tint-pink: ${theme.tintPink};
    --color-tint-accent-pink: ${theme.tintAccentPink};
    --color-dark-blue: ${theme.darkBlue};
    --color-dark-teal: ${theme.darkTeal};
    --color-dark-success: ${theme.darkSuccess};
    --color-dark-warning: ${theme.darkWarning};
    --color-dark-orange: ${theme.darkOrange};
    --color-dark-danger: ${theme.darkDanger};
    --color-dark-pink: ${theme.darkPink};
    --color-background-soft: ${theme.backgroundSoft};
    --color-surface: ${theme.surface};
    --color-surface-elevated: ${theme.surfaceElevated};
    --color-border-subtle: ${theme.borderSubtle};
    --color-text-primary: ${theme.textPrimary};
    --color-text-secondary: ${theme.textSecondary};
    --color-text-tertiary: ${theme.textTertiary};
    --color-team1: ${theme.team1};
    --color-team1-tint: ${theme.team1Tint};
    --color-team1-dark: ${theme.team1Dark};
    --color-team2: ${theme.team2};
    --color-team2-tint: ${theme.team2Tint};
    --color-team2-dark: ${theme.team2Dark};
  }
`

