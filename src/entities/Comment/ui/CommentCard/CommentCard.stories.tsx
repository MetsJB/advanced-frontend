import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CommentCard } from './CommentCard';
import '@/app/styles/index.scss';

export default {
    title: 'entities/comment/CommentCard',
    component: CommentCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof CommentCard>;

const Template: ComponentStory<typeof CommentCard> = (args) => (
    <CommentCard {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
    comment: {
        id: '1',
        text: 'text comment',
        user: {
            id: '1',
            username: 'Zahar',
        },
    },
};
export const Loading = Template.bind({});
Loading.args = {
    isLoading: true,
};
