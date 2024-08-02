import { AddTaskInput } from "@/components/ui/dashboard/task-mutation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

export const fetchTasks = async (): Promise<AddTaskInput[]> => {
  const response = await fetch(`${API_URL}/api/tasks`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache:"no-store",
    mode: 'no-cors',
  });
  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
  }
  return response.json();
};

export const createTask = async (task: Partial<AddTaskInput>): Promise<AddTaskInput> => {
  console.log(task, "-----------")
  const response = await fetch(`${API_URL}/api/tasks/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    cache:"no-store",
    body: JSON.stringify(task),
  });
  if (!response.ok) {
    console.log(response)
    throw new Error('Failed to create task');
  }
  return response.json();
};

export const updateTask = async (id: string, task: Partial<AddTaskInput>): Promise<AddTaskInput> => {
  const response = await fetch(`${API_URL}/api/tasks/${id}`, {
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
