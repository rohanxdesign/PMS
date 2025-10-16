import type { Meta, StoryObj } from '@storybook/react';
import { DealCard } from '../app/components/ui/DealCard';

const meta: Meta<typeof DealCard> = {
  title: 'Components/DealCard',
  component: DealCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A card component displaying deal information including company, amount, owner, and close date.'
      }
    }
  },
  argTypes: {
    deal: {
      description: 'Deal data object containing all the deal information'
    }
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    deal: {
      id: '1',
      name: 'Enterprise Software Deal',
      company: 'TechCorp Inc.',
      amount: 'INR 2,50,000',
      owner: 'Sarah Johnson',
      closeDate: 'in 2 weeks'
    }
  }
};

export const ShortDeal: Story = {
  args: {
    deal: {
      id: '2',
      name: 'API Integration',
      company: 'DevCo',
      amount: 'INR 50,000',
      owner: 'John Doe',
      closeDate: 'in 3 days'
    }
  }
};

export const LongDealName: Story = {
  args: {
    deal: {
      id: '3',
      name: 'Comprehensive Digital Transformation and Cloud Migration Project',
      company: 'Enterprise Solutions Ltd.',
      amount: 'INR 15,00,000',
      owner: 'Dr. Maria Rodriguez',
      closeDate: 'in 6 months'
    }
  }
};

export const LongCompanyName: Story = {
  args: {
    deal: {
      id: '4',
      name: 'Mobile App Development',
      company: 'Very Long Company Name That Might Cause Layout Issues',
      amount: 'INR 1,20,000',
      owner: 'Alex Chen',
      closeDate: 'in 1 month'
    }
  }
};

export const HighValueDeal: Story = {
  args: {
    deal: {
      id: '5',
      name: 'Enterprise Platform',
      company: 'Fortune 500 Corp',
      amount: 'INR 50,00,000',
      owner: 'CEO Smith',
      closeDate: 'in 2 months'
    }
  }
};
