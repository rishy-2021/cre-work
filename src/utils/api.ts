import { AddTaskInput } from "@/components/ui/dashboard/task-mutation";

const API_URL = '/api/tasks';

export const fetchTasks = async (): Promise<AddTaskInput[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
  }
  return response.json();
};

export const createTask = async (task: Partial<AddTaskInput>): Promise<AddTaskInput> => {
  const response = await fetch("http://localhost:3001/api/tasks/add", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
  if (!response.ok) {
    console.log(response)
    throw new Error('Failed to create task');
  }
  return response.json();
};

export const updateTask = async (id: string, task: Partial<AddTaskInput>): Promise<AddTaskInput> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
  if (!response.ok) {
    throw new Error('Failed to update task');
  }
  return response.json();
};

export const deleteTask = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete task');
  }
};
