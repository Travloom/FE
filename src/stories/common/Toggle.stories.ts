import type { Meta, StoryObj } from '@storybook/react';

import Toggle from '@/components/common/Toggle';

const meta = {
  title: 'Common/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  parameters: {
  },
  args: {
    text: "식당",
    isActive: true,
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Active: Story = {
  args: {
    text: "식당",
    isActive: true,
  }
};

export const Inactive: Story = {
  args: {
    text: "식당",
    isActive: false,
  }
};