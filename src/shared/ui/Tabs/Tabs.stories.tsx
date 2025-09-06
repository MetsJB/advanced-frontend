import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Tabs } from "./Tabs";
import "app/styles/index.scss";
import { action } from "@storybook/addon-actions";

export default {
  title: "shared/Tabs",
  component: Tabs,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Tabs>;

const Template: ComponentStory<typeof Tabs> = (args) => <Tabs {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  tabs: [
    {
      content: "tab1",
      value: "tab1",
    },
    {
      content: "tab2",
      value: "tab2",
    },
    {
      content: "tab3",
      value: "tab3",
    },
  ],
  value: "tab2",
  onTabClick: action("onTabClick"),

};
