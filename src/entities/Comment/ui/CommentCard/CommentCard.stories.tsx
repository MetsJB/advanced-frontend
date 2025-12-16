import { ComponentMeta, ComponentStory } from '@storybook/react';
import { CommentCard } from './CommentCard';
// eslint-disable-next-line johannesburd-plugin/layer-imports
import '@/app/styles/index.scss';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

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

const normalArgs = {
  comment: {
    id: '1',
    text: 'text comment',
    user: {
      id: '1',
      username: 'Zahar',
    },
  },
};

export const Normal = Template.bind({});
Normal.args = normalArgs;

export const NormalRedesigned = Template.bind({});
NormalRedesigned.args = normalArgs;
NormalRedesigned.decorators = [
  NewDesignDecorator
];

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
};
