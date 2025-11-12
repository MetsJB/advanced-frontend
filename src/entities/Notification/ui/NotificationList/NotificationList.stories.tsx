import {
  ComponentStory,
  ComponentMeta,
} from '@storybook/react';
import { NotificationList } from './NotificationList';
import { StoreDecorator } from '@/shared/config/storybook/storeDecorator/StoreDecorator';
// eslint-disable-next-line johannesburd-plugin/layer-imports
import 'app/styles/index.scss';

export default {
  title: 'entities/NotificationList',
  component: NotificationList,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof NotificationList>;

const Template: ComponentStory<typeof NotificationList> = (
  args,
) => <NotificationList {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({})];
Normal.parameters = {
  mockData: [
    {
      url: `${__API__}/notifications`,
      method: 'GET',
      status: 200,
      response: [
        {
          id: '1',
          title: 'Уведомление',
          description: 'Поставь лайк и оставь комментарий',
        },
        {
          id: '2',
          title: 'Уведомление',
          description: 'Поставь лайк и оставь комментарий',
        },
        {
          id: '3',
          title: 'Уведомление',
          description: 'Поставь лайк и оставь комментарий',
        },
      ],
    },
  ],
};
