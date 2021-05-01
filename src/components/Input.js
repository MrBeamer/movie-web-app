import React from "react";
import clsx from "clsx";

export default function Input(props) {
  const { type = "text", placeholder, className, ...rest } = props;
  const classes = clsx({ input: true }, className);

  return (
    <label className="label">
      <input
        type={type}
        placeholder={placeholder}
        className={classes}
        {...rest}
      ></input>
    </label>
  );
}
