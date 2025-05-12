import type { Meta, StoryObj } from '@storybook/react';

import Scheduler from '@/component/plan/schedule/Scheduler';

const meta = {
  title: 'Plan/Schedule/Scheduler',
  component: Scheduler,
  tags: ['autodocs'],
  parameters: {
  },
  args: {
  },
} satisfies Meta<typeof Scheduler>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
  }
};