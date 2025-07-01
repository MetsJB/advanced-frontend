import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Modal } from "./Modal";
import "app/styles/index.scss";
import { ThemeDecorator } from "shared/config/storybook/themeDecorator/ThemeDecorator";
import { Theme } from "app/providers/ThemeProvider";
import { size } from "lodash";

export default {
  title: "shared/Modal",
  component: Modal,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  isOpen: true,
  children:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus eosreiciendis id alias harum corporis deserunt optio officiis. Explicabonesciunt fugit accusantium deleniti ipsum nisi ex nostrum deseruntnobis. Perspiciatis!",
};

export const Dark = Template.bind({});
Dark.args = {
  isOpen: true,
  children:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus eosreiciendis id alias harum corporis deserunt optio officiis. Explicabonesciunt fugit accusantium deleniti ipsum nisi ex nostrum deseruntnobis. Perspiciatis!",
};
Dark.decorators = [ThemeDecorator(Theme.DARK)]