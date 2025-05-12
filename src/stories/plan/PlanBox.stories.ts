import type { Meta, StoryObj } from '@storybook/react';

import PlanBox from '@/component/plan/PlanBox';

const meta = {
  title: 'Plan/PlanBox',
  component: PlanBox,
  tags: ['autodocs'],
  parameters: {
  },
  args: {
    title: "출발~",
    content: "간단하게 아점먹고 숙소로 출발~",
  },
} satisfies Meta<typeof PlanBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    title: "출발~",
    content: "간단하게 아점먹고 숙소로 출발~",
  }
};