import React, { FC } from "react";
import { AddTaskInput } from "./task-mutation";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import TaskBox from "./task-box";

interface Props {
  onOpen: (todo: string) => void;
  tasks: AddTaskInput[];
  handleTaskUpdate:(updatedTasks :AddTaskInput[])=> void;
}

const TaskContainer: FC<Props> = ({ onOpen, tasks, handleTaskUpdate }) => {
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    console.log(source, destination)

    const updatedTasks = Array.from(tasks);
    const [movedTask] = updatedTasks.splice(source.index, 1);
    movedTask.status = destination.droppableId as 'To do' | 'In progress' | 'Under review' | 'Finished';
    updatedTasks.splice(destination.index, 0, movedTask);

    console.log(updatedTasks); // Replace with actual state update

    handleTaskUpdate(updatedTasks);
  };

  const todos = tasks.filter((task) => task.status === "To do");
  const inProgress = tasks.filter((task) => task.status === "In progress");
  const underReview = tasks.filter((task) => task.status === "Under review");
  const finished = tasks.filter((task) => task.status === "Finished");

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex flex-wrap justify-between items-start bg-white p-4 mt-4 mr-4 rounded-lg">
        <TaskBox
          onOpen={onOpen}
          tasks={todos}
          droppableId="To do"
          columnTitle="To do"
        />
        <TaskBox
          onOpen={onOpen}
          tasks={inProgress}
          droppableId="In progress"
          columnTitle="In progress"
        />
        <TaskBox
          onOpen={onOpen}
          tasks={underReview}
          droppableId="Under review"
          columnTitle="Under review"
        />
        <TaskBox
          onOpen={onOpen}
          tasks={finished}
          droppableId="Finished"
          columnTitle="Finished"
        />
      </div>
    </DragDropContext>
  );
};

export default TaskContainer;
