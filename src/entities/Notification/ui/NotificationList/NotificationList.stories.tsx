import { ComponentStory, ComponentMeta } from "@storybook/react";
import { NotificationList } from "./NotificationList";
import "app/styles/index.scss";
import withMock from "storybook-addon-mock";
import { StoreDecorator } from "@/shared/config/storybook/storeDecorator/StoreDecorator";

export default {
  title: "entities/NotificationList",
  component: NotificationList,
  argTypes: {
    backgroundColor: { control: "color" },
  },
  decorators: [withMock],
} as ComponentMeta<typeof NotificationList>;

const Template: ComponentStory<typeof NotificationList> = (args) => (
  <NotificationList {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({})];
Normal.parameters = {
  mockData: [
    {
      url: `${__API__}/notifications`,
      method: "GET",
      status: 200,
      response: [
        {
          id: "1",
          title: "Уведомление",
          description: "Поставь лайк и оставь комментарий",
        },
        {
          id: "2",
          title: "Уведомление",
          description: "Поставь лайк и оставь комментарий",
        },
        {
          id: "3",
          title: "Уведомление",
          description: "Поставь лайк и оставь комментарий",
        },
      ],
    },
  ],
};
