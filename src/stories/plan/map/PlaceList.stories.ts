import type { Meta, StoryObj } from '@storybook/react';

import Sidebar from '@/components/plan/map/Sidebar';

const meta = {
  title: 'Plan/Map/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  parameters: {
  },
  args: {
  },
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {};