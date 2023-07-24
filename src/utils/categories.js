import React from "react";
import { BsLaptopFill } from "react-icons/bs";
import { ImStatsDots } from "react-icons/im";
import { SiBookstack } from "react-icons/si";

function categories() {
  return [
    { icon: <BsLaptopFill />, name: "Parts", route: "/parts" },
    {
      icon: <ImStatsDots />,
      name: "Reports & Statistics",
      route: "report-and-statistics",
    },
    {
      icon: <SiBookstack />,
      name: "Training Materials",
      route: "/learning-materials",
    },
  ];
}

export default categories;
