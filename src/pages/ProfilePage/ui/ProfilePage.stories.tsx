import { ComponentStory, ComponentMeta } from '@storybook/react';

import ProfilePage from './ProfilePage';
import { ThemeDecorator } from '@/shared/config/storybook/themeDecorator/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider';
import '@/app/styles/index.scss';
import { StoreDecorator } from '@/shared/config/storybook/storeDecorator/StoreDecorator';
import { Currency } from '@/entities/Currency';
import { Country } from '@/entities/Country';
import avatar from '@/shared/assets/tests/storybook.jpg';

export default {
    title: 'pages/ProfilePage',
    component: ProfilePage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ProfilePage>;

const Template: ComponentStory<typeof ProfilePage> = (args: any) => (
    <ProfilePage {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [
    StoreDecorator({
        profile: {
            form: {
                age: 22,
                avatar,
                city: 'Moscow',
                currency: Currency.RUB,
                first: 'Storybook',
                lastname: 'Ivanov',
                username: 'Kerry_13',
                country: Country.Russia,
            },
        },
    }),
];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [
    ThemeDecorator(Theme.DARK),
    StoreDecorator({
        profile: {
            form: {
                age: 22,
                avatar,
                city: 'Moscow',
                currency: Currency.RUB,
                first: 'Storybook',
                lastname: 'Ivanov',
                username: 'Kerry_13',
                country: Country.Russia,
            },
        },
    }),
];
