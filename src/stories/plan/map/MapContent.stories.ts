import type { Meta, StoryObj } from '@storybook/react';

import MapContent from '@/components/plan/map/MapContent';

const meta = {
  title: 'Plan/Map/MapContent',
  component: MapContent,
  tags: ['autodocs'],
  parameters: {
  },
  args: {
  },
} satisfies Meta<typeof MapContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
  }
};