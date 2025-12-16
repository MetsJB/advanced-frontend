import {
  ComponentStory,
  ComponentMeta,
} from '@storybook/react';

import { Avatar } from './Avatar';
// eslint-disable-next-line johannesburd-plugin/layer-imports
import '@/app/styles/index.scss';
import AvatarImg from '../../../assets/tests/storybook.jpg';

export default {
  title: 'shared/Avatar',
  component: Avatar,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (args) => (
  <Avatar {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  size: 150,
  src: AvatarImg,
};

export const Small = Template.bind({});
Small.args = {
  size: 50,
  src: AvatarImg,
};
