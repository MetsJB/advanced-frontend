import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ErrorPage } from './ErrorPage';
import { ThemeDecorator } from '@/shared/config/storybook/themeDecorator/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider';
import '@/app/styles/index.scss';

export default {
    title: 'widget/ErrorPage',
    component: ErrorPage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ErrorPage>;

const Template: ComponentStory<typeof ErrorPage> = (args) => (
    <ErrorPage {...args} />
);

export const Light = Template.bind({});
Light.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
