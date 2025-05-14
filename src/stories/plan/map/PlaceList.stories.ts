import type { Meta, StoryObj } from '@storybook/react';

import PlaceList from '@/components/plan/map/PlaceList';
import { PlaceItems } from '@/mocks/places';

const meta = {
  title: 'Plan/Map/PlaceList',
  component: PlaceList,
  tags: ['autodocs'],
  parameters: {
  },
  args: {
  },
} satisfies Meta<typeof PlaceList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: PlaceItems
};