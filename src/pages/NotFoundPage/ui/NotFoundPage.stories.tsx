import { ComponentStory, ComponentMeta } from "@storybook/react";

import { NotFoundPage } from "./NotFoundPage";
import { ThemeDecorator } from "shared/config/storybook/themeDecorator/ThemeDecorator";
import { Theme } from "app/providers/ThemeProvider";
import "app/styles/index.scss";

export default {
  title: "pages/NotFoundPage",
  component: NotFoundPage,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof NotFoundPage>;

const Template: ComponentStory<typeof NotFoundPage> = (args: any) => (
  <NotFoundPage {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
