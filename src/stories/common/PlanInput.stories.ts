import type { Meta, StoryObj } from '@storybook/react';

import PlanInput from '@/component/common/PlanInput';

const meta = {
  title: 'Common/PlanInput',
  component: PlanInput,
  tags: ['autodocs'],
  parameters: {
  },
  args: {
  },
} satisfies Meta<typeof PlanInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Input: Story = {
  args: {
  }
};