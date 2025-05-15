import type { Meta, StoryObj } from '@storybook/react';

import Scheduler from '@/components/plan/schedule/Scheduler';

const meta = {
  title: 'Plan/Schedule/Scheduler',
  component: Scheduler,
  tags: ['autodocs'],
  parameters: {
    nextjs: {
      appDirectory: true,
    }
  },
  args: {
  },
} satisfies Meta<typeof Scheduler>;

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