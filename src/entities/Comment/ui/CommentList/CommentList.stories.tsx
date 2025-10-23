import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CommentList } from './CommentList';
// eslint-disable-next-line johannesburd-plugin/layer-imports
import '@/app/styles/index.scss';

export default {
    title: 'entities/comment/CommentList',
    component: CommentList,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof CommentList>;

const Template: ComponentStory<typeof CommentList> = (args) => (
    <CommentList {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
    comments: [
        {
            id: '1',
            text: 'text',
            user: { id: '1', username: 'Zahar' },
        },
        {
            id: '2',
            text: 'text 2',
            user: { id: '2', username: 'Oleg' },
        },
    ],
};
export const Loading = Template.bind({});
Loading.args = {
    isLoading: true,
};
