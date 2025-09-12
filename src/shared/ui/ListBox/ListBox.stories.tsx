import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ListBox } from "./ListBox";
import "app/styles/index.scss";

export default {
  title: "shared/ListBox",
  component: ListBox,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof ListBox>;


const Template: ComponentStory<typeof ListBox> = (args) => <ListBox {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  
};
  