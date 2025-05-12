import type { Meta, StoryObj } from '@storybook/react';

import Planner from '@/component/plan/Planner';

const meta = {
  title: 'Plan/Planner',
  component: Planner,
  tags: ['autodocs'],
  parameters: {
  },
  args: {
  },
} satisfies Meta<typeof Planner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
  }
};