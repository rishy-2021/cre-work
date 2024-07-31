"use client"
import React, { FC } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { BsFilterRight } from "react-icons/bs";
import { FiPlus } from "react-icons/fi";
import CustomButton, { Position } from "@/components/button";
import { AddTaskInput } from "./task-mutation";
import TaskBoxBody from "./task-box-body";

interface Props {
  onOpen: (action: string) => void;
  tasks: AddTaskInput[];
  droppableId: string;
  columnTitle: string;
}

const TaskBox: FC<Props> = ({ onOpen, tasks, droppableId, columnTitle }) => {
  return (
    <Droppable droppableId={droppableId}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="flex flex-col w-[24.2%] bg-gray-100 p-4 rounded-lg"
        >
          <div className="flex justify-between items-center mb-4">
            <p className="text-xl text-[#555555]">{columnTitle}</p>
            <BsFilterRight size={24} />
          </div>
          {tasks.map((task, idx) => (
            <Draggable key={Number(idx)} draggableId={task?._id || ''} index={idx}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className={`mb-2 p-2 bg-white rounded shadow-sm ${snapshot.isDragging ? 'bg-gray-200' : ''}`}
                >
                  <TaskBoxBody task={task} />
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
          {/* <CustomButton
            iconPosition={Position.END}
            title="Add new"
            icon={<FiPlus color="white" size={22} />}
            bgColor={`linear-gradient(180deg, #3A3A3A 0%, #202020 100%)`}
            customStyles="w-full h-10 flex justify-between"
            color="white"
            onClick={() => onOpen(columnTitle)}
          /> */}
        </div>
      )}
    </Droppable>
  );
};

export default TaskBox;
