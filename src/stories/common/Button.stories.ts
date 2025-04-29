import type { Meta, StoryObj } from '@storybook/react';

import Button from '@/component/common/Button';

const meta = {
  title: 'Common/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
  },
  args: {
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Share: Story = {
  args: {
    text: "공유",
  }
};