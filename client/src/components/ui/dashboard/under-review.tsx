import CustomButton, { Position } from "@/components/button";
import React, { FC } from "react";
import { BsFilterRight } from "react-icons/bs";
import { FiPlus } from "react-icons/fi";
import TaskBox from "./task-box";
import { AddTaskInput } from "./task-mutation";

interface Props {
  onOpen: (action: string) => void;
  tasks: AddTaskInput[];
}

const UnderReview: FC<Props> = ({ onOpen, tasks }) => {
  return (
    <div className="flex flex-col w-[24.2%]">
      <div className="flex justify-between items-center mb-4">
        <p className="text-xl text-[#555555]">Under review</p>
        <BsFilterRight size={24} />
      </div>
      {tasks.map((task, idx) => (
        <TaskBox task={task} key={idx} />
      ))}
      <CustomButton
        iconPosition={Position.END}
        title="Add new"
        icon={<FiPlus color="white" size={22} />}
        bgColor={`linear-gradient(180deg, #3A3A3A 0%, #202020 100%)`}
        customStyles="w-full h-10 flex justify-between"
        color="white"
        onClick={() => onOpen("Under review")}
      />
    </div>
  );
};

export default UnderReview;
