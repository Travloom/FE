import type { Meta, StoryObj } from '@storybook/react';

import Calandar from '@/component/calandar/Calandar';

const meta = {
  title: 'Calandar/Calandar',
  component: Calandar,
  tags: ['autodocs'],
  parameters: {
  },
} satisfies Meta<typeof Calandar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Share: Story = {
};