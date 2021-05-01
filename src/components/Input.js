import React from "react";
import clsx from "clsx";

export default function Input(props) {
  const { type = "text", placeholder, ...rest } = props;
  console.log(props);
  console.log(props.type);
  console.log(type);
  //   const classes = clsx({ type: type });

  function handleSearchChange() {}

  return (
    <input
      type={type}
      placeholder={placeholder}
      value="value"
      {...rest}
    ></input>
  );
}
