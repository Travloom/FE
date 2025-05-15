import type { Meta, StoryObj } from '@storybook/react';

import Planner from '@/components/plan/Planner';

const meta = {
  title: 'Plan/Planner',
  component: Planner,
  tags: ['autodocs'],
  parameters: {
    nextjs: {
      appDirectory: true,
    }
  },
  args: {
  },
} satisfies Meta<typeof Planner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
  },
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/Scheduler',
        query: {
          planId: '1',
        }
      }
    }
  }
};