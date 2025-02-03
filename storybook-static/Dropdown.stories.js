import React from "react";
import Dropdown from "../components/Dropdown/Dropdown";

export default {
  title: "Components/Dropdown",
  component: Dropdown,
};

const Template = (args) => <Dropdown {...args} />;

export const Default = Template.bind({});
Default.args = {
  options: [
    { value: "1", label: "Option 1" },
    { value: "2", label: "Option with icon" },
    { value: "3", label: "Long Long Option 3" },
    { value: "4", label: "Long Long Option 4" },
  ],
  multiple: false,
  searchable: true,
  portal: false,
  zIndex: 1050,
  outlined: false,
};
