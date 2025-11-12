import {
  ComponentStory,
  ComponentMeta,
} from '@storybook/react';

import { CountrySelect } from './CountrySelect';
// eslint-disable-next-line johannesburd-plugin/layer-imports
import '@/app/styles/index.scss';

export default {
  title: 'entities/CountrySelect',
  component: CountrySelect,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof CountrySelect>;

const Template: ComponentStory<typeof CountrySelect> = (
  args,
) => <CountrySelect {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
