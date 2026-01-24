/**
 * Color Design Tokens
 *
 * Poseidon.AI color system. Import from '@/tokens/colors'.
 */

export const colors = {
  // ==========================================================================
  // BRAND COLORS
  // ==========================================================================

  primary: {
    DEFAULT: '#0066CC',
    50: '#E6F0FF',
    100: '#CCE0FF',
    200: '#99C2FF',
    300: '#66A3FF',
    400: '#3385FF',
    500: '#0066CC',
    600: '#0052A3',
    700: '#003D7A',
    800: '#002952',
    900: '#001429',
    hover: '#0052A3',
    disabled: '#99C2E6',
  },

  // ==========================================================================
  // ENGINE IDENTITY COLORS
  // ==========================================================================

  engine: {
    protect: {
      base: '#3B82F6',      // Blue - trust/security
      light: '#60A5FA',
      dark: '#1D4ED8',
      accent: '#1D4ED8',
      bg: '#EFF6FF',
      bgDark: '#1E3A5F',
    },
    grow: {
      base: '#10B981',      // Green - growth/prosperity
      light: '#34D399',
      dark: '#059669',
      accent: '#059669',
      bg: '#ECFDF5',
      bgDark: '#1A3D2E',
    },
    optimize: {
      base: '#8B5CF6',      // Purple - automation/intelligence
      light: '#A78BFA',
      dark: '#6D28D9',
      accent: '#6D28D9',
      bg: '#F5F3FF',
      bgDark: '#2E1A4A',
    },
  },

  // ==========================================================================
  // SEMANTIC COLORS
  // ==========================================================================

  semantic: {
    success: {
      DEFAULT: '#10B981',
      light: '#34D399',
      dark: '#059669',
      bg: '#ECFDF5',
    },
    warning: {
      DEFAULT: '#F59E0B',
      light: '#FBBF24',
      dark: '#D97706',
      bg: '#FFFBEB',
    },
    error: {
      DEFAULT: '#EF4444',
      light: '#F87171',
      dark: '#DC2626',
      bg: '#FEF2F2',
    },
    info: {
      DEFAULT: '#3B82F6',
      light: '#60A5FA',
      dark: '#2563EB',
      bg: '#EFF6FF',
    },
  },

  // ==========================================================================
  // RISK LEVEL COLORS
  // ==========================================================================

  risk: {
    none: '#10B981',      // Green
    low: '#22C55E',       // Light green
    medium: '#F59E0B',    // Yellow/amber
    high: '#F97316',      // Orange
    critical: '#EF4444',  // Red
  },

  // ==========================================================================
  // ALERT SEVERITY COLORS
  // ==========================================================================

  severity: {
    low: '#22C55E',
    medium: '#F59E0B',
    high: '#F97316',
    critical: '#EF4444',
  },

  // ==========================================================================
  // PRIORITY COLORS
  // ==========================================================================

  priority: {
    low: '#94A3B8',
    medium: '#3B82F6',
    high: '#F97316',
    urgent: '#EF4444',
  },

  // ==========================================================================
  // SURFACE COLORS
  // ==========================================================================

  surface: {
    base: '#FFFFFF',
    elevated: '#F8FAFC',
    sunken: '#F1F5F9',
    overlay: 'rgba(0, 0, 0, 0.5)',

    // Dark mode
    dark: {
      base: '#0F172A',
      elevated: '#1E293B',
      sunken: '#020617',
      overlay: 'rgba(0, 0, 0, 0.7)',
    },
  },

  // ==========================================================================
  // TEXT COLORS
  // ==========================================================================

  text: {
    primary: '#1E293B',
    secondary: '#64748B',
    muted: '#94A3B8',
    disabled: '#CBD5E1',
    inverse: '#FFFFFF',

    // Dark mode
    dark: {
      primary: '#F1F5F9',
      secondary: '#94A3B8',
      muted: '#64748B',
      disabled: '#475569',
      inverse: '#0F172A',
    },
  },

  // ==========================================================================
  // BORDER COLORS
  // ==========================================================================

  border: {
    DEFAULT: '#E2E8F0',
    light: '#F1F5F9',
    dark: '#CBD5E1',

    // Dark mode
    darkMode: {
      DEFAULT: '#334155',
      light: '#1E293B',
      dark: '#475569',
    },
  },

  // ==========================================================================
  // GRADIENT DEFINITIONS
  // ==========================================================================

  gradients: {
    primary: 'linear-gradient(135deg, #0066CC 0%, #0052A3 100%)',
    protect: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
    grow: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
    optimize: 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)',
    dark: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
    glow: {
      cyan: 'radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 70%)',
      purple: 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%)',
    },
  },
} as const;

// Type exports
export type Colors = typeof colors;
export type EngineColor = keyof typeof colors.engine;
export type RiskLevel = keyof typeof colors.risk;
export type Severity = keyof typeof colors.severity;
export type Priority = keyof typeof colors.priority;
