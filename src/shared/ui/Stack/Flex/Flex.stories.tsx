import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Flex } from "./Flex";
import "@/app/styles/index.scss";
import { ThemeDecorator } from "@/shared/config/storybook/themeDecorator/ThemeDecorator";
import { Theme } from "@/app/providers/ThemeProvider";

export default {
  title: "shared/Flex",
  component: Flex,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Flex>;

const Template: ComponentStory<typeof Flex> = (args) => <Flex {...args} />;

export const Row = Template.bind({});
Row.args = {
  children: (
    <>
      <div>TEXT1</div>
      <div>TEXT2</div>
    </>
  ),
};

export const Column = Template.bind({});
Column.args = {
  direction: "column",
  children: (
    <>
      <div>TEXT1</div>
      <div>TEXT2</div>
    </>
  ),
};

export const Row4 = Template.bind({});
Row4.args = {
  gap: "4",
  children: (
    <>
      <div>TEXT1</div>
      <div>TEXT2</div>
    </>
  ),
};

export const Row8 = Template.bind({});
Row8.args = {
  gap: "8",
  children: (
    <>
      <div>TEXT1</div>
      <div>TEXT2</div>
    </>
  ),
};

export const Row16 = Template.bind({});
Row16.args = {
  gap: "16",
  children: (
    <>
      <div>TEXT1</div>
      <div>TEXT2</div>
    </>
  ),
};

export const Row32 = Template.bind({});
Row32.args = {
  gap: "32",
  children: (
    <>
      <div>TEXT1</div>
      <div>TEXT2</div>
    </>
  ),
};

export const ColumnGap8 = Template.bind({});
ColumnGap8.args = {
  gap: '8',
  direction: "column",
  children: (
    <>
      <div>TEXT1</div>
      <div>TEXT2</div>
    </>
  ),
};

export const ColumnGap32 = Template.bind({});
ColumnGap32.args = {
  gap: '32',
  direction: "column",
  children: (
    <>
      <div>TEXT1</div>
      <div>TEXT2</div>
    </>
  ),
};