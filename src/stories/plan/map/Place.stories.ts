import type { Meta, StoryObj } from '@storybook/react';

import Place from '@/component/plan/map/Place';

const meta = {
  title: 'Plan/Map/Place',
  component: Place,
  tags: ['autodocs'],
  parameters: {
  },
  args: {
  },
} satisfies Meta<typeof Place>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NoodleRestaurant: Story = {
  args: {
    name: "무슨 국수집",
    rate: 4.5,
    detail: "어쩌구 저쩌구",
    imageUrl: "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nr6N88IgS9LIVsitN0UaPGoK5O6x9AvUjUV8f_SWmtVI2HvhIICq_EHVHuCe-izS5qmdywZMMkEtaS0n4lq9lCE0oDFkES77fA82lhZEfx3Cq2yr4BlJQj6szWwgySr2L3pRY2E=w92-h92-n-k-no",
  }
};