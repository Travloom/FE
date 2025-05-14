import type { Meta, StoryObj } from '@storybook/react';

import Header from '@/components/layout/Header';

const meta = {
  title: 'Layout/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
  },
  args: {
    title: ""
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedOut: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
    }
  }
};
export const LoggedIn: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
    }
  },
  args: {
    title: "마이페이지"
  }
};
