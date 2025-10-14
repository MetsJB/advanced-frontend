import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Text } from '@/shared/ui/Text/Text';
import { Card } from './Card';
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
