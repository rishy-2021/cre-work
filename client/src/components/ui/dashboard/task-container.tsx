import React, { FC } from "react";
import { AddTaskInput, Status, Task } from "./task-mutation";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import TaskBox from "./task-box";

interface Props {
  onOpen: (todo: string) => void;
  tasks: Task[];
  handleTaskUpdate:(taskId:string, newStatus: Status)=> void;
}

const TaskContainer: FC<Props> = ({ onOpen, tasks, handleTaskUpdate }) => {
  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (destination.index === source.index && destination.droppableId === source.droppableId) {
      return;
    }

    // Optimistic UI update
    handleTaskUpdate(draggableId, destination.droppableId as Status);
  };

  const todos = tasks.filter((task) => task.status === "To do");
  const inProgress = tasks.filter((task) => task.status === "In progress");
  const underReview = tasks.filter((task) => task.status === "Under review");
  const finished = tasks.filter((task) => task.status === "Finished");

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {
      tasks && <div className="flex flex-wrap justify-between items-start bg-white p-4 mt-4 mr-4 rounded-lg">
        <TaskBox
          onOpen={onOpen}
          tasks={todos}
          droppableId={Status.TO_DO}
          columnTitle="To do"
        />
        <TaskBox
          onOpen={onOpen}
          tasks={inProgress}
          droppableId={Status.IN_PROGRESS}
          columnTitle="In progress"
        />
        <TaskBox
          onOpen={onOpen}
          tasks={underReview}
          droppableId={Status.UNDER_REVIEW}
          columnTitle="Under review"
        />
        <TaskBox
          onOpen={onOpen}
          tasks={finished}
          droppableId={Status.FINISHED}
          columnTitle="Finished"
        />
      </div>
}
    </DragDropContext>
  );
};

export default TaskContainer;
