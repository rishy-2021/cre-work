import React, { FC } from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { BsFilterRight } from "react-icons/bs";
import { FiPlus } from "react-icons/fi";
import CustomButton, { Position } from "@/components/button";
import { AddTaskInput, Status, Task } from "./task-mutation";
import TaskBoxBody from "./task-box-body";

interface Props {
  onOpen: (action: string) => void;
  tasks: Task[];
  droppableId: Status;
  columnTitle: string;
}

const Column: FC<Props> = ({ onOpen, tasks, droppableId, columnTitle }) => {
  return (
    <Droppable droppableId={droppableId} type="group">
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
            <Draggable key={task._id} draggableId={task._id} index={idx}>
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
          <CustomButton
            iconPosition={Position.END}
            title="Add new"
            icon={<FiPlus color="white" size={22} />}
            bgColor={`linear-gradient(180deg, #3A3A3A 0%, #202020 100%)`}
            customStyles="w-full h-10 flex justify-between"
            color="white"
            onClick={() => onOpen(columnTitle)}
          />
        </div>
      )}
    </Droppable>
  );
};

export default Column;
