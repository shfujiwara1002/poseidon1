/**
 * Typography Design Tokens
 *
 * Poseidon.AI typography system.
 */

export const fontFamily = {
  display: ['var(--font-display)', 'system-ui', 'sans-serif'],
  body: ['var(--font-body)', 'system-ui', 'sans-serif'],
  mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
} as const;

export const fontSize = {
  xs: ['0.75rem', { lineHeight: '1rem' }],         // 12px
  sm: ['0.875rem', { lineHeight: '1.25rem' }],     // 14px
  base: ['1rem', { lineHeight: '1.5rem' }],        // 16px
  lg: ['1.125rem', { lineHeight: '1.75rem' }],     // 18px
  xl: ['1.25rem', { lineHeight: '1.75rem' }],      // 20px
  '2xl': ['1.5rem', { lineHeight: '2rem' }],       // 24px
  '3xl': ['1.875rem', { lineHeight: '2.25rem' }],  // 30px
  '4xl': ['2.25rem', { lineHeight: '2.5rem' }],    // 36px
  '5xl': ['3rem', { lineHeight: '1' }],            // 48px
  '6xl': ['3.75rem', { lineHeight: '1' }],         // 60px
  '7xl': ['4.5rem', { lineHeight: '1' }],          // 72px
} as const;

export const fontWeight = {
  thin: '100',
  extralight: '200',
  light: '300',
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
  black: '900',
} as const;

export const letterSpacing = {
  tighter: '-0.05em',
  tight: '-0.025em',
  normal: '0',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.1em',
} as const;

export const lineHeight = {
  none: '1',
  tight: '1.25',
  snug: '1.375',
  normal: '1.5',
  relaxed: '1.625',
  loose: '2',
} as const;

// Semantic typography styles
export const textStyles = {
  // Headings
  h1: {
    fontFamily: fontFamily.display,
    fontSize: '3rem',        // 48px
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight.tight,
    letterSpacing: letterSpacing.tight,
  },
  h2: {
    fontFamily: fontFamily.display,
    fontSize: '2.25rem',     // 36px
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight.tight,
    letterSpacing: letterSpacing.tight,
  },
  h3: {
    fontFamily: fontFamily.display,
    fontSize: '1.875rem',    // 30px
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.snug,
  },
  h4: {
    fontFamily: fontFamily.display,
    fontSize: '1.5rem',      // 24px
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.snug,
  },
  h5: {
    fontFamily: fontFamily.display,
    fontSize: '1.25rem',     // 20px
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight.normal,
  },
  h6: {
    fontFamily: fontFamily.display,
    fontSize: '1rem',        // 16px
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight.normal,
  },

  // Body text
  bodyLg: {
    fontFamily: fontFamily.body,
    fontSize: '1.125rem',    // 18px
    fontWeight: fontWeight.normal,
    lineHeight: lineHeight.relaxed,
  },
  body: {
    fontFamily: fontFamily.body,
    fontSize: '1rem',        // 16px
    fontWeight: fontWeight.normal,
    lineHeight: lineHeight.normal,
  },
  bodySm: {
    fontFamily: fontFamily.body,
    fontSize: '0.875rem',    // 14px
    fontWeight: fontWeight.normal,
    lineHeight: lineHeight.normal,
  },
  bodyXs: {
    fontFamily: fontFamily.body,
    fontSize: '0.75rem',     // 12px
    fontWeight: fontWeight.normal,
    lineHeight: lineHeight.normal,
  },

  // Labels
  label: {
    fontFamily: fontFamily.body,
    fontSize: '0.875rem',    // 14px
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight.none,
    letterSpacing: letterSpacing.wide,
  },
  labelSm: {
    fontFamily: fontFamily.body,
    fontSize: '0.75rem',     // 12px
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight.none,
    letterSpacing: letterSpacing.wider,
    textTransform: 'uppercase' as const,
  },

  // Metrics/Numbers
  metric: {
    fontFamily: fontFamily.display,
    fontSize: '2.25rem',     // 36px
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight.none,
    letterSpacing: letterSpacing.tight,
  },
  metricLg: {
    fontFamily: fontFamily.display,
    fontSize: '3rem',        // 48px
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight.none,
    letterSpacing: letterSpacing.tight,
  },
  metricSm: {
    fontFamily: fontFamily.display,
    fontSize: '1.5rem',      // 24px
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.none,
  },

  // Code
  code: {
    fontFamily: fontFamily.mono,
    fontSize: '0.875rem',    // 14px
    fontWeight: fontWeight.normal,
    lineHeight: lineHeight.normal,
  },
} as const;

export type TextStyle = keyof typeof textStyles;
