import type { Meta, StoryObj } from '@storybook/react';
import { KanbanColumn } from '../app/components/ui/KanbanColumn';
import { DealData } from '../app/components/ui/DealCard';

// Sample data
const sampleDeals: DealData[] = [
  {
    id: '1',
    name: 'Enterprise Software Deal',
    company: 'TechCorp Inc.',
    amount: 'INR 2,50,000',
    owner: 'Sarah Johnson',
    closeDate: 'in 2 weeks'
  },
  {
    id: '2',
    name: 'Marketing Automation',
    company: 'GrowthCo',
    amount: 'INR 1,80,000',
    owner: 'Mike Chen',
    closeDate: 'in 1 week'
  },
  {
    id: '3',
    name: 'Cloud Migration',
    company: 'StartupXYZ',
    amount: 'INR 3,20,000',
    owner: 'Emily Davis',
    closeDate: 'in 3 weeks'
  }
];

const meta: Meta<typeof KanbanColumn> = {
  title: 'Components/KanbanColumn',
  component: KanbanColumn,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'An interactive Kanban column component with expand/collapse functionality and smooth animations.'
      }
    }
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'The title of the kanban column'
    },
    count: {
      control: 'number',
      description: 'Number of deals in the column'
    },
    defaultExpanded: {
      control: 'boolean',
      description: 'Whether the column starts in expanded state'
    }
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'KT Pending',
    count: 3,
    deals: sampleDeals,
    defaultExpanded: false
  }
};

export const Expanded: Story = {
  args: {
    title: 'KT Pending',
    count: 3,
    deals: sampleDeals,
    defaultExpanded: true
  }
};

export const SingleDeal: Story = {
  args: {
    title: 'Qualified',
    count: 1,
    deals: [sampleDeals[0]],
    defaultExpanded: true
  }
};

export const ManyDeals: Story = {
  args: {
    title: 'In Progress',
    count: 5,
    deals: [
      ...sampleDeals,
      {
        id: '4',
        name: 'Data Analytics Platform',
        company: 'DataCorp',
        amount: 'INR 4,50,000',
        owner: 'Alex Rodriguez',
        closeDate: 'in 4 weeks'
      },
      {
        id: '5',
        name: 'Mobile App Development',
        company: 'AppStudio',
        amount: 'INR 1,20,000',
        owner: 'Lisa Wang',
        closeDate: 'in 1 month'
      }
    ],
    defaultExpanded: true
  }
};

export const EmptyColumn: Story = {
  args: {
    title: 'Completed',
    count: 0,
    deals: [],
    defaultExpanded: true
  }
};

export const LongTitle: Story = {
  args: {
    title: 'Very Long Column Name That Might Overflow',
    count: 12,
    deals: sampleDeals,
    defaultExpanded: true
  }
};
