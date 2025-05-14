import type { Meta, StoryObj } from '@storybook/react';

import TagButton from '@/components/common/TagButton';

const meta = {
  title: 'Common/TagButton',
  component: TagButton,
  tags: ['autodocs'],
  parameters: {
  },
  args: {
  },
} satisfies Meta<typeof TagButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Region: Story = {
  args: {
    title: "지역",
    tagList: ["부산", "경주", "제주도"],
  }
};