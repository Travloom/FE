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

export const LoggedOutHome: Story = {};
export const LoggedOutMyPage: Story = {
  args: {
    title: "마이페이지"
  }
};
