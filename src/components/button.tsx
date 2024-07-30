import { Button } from "antd";
import React, { FC } from "react";

export enum Position {
  START = "start",
  END = "end",
}

interface Props {
  title: string;
  icon: any;
  iconPosition: Position;
  bgColor: string;
  color:string;
  customStyles:string;
  onClick:()=>void;
}

const CustomButton: FC<Props> = ({
  customStyles,
  bgColor,
  title,
  onClick,
  color,
  ...rest
}) => {
  return (
    <>
      <Button
        {...rest}
        className={`${customStyles}`}
        style={{ background: bgColor, color:color }}
        type="primary"
        size="large"
        onClick={onClick}
      >
        {title}
      </Button>
    </>
  );
};

export default CustomButton;
