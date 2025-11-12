import {
  ComponentStory,
  ComponentMeta,
} from '@storybook/react';

import { ListBox } from './ListBox';
// eslint-disable-next-line johannesburd-plugin/layer-imports
import '@/app/styles/index.scss';

export default {
  title: 'shared/ListBox',
  component: ListBox,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [
    (Story) => (
      <div style={{ paddingLeft: '50%', paddingTop: 100 }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof ListBox>;

const Template: ComponentStory<typeof ListBox> = (args) => (
  <ListBox {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
  value: '123',
  items: [
    { content: 'first', value: 'first' },
    { content: 'second', value: 'second' },
  ],
};
export const TopLeft = Template.bind({});
TopLeft.args = {
  value: '123',
  direction: 'top left',
  items: [
    { content: 'first', value: 'first' },
    { content: 'second', value: 'second' },
  ],
};

export const TopRight = Template.bind({});
TopRight.args = {
  value: '123',
  direction: 'top right',
  items: [
    { content: 'first', value: 'first' },
    { content: 'second', value: 'second' },
  ],
};
export const BottomRight = Template.bind({});
BottomRight.args = {
  value: '123',
  direction: 'bottom right',
  items: [
    { content: 'first', value: 'first' },
    { content: 'second', value: 'second' },
  ],
};
export const BottomLeft = Template.bind({});
BottomLeft.args = {
  value: '123',
  direction: 'bottom left',
  items: [
    { content: 'first', value: 'first' },
    { content: 'second', value: 'second' },
  ],
};
