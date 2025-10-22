import { ComponentStory, ComponentMeta } from '@storybook/react';
import { AppImage } from './AppImage';
import 'app/styles/index.scss';

export default {
  title: 'features/AppImage',
  component: AppImage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof AppImage>;

const Template: ComponentStory<typeof AppImage> = (args) => (
  <AppImage {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
