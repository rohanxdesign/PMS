// Professional color system for the component library
// Based on your Figma design specifications

export const colors = {
  // Kanban specific colors from Figma
  kanban: {
    bg: '#F5F9FC',
    headerBg: '#D0DFF0',
    headerText: '#274A72',
    cardBg: '#FFFFFF',
    cardBorder: 'rgba(208, 223, 240, 0.64)',
    cardHover: '#F8FAFC',
  },

  // Text colors
  text: {
    primary: '#1D2939',
    secondary: '#475467',
    tertiary: '#101828',
    muted: '#D0D5DD',
    accent: '#2563EB',
  },

  // Status colors
  status: {
    pending: '#F59E0B',
    qualified: '#10B981',
    progress: '#3B82F6',
    closed: '#6B7280',
  },

  // Interactive states
  interactive: {
    hover: 'rgba(255, 255, 255, 0.1)',
    active: 'rgba(255, 255, 255, 0.2)',
    focus: '#3B82F6',
  },

  // Neutral colors
  neutral: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },

  // Blue palette
  blue: {
    50: '#EFF6FF',
    100: '#DBEAFE',
    200: '#BFDBFE',
    300: '#93C5FD',
    400: '#60A5FA',
    500: '#3B82F6',
    600: '#2563EB',
    700: '#1D4ED8',
    800: '#1E40AF',
    900: '#1E3A8A',
  },

  // Green palette
  green: {
    50: '#ECFDF5',
    100: '#D1FAE5',
    200: '#A7F3D0',
    300: '#6EE7B7',
    400: '#34D399',
    500: '#10B981',
    600: '#059669',
    700: '#047857',
    800: '#065F46',
    900: '#064E3B',
  },
} as const;

// Typography system
export const typography = {
  fontFamily: {
    sans: ['"Instrument Sans"', 'system-ui', '-apple-system', 'sans-serif'],
  },
  fontSize: {
    xs: '12px',
    sm: '14px',
    base: '16px',
    lg: '18px',
    xl: '20px',
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    xs: '18px', // 150% of 12px
    sm: '20px',
    base: '24px',
    lg: '28px',
    xl: '32px',
  },
} as const;

// Spacing system
export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  '2xl': '24px',
  '3xl': '32px',
} as const;

// Border radius system
export const borderRadius = {
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  full: '24px',
} as const;

// Shadow system
export const shadows = {
  sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
  md: '0 1px 3px rgba(0, 0, 0, 0.1)',
  lg: '0 4px 12px rgba(0, 0, 0, 0.15)',
  xl: '0 8px 24px rgba(0, 0, 0, 0.2)',
} as const;

// Component-specific styles
export const componentStyles = {
  kanbanColumn: {
    width: {
      expanded: '300px', // Minimum width for expanded columns
      collapsed: '48px', // Changed from '80px'
    },
    height: '672px',
    padding: spacing.md,
    gap: spacing.sm,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.kanban.bg,
  },
  kanbanHeader: {
    padding: '3px 6px',
    borderRadius: borderRadius.sm,
    backgroundColor: colors.kanban.headerBg,
    gap: spacing.sm,
  },
  kanbanHeaderText: {
    fontFamily: typography.fontFamily.sans.join(', '),
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semibold,
    lineHeight: typography.lineHeight.xs,
    color: colors.kanban.headerText,
  },
  dealCard: {
    backgroundColor: colors.kanban.cardBg,
    border: `1px solid ${colors.kanban.cardBorder}`,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    boxShadow: shadows.md,
  },
} as const;
