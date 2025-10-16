import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Card } from './Card';
import { Text } from '../Text/Text';
// eslint-disable-next-line johannesburd-plugin/layer-imports
import '@/app/styles/index.scss';

export default {
    title: 'features/Card',
    component: Card,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const Normal = Template.bind({});
Normal.args = {
    children: <Text title="test" text="text text" />,
};
