import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ProfileCard } from './ProfileCard';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import avatart from '@/shared/assets/tests/storybook.jpg';
// eslint-disable-next-line johannesburd-plugin/layer-imports
import '@/app/styles/index.scss';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

export default {
  title: 'entities/ProfileCard',
  component: ProfileCard,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = (args) => (
  <ProfileCard {...args} />
);

const primaryArgs = {
  data: {
    age: 22,
    avatar: avatart,
    city: 'Moscow',
    currency: Currency.RUB,
    first: 'Zahar',
    lastname: 'Ivanov',
    username: 'Kerry_13',
    country: Country.Russia,
  },
};

export const Primary = Template.bind({});
Primary.args = primaryArgs;

export const PrimaryRedesigned = Template.bind({});
PrimaryRedesigned.args = primaryArgs;
PrimaryRedesigned.decorators = [NewDesignDecorator];

export const isLodaing = Template.bind({});
isLodaing.args = {
  isLoading: true,
};
export const withError = Template.bind({});
withError.args = {
  error: 'error',
};
