import type { Meta, StoryObj } from '@storybook/react';
import SectionNav from './SectionNav';
import { LayoutDashboard, Grid3X3 } from 'lucide-react';

const meta: Meta<typeof SectionNav> = {
  title: 'Navigation/SectionNav',
  component: SectionNav,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'BD Associates navigation bar with tab buttons, notification bell, and user profile. Matches exact design specifications.',
      },
    },
  },
  argTypes: {
    items: {
      description: 'Array of navigation items with href, label, and optional icon',
    },
    right: {
      description: 'Optional right-side content',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story with BD associates navigation - EXACT DESIGN SPECS
export const Default: Story = {
  args: {
    items: [
      {
        href: '/sales/command-center',
        label: 'Command Center',
        icon: <LayoutDashboard className="h-4 w-4" />,
      },
      {
        href: '/sales/deals',
        label: 'Deals',
        icon: <Grid3X3 className="h-4 w-4" />,
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: '**EXACT DESIGN SPECIFICATIONS FROM FIGMA:**\n\n- **Main Container:** 80px height, 1440px width, padding 20px 44px 20px 44px\n- **Tab Buttons:** 36px height, 8px radius, 8px gap, padding 8px 12px 8px 8px\n- **Active State:** bg/weak-50 (light blue), blue icon\n- **Inactive State:** bg/white-0 (white), gray icon\n- **Border:** 1px bottom border (stroke/soft-200)\n- **Layout:** Tabs on left side, no logos, bell and user profile on right',
      },
    },
  },
};

// Active state - Command Center selected
export const ActiveCommandCenter: Story = {
  args: {
    items: [
      {
        href: '/sales/command-center',
        label: 'Command Center',
        icon: <LayoutDashboard className="h-4 w-4" />,
      },
      {
        href: '/sales/deals',
        label: 'Deals',
        icon: <Grid3X3 className="h-4 w-4" />,
      },
    ],
  },
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/sales/command-center',
      },
    },
  },
};

// Active state - Deals selected
export const ActiveDeals: Story = {
  args: {
    items: [
      {
        href: '/sales/command-center',
        label: 'Command Center',
        icon: <LayoutDashboard className="h-4 w-4" />,
      },
      {
        href: '/sales/deals',
        label: 'Deals',
        icon: <Grid3X3 className="h-4 w-4" />,
      },
    ],
  },
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/sales/deals',
      },
    },
  },
};

// With additional navigation items
export const ExtendedNavigation: Story = {
  args: {
    items: [
      {
        href: '/sales/command-center',
        label: 'Command Center',
        icon: <LayoutDashboard className="h-4 w-4" />,
      },
      {
        href: '/sales/deals',
        label: 'Deals',
        icon: <Grid3X3 className="h-4 w-4" />,
      },
      {
        href: '/sales/leads',
        label: 'Leads',
        icon: <Grid3X3 className="h-4 w-4" />,
      },
    ],
  },
};

// Design specifications showcase
export const DesignSpecifications: Story = {
  args: {
    items: [
      {
        href: '/sales/command-center',
        label: 'Command Center',
        icon: <LayoutDashboard className="h-4 w-4" />,
      },
      {
        href: '/sales/deals',
        label: 'Deals',
        icon: <Grid3X3 className="h-4 w-4" />,
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: `
## Design Specifications

### Main Container
- **Height:** 80px
- **Width:** 1440px (max-width)
- **Padding:** 20px 44px 20px 44px
- **Gap:** 16px
- **Background:** White (bg/white-0)
- **Border:** 1px bottom border (stroke/soft-200)

### Tab Buttons
- **Height:** 36px
- **Corner Radius:** 8px (radius-8)
- **Gap:** 8px (between icon and text)
- **Padding:** 8px 12px 8px 8px

#### Active State
- **Background:** bg/weak-50 (light blue)
- **Icon Color:** Blue
- **Text Color:** Dark gray

#### Inactive State
- **Background:** bg/white-0 (transparent/white)
- **Icon Color:** Dark gray
- **Text Color:** Dark gray

### Right Side Elements
- **Notification Bell:** Gray with red dot indicator
- **User Profile:** Avatar + name + dropdown arrow
        `,
      },
    },
  },
};
