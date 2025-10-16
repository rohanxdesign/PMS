import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        kanban: {
          bg: 'var(--kanban-bg)',
          'header-bg': 'var(--kanban-header-bg)',
          'header-text': 'var(--kanban-header-text)',
          'card-bg': 'var(--kanban-card-bg)',
          'card-border': 'var(--kanban-card-border)',
          'card-hover': 'var(--kanban-card-hover)',
        },
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          tertiary: 'var(--text-tertiary)',
          muted: 'var(--text-muted)',
          accent: 'var(--text-accent)',
        },
        status: {
          pending: 'var(--status-pending)',
          qualified: 'var(--status-qualified)',
          progress: 'var(--status-progress)',
          closed: 'var(--status-closed)',
        },
        interactive: {
          hover: 'var(--interactive-hover)',
          active: 'var(--interactive-active)',
          focus: 'var(--interactive-focus)',
        }
      },
      fontFamily: {
        sans: ['var(--font-family)'],
      },
      spacing: {
        xs: 'var(--spacing-xs)',
        sm: 'var(--spacing-sm)',
        md: 'var(--spacing-md)',
        lg: 'var(--spacing-lg)',
        xl: 'var(--spacing-xl)',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        full: 'var(--radius-full)',
      },
      boxShadow: {
        card: 'var(--shadow-card)',
        'card-hover': 'var(--shadow-card-hover)',
        column: 'var(--shadow-column)',
        header: 'var(--shadow-header)',
      }
    },
  },
  plugins: [],
};

export default config;


