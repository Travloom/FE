import type { Meta, StoryObj } from '@storybook/react';

import Sidebar from '@/components/plan/map/Sidebar';
import { PlaceItems } from '@/mocks/places';

const meta = {
  title: 'Plan/Map/PlaceList',
  component: Sidebar,
  tags: ['autodocs'],
  parameters: {
  },
  args: {
  },
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: PlaceItems
};