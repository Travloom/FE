import type { Meta, StoryObj } from '@storybook/react';

import CustomCalendar from '@/components/calandar/CustomCalendar';

const meta = {
  title: 'Calandar/Calandar',
  component: CustomCalendar,
  tags: ['autodocs'],
  parameters: {
  },
} satisfies Meta<typeof CustomCalendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Share: Story = {
};