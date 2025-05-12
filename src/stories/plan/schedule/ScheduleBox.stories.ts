import type { Meta, StoryObj } from '@storybook/react';

import ScheduleBox from '@/component/plan/schedule/ScheduleBox';

const meta = {
  title: 'Plan/Schedule/ScheduleBox',
  component: ScheduleBox,
  tags: ['autodocs'],
  parameters: {
  },
  args: {
    title: "출발~",
    content: "간단하게 아점먹고 숙소로 출발~",
  },
} satisfies Meta<typeof ScheduleBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    title: "출발~",
    content: "간단하게 아점먹고 숙소로 출발~",
  }
};